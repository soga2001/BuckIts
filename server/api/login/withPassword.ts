import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {email, password} = body

    const client = await serverSupabaseClient(event)

  return await client.auth.signInWithPassword({
    email: email,
    password: password
  })
//   return {
//     status: 200,
//     user: user
//   }
})
  