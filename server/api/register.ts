import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async (event) => {
    // Get Supabase client
    const client = await serverSupabaseClient(event)
    // read body
    const body = await readBody(event)
    const { email, password, phone, full_name, username, bio, dob } = body

    return await client.auth.signUp(
        {
          email: email,
          password: password,
          phone: phone,
          options: {
            data: {
              full_name: full_name,
              username: username,
              bio: bio,
              dob: dob,
              location: '',
              website: '',
              avatar_url: '',
            },
            
          }
        }
    )
})
