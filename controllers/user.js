const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createSession } = require('../helpers/createSession')
const { refreshToken } = require('../helpers/refreshToken')
const Session = require('../models/Session')
const User = require("../models/User")

// @desc Add user
// @route PO/user/add
// @access User
exports.registerUser = async (req, res) => {
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
    // Check if user name already exists
    const userExists = await User.findOne({
        where: {
            User_Name: req.body.user_name
        }
    })
    if (userExists) {
        // TODO Change before going into production
        return res.status(401).send("User name already exists")
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Add new user
    try {
        const user = await User.create({
            User_Name: req.body.user_name,
            Email: req.body.email,
            Password: hashedPassword,
            Role: req.body.role
        })

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}

// @desc Log in user
// @route POST /user/login
// @access User
exports.loginUser = async (req, res) => {
    // Check if user exists
    const user = await User.findOne({
        where: {
            User_Name: req.body.user_name
        }
    })
    if (!user) {
        return res.status(401).json({
            error: "User name not found"
        })
    }

    // Verify password
    const password = await bcrypt.compare(req.body.password, user.Password)
    if (!password) {
        return res.status(402).json({ error: "Password is incorrect" })
    }

    const connectionInfo = {
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    }

    const userId = user.id
    const role = user.Role

    const sessionToken = await createSession(userId, role, connectionInfo)

    await refreshToken(sessionToken, userId, res)

    return res.status(200).json({
        success: true
    })
}

// @desc Get all users
// @route GET /user
// @access User
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}


// @desc Get single user
// @route GET /user/:id
// @access User
exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                User_Name: req.params.user_name
            }
        }).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }
        await User.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.logoutUser = async (req, res) => {
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

        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}