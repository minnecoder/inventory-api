const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Session = require('../models/Session')
const refreshTokens = require("./refreshToken")

const JWTSignature = process.env.JWT_SIGNATURE

exports.getUserFromCookies = async (req, res) => {
    try {
        // Check to make sure access token exists
        if (req.cookies?.accessToken) {
            const { accessToken } = req.cookies
            // Decode access token
            const decodedAccessToken = jwt.verify(accessToken, JWTSignature)
            // Return user
            return User.findOne({
                where: {
                    id: decodedAccessToken?.userId
                }
            })
        }
        if (req?.cookies?.refreshToken) {
            const { refreshToken } = req.cookies
            // Decode refresh token
            const { sessionToken } = jwt.verify(refreshToken, JWTSignature)
            // Look up session
            const currentSession = await Session.findOne({
                where: {
                    session_token: sessionToken
                }
            })
            // Confirm session is valid
            if (currentSession.valid) {
                // Look up current user
                const currentUser = await User.findOne({
                    where: {
                        id: currentSession.userId
                    }
                })
                await refreshTokens(sessionToken, currentUser.id, res)
                // Return current user
                return currentUser
            }
        }
    } catch (error) {
        console.error(error)
        return res.status(401).send()
    }

}