-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.get_user_profile(varchar);

-- Create or replace the function with the updated logic
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA public;

CREATE OR REPLACE FUNCTION public.get_user_profile(u varchar)
RETURNS TABLE(
    id uuid, 
    username text, 
    full_name text,
    bio text,
    avatar_url text,
    website text,
    location text,
    dob text,
    followers integer,
    following integer,
    created_at timestamp,
    private boolean,
    verified boolean,
    is_following boolean, 
    is_follower boolean,
    is_user boolean)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
        SELECT 
            p.id, 
            p.username, 
            p.full_name,
            p.bio,
            p.avatar_url,
            p.website,
            p.location,
            p.dob,
            p.followers,
            p.following,
            p.created_at,
            p.private,
            p.verified,
            -- Handle NULL for `v` explicitly
            CASE 
                WHEN auth.uid() IS NULL THEN FALSE
                ELSE EXISTS (
                    SELECT 1
                    FROM public.follow f
                    WHERE f.following_user = auth.uid()
                    AND f.followed_user = p.id
                )
            END AS is_following,
            CASE 
                WHEN auth.uid() IS NULL THEN FALSE
                ELSE EXISTS (
                    SELECT 1
                    FROM public.follow f
                    WHERE f.following_user = p.id
                    AND f.followed_user = auth.uid()
                )
            END AS is_follower,
            -- Handle NULL for `v` in comparison
            CASE 
                WHEN auth.uid() IS NULL THEN FALSE
                ELSE (p.id = auth.uid())
            END AS is_user
        FROM public.profiles p
        WHERE p.username = u;
END;
$$;
