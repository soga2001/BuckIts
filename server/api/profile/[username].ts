import { serverSupabaseClient } from '#supabase/server'
//import database types
import type { Database } from '~/types/database.types'


export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, 'username') as string
    const client = await serverSupabaseClient<Database>(event)

  const {data: {user: currUser}} = await client.auth.getUser()
  

  const data =  await client
      .rpc('get_user_profile', { u: username}).single();
    

  if (data.error != null) {
      return {
        error: data.error,
        status: data.status,
        user: null
      }
  }  
  return {
    error: data.error,
    status: data.status,
    user: data.data
  }
})
  