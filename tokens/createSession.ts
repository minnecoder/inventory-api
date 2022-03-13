import DB from '../config/postgres-db';
import { randomBytes } from 'crypto'
import Session from '../models/session.model'

const createSession = async (userId: number, connection: { ip: string; userAgent: string }) => {
    const Session = DB.Session
    try {
        // Generate session token
        const sessionToken = randomBytes(43).toString("hex")

        // Get connection info
        const { ip, userAgent } = connection

        // await Session.create({
        //     sessionToken: sessionToken,
        //     userId,
        //     valid: true,
        //     userAgent: userAgent,
        //     ip

        // })
        return sessionToken
    } catch (error) {
        throw new Error("Session creation failed")

    }

}

export default createSession