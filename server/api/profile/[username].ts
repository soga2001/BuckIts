import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, 'username') as string
    const client = await serverSupabaseClient(event)

  const { data: user, error } = await client.from('profiles').select('*').eq('username', username).single()
  if (error) {
      return {
          status: 500,
          user: null
      }
  }  
  return {
    status: 200,
    user: user
  }
})
  