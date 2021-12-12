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

exports.validateVerifyEmail = async (email, token) => {
    try {
        // Create hash
        const emailToken = await this.createVerifyEmailToken(email)
        // Compare hash and token
        const isValid = emailToken === token
        if (isValid) {
            // Change user valid to true
            await User.update({ Verified: true }, {
                where: {
                    Email: email
                }
            })
            return true
        }
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}