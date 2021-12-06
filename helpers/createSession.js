const { randomBytes } = require('crypto')
const Session = require('../models/Session')

exports.createSession = async (userId, role, connection) => {
    try {
        // Generate session token
        const sessionToken = randomBytes(43).toString("hex")

        // Get connection info
        const { ip, userAgent } = connection

        await Session.create({
            session_token: sessionToken,
            userId,
            role,
            valid: true,
            user_agent: userAgent,
            ip,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return sessionToken
    } catch (error) {
        // throw new Error("Session creation failed")
        console.error(error)
    }

}