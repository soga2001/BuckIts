export interface User {
    id: string,
    aud: string,
    role: string,
    email: string,
    email_confirmed_at: string,
    phone: string,
    confirmed_at: string,
    last_sign_in_at: string,
    // app_metadata: {
    //     provider: string,
    //     providers: string[]
    // },
    user_metadata?: UserMetaData,
    created_at: string,
    updated_at: string,
    is_anonymous: boolean
}


export interface UserMetaData {
    id: string,
    created_at: string,
    updated_at: null,
    username: string,
    full_name:  string,
    avatar_url: string,
    website: string,
    bio: string,
    location: string,
    dob: string,
    private: boolean,
    verified: boolean,
    followers: number,
    following: number,
}

export interface UserProfile {
    id: string
    username: string
    full_name: string
    bio: string
    avatar_url: string
    website: string
    location: string
    dob: string
    followers: number
    following: number
    created_at: string
    private: boolean
    verified: boolean
    is_following: boolean
    is_follower: boolean
    is_user: boolean
}