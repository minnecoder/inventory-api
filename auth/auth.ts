import { genSalt, hash, compare } from "bcryptjs"
import { User } from '../models/User'

exports.changePassword = async (userId: number, newPassword: string) => {
    try {
        // generate salt
        const salt = await genSalt(10)
        // hash password with salt
        const hashedPassword = await hash(newPassword, salt)
        // update user
        return User.update({
            Password: hashedPassword
        }, {
            where: {
                id: userId
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Unable to change password')
    }
}

exports.authorizeUser = async (email: string, password: string) => {
    const user = await User.findOne({
        where: {
            Email: email
        }
    })
    const savedPassword = user.Password
    const isAuthorized = await compare(password, savedPassword)
    return { isAuthorized, userId: user.id }
}