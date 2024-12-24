import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/database.types'
import type { PostgrestError } from '@supabase/supabase-js';


export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);
    const {is_following, id} = await readBody(event);

    const { data: {user}, error } = await client.auth.getUser()
    if (user == null && error) {
        return {
            error: error,
            status: 401,
            followed: is_following,
        }
    }


    
    if(is_following && user) {
        try {
            const { data, error } = await client.from('follow').delete().eq('following_user', user.id).eq('followed_user', id)
            if (error) {
                return {
                    error: error,
                    status: 500,
                    followed: false,
                }
            }
            return {
                error: null,
                status: 200,
                followed: false,
            }
                
        }
        catch (error: any) {
            return {
                error: error,
                status: 500,
                followed: false,
            }
        }
    } else {
        try {
            const { data, error } = await client.from('follow').insert({
                following_user: user?.id,
                followed_user: id
            })
            if (error) {
                return {
                    error: error,
                    status: 500,
                    followed: false,
                }
            }
            return {
                error: null,
                status: 200,
                followed: true,
            }
                
        }
        catch (error: any) {
            return {
                error: error,
                status: 500,
                followed: false,
            }
        }
    }
})