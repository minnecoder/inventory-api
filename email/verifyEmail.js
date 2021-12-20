const crypto = require('crypto')
const User = require('../models/User')

const { ROOT_DOMAIN, JWT_SIGNATURE } = process.env

exports.createVerifyEmailToken = async (email) => {
    try {
        const authString = `${JWT_SIGNATURE}:${email}`
        return crypto.createHash('sha256').update(authString).digest('hex')
    } catch (error) {
        console.log(error)
    }
}

exports.createVerifyEmailLink = async (email) => {
    try {
        // Create token
        const emailToken = await this.createVerifyEmailToken(email)
        // Encode url string
        const URIencodedEmail = encodeURIComponent(email)
        // Return verification link
        // TODO make front end route to handle this link
        return `https://${ROOT_DOMAIN}/verify/${URIencodedEmail}/${emailToken}`
    } catch (error) {
        console.log(error)
    }
}