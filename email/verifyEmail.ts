import crypto from 'crypto'
// import User from '../models/User'

const { ROOT_DOMAIN, JWT_SIGNATURE } = process.env

export const createVerifyEmailToken = async (email: string) => {
    try {
        const authString = `${JWT_SIGNATURE}:${email}`
        return crypto.createHash('sha256').update(authString).digest('hex')
    } catch (error) {
        console.log(error)
    }
}

export const createVerifyEmailLink = async (email: string) => {
    try {
        // Create token
        const emailToken = await createVerifyEmailToken(email)
        // Encode url string
        const URIencodedEmail = encodeURIComponent(email)
        // Return verification link
        // TODO make front end route to handle this link
        return `https://${ROOT_DOMAIN}/verify/${URIencodedEmail}/${emailToken}`
    } catch (error) {
        console.log(error)
    }
}