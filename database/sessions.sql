-- Grant authenticated users to select or delete from the auth.sessions table
GRANT SELECT, DELETE ON TABLE auth.sessions TO authenticated;

-- Drop policy if exists
DROP POLICY IF EXISTS "Individuals can delete their own sessions." on auth.sessions;

-- Create policy that allows authenticated user to delete their sessions
CREATE POLICY "Individuals can delete their own sessions." on auth.sessions for delete
TO authenticated using ((select auth.uid()) = user_id );

-- Drop policy if exists
DROP POLICY IF EXISTS "Individuals can view their own sessions." ON auth.sessions;

-- Create policy to allow authenticated users to select their sessions
CREATE POLICY "Individuals can view their own sessions." on auth.sessions for select
TO authenticated using ((select auth.uid()) = user_id );

-- Create or replace delete session function that takes in a session id as the parameter
CREATE OR REPLACE FUNCTION auth.delete_session(session_id uuid)
RETURNS SETOF auth.sessions
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
      DELETE FROM auth.sessions
      WHERE id = session_id
        AND user_id = auth.uid() 
    RETURNING *; 
END;
$$;

DROP function if exists auth.get_sessions();

-- Create or replace delete session function that takes in a session id as the parameter
CREATE OR REPLACE FUNCTION auth.get_sessions()
RETURNS table(
            id uuid, 
            created_at timestamp with time zone, 
            updated_at timestamp with time zone, 
            refreshed_at timestamp without time zone, 
            user_agent text, 
            ip inet)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Perform delete and return matching rows
    RETURN QUERY
      SELECT 
        s.id, 
        s.created_at, 
        s.updated_at, 
        s.refreshed_at, 
        s.user_agent, 
        s.ip
      from auth.sessions s
      WHERE s.user_id = auth.uid();
END;
$$;
