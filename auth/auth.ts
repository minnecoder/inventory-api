import DB from "../config/postgres-db"
import { genSalt, hash, compare } from "bcryptjs"
// import User from '../models/user.model'

const User = DB.User

const changePassword = async (userId: number, newPassword: string) => {
    try {
        // generate salt
        const salt = await genSalt(10)
        // hash password with salt
        const hashedPassword = await hash(newPassword, salt)
        // update user
        return User.update({
            password: hashedPassword
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

const authorizeUser = async (email: string, password: string) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    const savedPassword = user.password
    const isAuthorized = await compare(password, savedPassword)
    return { isAuthorized, userId: user.id }
}

// export default changePassword
// export default authorizeUser

export default {
    changePassword,
    authorizeUser
}