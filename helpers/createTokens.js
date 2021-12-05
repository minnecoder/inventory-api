const jwt = require('jsonwebtoken')

const JWTSignature = process.env.JWT_Secret

exports.createTokens = async (sessionToken, userId) => {
    try {
        // Create Refresh Token
        const refreshToken = jwt.sign(
            {
                sessionToken,
            },
            JWTSignature
        )

        // Create Access Token
        const accessToken = jwt.sign(
            {
                sessionToken,
                userId,
            },
            JWTSignature
        )
        // Return Refresh Token and Access Token
        return { accessToken, refreshToken }
    } catch (error) {
        console.error(error)
        throw new Error("Token creation failed")
    }
}