export interface Sessions {
    id: string
    created_at: string
    updated_at: string
    refreshed_at: string
    user_agent: string
    ip: unknown
}

export interface SessionFromStorage {
    access_token: string;
    expires_at?: number | undefined;
    refresh_token: string;
    token_type: string;
}