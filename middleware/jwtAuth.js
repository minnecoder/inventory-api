const jwt = require('jsonwebtoken')

exports.jwtAuth = async (req, res, next) => {
    const JWTSignature = process.env.JWT_SECRET

    try {
        if (req.cookies.accessToken) {
            // Get accessToken
            const { accessToken } = req.cookies
            // Decode accessToken
            const decodedAccessToken = jwt.verify(accessToken, JWTSignature)
            // Check if user has the role of admin
            if (decodedAccessToken.role === "admin") {
                next()
                return
            }
            res.status(500).send("Access Denied")
        }
    } catch (error) {
        throw new Error("Authentication Error")
    }
}