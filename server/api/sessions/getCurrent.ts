import { serverSupabaseClient } from '#supabase/server'
import type { SessionFromStorage as Session } from '~/assets/interface/sessions';

const extractSessionId = (session: Session | null): string | undefined => {
    if (session?.access_token) {
      try {
        const sessionTokenParts = session.access_token.split('.');
        if (sessionTokenParts.length >= 2) {
          const token = JSON.parse(
            Buffer.from(sessionTokenParts[1], 'base64').toString('ascii'),
          );
          return token.session_id;
        }
      } catch {
        return;
      }
    }
    return;
  };

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const {data: {session}, error} = await client.auth.getSession()

    if (session == null) {
        throw new Error('No session found')
    }
    const sessionId = extractSessionId(session)
    if (sessionId) {
        return {sessionId}
    }

})
  