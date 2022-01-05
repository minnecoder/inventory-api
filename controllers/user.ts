import { Request, Response } from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createSession } from '../tokens/createSession'
import { refreshToken } from '../tokens/refreshToken'
import { Session } from '../models/Session'
import { User } from '../models/User'
import { createVerifyEmailLink, createVerifyEmailToken } from '../email/verifyEmail'
import sendEmail from '../email/email'
import { getUserFromCookies } from '../tokens/getUserFromCookies'
import { authorizeUser, changePassword } from '../auth/auth'


// @desc Add user
// @route POST /user
// @access User
export let registerUser = async (req: Request, res: Response) => {
    // Check if email already exists
    const email = await User.findOne({
        where: {
            Email: req.body.email
        }
    })
    if (email) {
        // TODO Change before going into production
        return res.status(400).send("Email address already exists")
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Add new user
    try {
        const user = await User.create({
            First_Name: req.body.first_name,
            Last_Name: req.body.last_name,
            Email: req.body.email,
            Password: hashedPassword,
            Role: "user"
        })

        if (user) {
            // Sends verification email to user
            const emailLink = await createVerifyEmailLink(req.body.email)
            await sendEmail({
                to: req.body.email,
                subject: "Verify your email address",
                html: `<a href="${emailLink}"> Click to verify your email</a>`
            })
        }


        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Add admin user
// @route POST /user/addadmin
// @access Admin
export let registerAdminUser = async (req: Request, res: Response) => {
    // Check if email already exists
    const email = await User.findOne({
        where: {
            Email: req.body.email
        }
    })
    if (email) {
        // TODO Change before going into production
        return res.status(400).send("Email address already exists")
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Add new user
    try {
        const user = await User.create({
            First_Name: req.body.first_name,
            Last_Name: req.body.last_name,
            Email: req.body.email,
            Password: hashedPassword,
            Role: "admin"
        })

        if (user) {
            // Sends verification email to user
            const emailLink = await createVerifyEmailLink(req.body.email)
            await sendEmail({
                to: req.body.email,
                subject: "Verify your email address",
                html: `<a href="${emailLink}"> Click to verify your email</a>`
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Log in user
// @route POST /user/login
// @access User
export let loginUser = async (req: Request, res: Response) => {
    try {
        // Check if email exists
        const user = await User.findOne({
            where: {
                Email: req.body.email
            }
        })
        if (!user) {
            // TODO Change before going into production
            return res.status(400).send("Email not found")
        }

        // Verify password
        const password = await bcrypt.compare(req.body.password, user.Password)
        if (!password) {
            // TODO Change before going into production
            return res.status(400).send("Password is incorrect")
        }

        // Get connection information
        const connectionInfo = {
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        }

        const userId = user.id
        const role = user.Role

        // Create session tokens
        const sessionToken = await createSession(userId, connectionInfo)

        // Create access token and refresh token
        await refreshToken(sessionToken, userId, role, res)

        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')
    }

}

// @desc Users
// @route GET /user
// @access Admin
export let getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }

}

// @desc Get single user
// @route GET /user/:id
// @access Admin
export let getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: {
                User_Name: req.params.user_name
            }
        }).select("-password")

        if (!user) {
            return res.status(404).send("User not found")
        }

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Update User
// @route PUT /users/:id
// @access Admin
export let updateUser = async (req: Request, res: Response) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Delete User
// @route DELETE /users/:id
// @access Admin
export let deleteUser = async (req: Request, res: Response) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Logout User
// @route POST /users/logout
// @access User
export let logoutUser = async (req: Request, res: Response) => {
    const JWTSignature = process.env.JWT_SECRET
    try {
        if (req.cookies.refreshToken) {
            const { refreshToken } = req.cookies
            // Decode refresh token
            const { sessionToken } = jwt.verify(refreshToken, JWTSignature)
            // Delete session record from DB
            await Session.destroy({
                where: {
                    session_token: sessionToken
                }
            })
        }
        // Remove Cookies
        res
            .clearCookie("refreshToken")
            .clearCookie("accessToken")

        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Change Password
// @route POST /users/changepassword
// @access User
export let changePassword = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body

        // Verify user login
        const user = await getUserFromCookies(req, res)

        if (user?.email) {
            const { isAuthorized, userId } = await authorizeUser(user.email, oldPassword)
            if (isAuthorized) {
                await changePassword(userId, newPassword)
                return res.status(200).send('Password has been changed')
            }
        }
        return res.status(401).send()
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }

}

// @desc Validate Email Link
// @route POST /users/validateemail
// @access User
export let validateEmail = async (req: Request, res: Response) => {
    try {
        const { email, token } = req.body
        // Create hash
        const emailToken = await createVerifyEmailToken(email)

        // Compare hash and token
        const isValid = emailToken === token
        if (isValid) {
            // Change user valid to true
            await User.update({ Verified: true }, {
                where: {
                    Email: email
                }
            })
            return res.sendStatus(200)
        }
        return res.sendStatus(401)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')
    }
}