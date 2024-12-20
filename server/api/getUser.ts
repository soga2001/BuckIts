import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    // Get Supabase client
    const client = await serverSupabaseClient(event)

    const {data: {user}, error} = await client.auth.getUser()
    
    if (error) {
      return {
        error: error,
        user: null
      }
    }

    return {
      error: null,
      user: user
    }
})
