import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

exports.jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
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