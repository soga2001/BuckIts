import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async (event) => {
    // Get Supabase client
    const client = await serverSupabaseClient(event)
    // read body
    const body = await readBody(event)
    const { email, password, phone, fullname, username, bio, dob } = body

    return await client.auth.signUp(
        {
          email: email,
          password: password,
          phone: phone,
          options: {
            data: {
              fullname: fullname,
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
