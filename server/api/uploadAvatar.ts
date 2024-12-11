import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async (event) => {
    // Get Supabase client
    const client = await serverSupabaseClient(event)

    const formDataBody = await readMultipartFormData(event);
    const formData = new FormData()


    // Append the data to a new FormData (need to convert Buffer into string / Blob)
    formDataBody?.forEach((value) => {
        if (value.name && value.data) {
            console.log(value.name, value.data)
            if (value.name === 'file') {
                const blob = new Blob([value.data], { type: value.type });
                formData.append(value.name, blob)
            }
        }
    })
    

    const file = formData.get('file') as File

    if (file == null) {
        return {
            error: 'No file uploaded',
            url: null
        }
    }

  

    const {data: {user}, error} = await client.auth.getUser()

    if (user == null) {
      return {
        error: error,
        url: null
      }
    }

    const fileDirectory = `${user.id}/avatar`
    console.log(fileDirectory)

    // // // Upload avatar
    try {
        const { error } = await client.storage.from('avatars').upload(fileDirectory, file)
    } catch (e) {
        const {error } = await client.storage.from('avatars').update(fileDirectory, file, {
            upsert: true
        })
        if(error) {
            return {
                error: error,
                url: null
            }
        }

    }

    // // Get Public URL
    const { data } = await client.storage.from('avatars').getPublicUrl(fileDirectory);
    console.log(data)
    const url = data.publicUrl

    return {
      error: null,
      url: url
    }
})
