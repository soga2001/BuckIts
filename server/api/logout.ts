import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const query = getQuery(event) ?? {};
    const scope = (query.scope as 'global' | 'local' | 'others' | undefined) ?? 'local';
    const session = query.session as string | undefined;


    /*
        scope options are
        - local => deletes current session
        - global => deletes all sessions
        - others => deletes all sessions except current

    */

    if (session) {
        return await client.rpc('delete_session', {session_id: session})
    }

    return await client.auth.signOut({
        scope: scope
    })
})
  