import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import UserService from "../services/user.service";
import DB from "../config/postgres-db";
import jwt from "jsonwebtoken";
import createSession from "../tokens/createSession";
import refreshToken from "../tokens/refreshToken";
import getUserFromCookies from "../tokens/getUserFromCookies";
import authorizeUser from "../utils/authorizeUser";

class UserController {
    public UserService = new UserService()

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: User[] = await this.UserService.findAllUsers()

            return res.status(200).json({
                data: findAllUsersData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const UserId = Number(req.params.id)
            const findSingleUserData = await this.UserService.findUserById(UserId)

            return res.status(200).json({
                data: findSingleUserData
            })
        } catch (error) {
            next(error)
        }
    }

    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const UserData: CreateUserDTO = req.body
            const createUserData: User = await this.UserService.registerUser(UserData, UserData.role)

            return res.status(200).json({
                data: createUserData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const UserId = Number(req.params.id)
            const UserData: CreateUserDTO = req.body
            const updateUser: User = await this.UserService.updateUser(UserId, UserData)

            return res.status(200).json({
                data: updateUser
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const UserId = Number(req.params.id)
            const deleteUserData = await this.UserService.deleteUser(UserId)

            return res.status(200).json({
                data: deleteUserData
            })
        } catch (error) {
            next(error)
        }
    }

    public loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDTO = req.body
            const connectionInfo = {
                ip: req.ip,
                userAgent: req.headers["user-agent"]
            }
            const loginUser = await this.UserService.loginUser(userData, connectionInfo)

            const sessionToken = await createSession(userData.id, connectionInfo)

            await refreshToken(sessionToken, userData.id, userData.role, res)

        } catch (error) {
            next(error)
        }
    }

    public validateEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = {
                email: req.body.email,
                token: req.body.token
            }

            await this.UserService.validateEmail(data)

            return res.sendStatus(200)

        } catch (error) {
            next(error)
        }
    }

    public logoutUser = async (req: Request, res: Response, next: NextFunction) => {
        const Session = DB.Session
        const JWTSignature = process.env.JWT_SECRET
        try {
            if (req.cookies.refreshToken) {
                const { refreshToken } = req.cookies
                // Decode refresh token
                const sessionToken = jwt.verify(refreshToken, JWTSignature)
                // Delete session record from DB
                await Session.destroy({ where: { sessionToken: sessionToken } })
            }

            // Remove cookies
            res
                .clearCookie('refreshToken')
                .clearCookie('accessToken')

            return res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { oldPassword, newPassword } = req.body

            // Verify user login
            const user = await getUserFromCookies(req, res)
            // @ts-ignore
            if (user?.email) {
                // @ts-ignore
                const { isAuthorized, userId } = await authorizeUser(user.email, oldPassword)
                if (isAuthorized) {
                    await this.UserService.updateUser(userId, newPassword)

                    return res.status(200).send('Password has been changed')
                }
            }
            return res.sendStatus(401)
        } catch (error) {
            next(error)
        }
    }

}

export default UserController