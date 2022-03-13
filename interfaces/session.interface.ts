export interface Session {
    id: number
    sessionToken: string
    userId: number
    valid: boolean
    userAgent: string
    ip: string
}