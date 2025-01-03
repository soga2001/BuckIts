import { serverSupabaseClient } from '#supabase/server'
import { User } from '~/assets/interface/user'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)


  const { data, error } = await client.auth.getUser()
  if (error) {
    return {
      error: error.message,
      status: 500,
      user: null
    }
  }

  // const {data: user, error: err} = await client.from('profiles').update(body as never).eq('id', data.user.id).select().single()


  const {data: {user}, error: err} = await client.auth.updateUser({
      data: body
  })


  if (error) {
      return {
        error: err,
        status: 500,
        user: null
      }
  }  

  return {
    error: null,
    status: 200,
    user: user as unknown as User
  }
})
  