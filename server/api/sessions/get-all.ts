import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const {data: {user}, error} = await client.auth.getUser()
    if (error) {
        return {
            error: error,
            data: [],
            count: null,
            status: 401,
            statusText: "Unathorized"
        }
    }

    return await client.rpc('get_sessions')
})
  