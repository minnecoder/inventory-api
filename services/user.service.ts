import bcrypt from 'bcryptjs'
import DB from "../config/postgres-db";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import { NotFound } from "../errors/NotFound";
import HTTPException from '../errors/HTTPException'
import { createVerifyEmailLink, createVerifyEmailToken } from '../email/verifyEmail';
import { AlreadyExists } from '../errors/AlreadyExists';

class UserService {
    public User = DB.User

    public async findAllUsers(): Promise<User[]> {
        const allUsers: User[] = await this.User.findAll()

        return allUsers
    }

    public async findUserById(userId: number): Promise<User> {
        const singleUser: User = await this.User.findByPk(userId)
        if (!singleUser) throw new NotFound('User')
        return singleUser
    }

    public async registerUser(userData: CreateUserDTO, role: string): Promise<User> {
        // Check if email already exists
        const checkEmail: User = await this.User.findOne({ where: { email: userData.email } })

        if (checkEmail) throw new AlreadyExists('Email')

        //Generate hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        //Create new user
        const createUser: User = await this.User.create({ ...userData, password: hashedPassword, role: role })

        if (createUser) {
            //Sends verification email to user
            const emailLink = await createVerifyEmailLink(userData.email)
            await sendEmail({
                to: userData.email,
                subject: "Verify your email address",
                html: `<a href="${emailLink}"> Click to verify your email</a>`
            })
        }

        return createUser
    }

    public async loginUser(userData: CreateUserDTO, connectionInfo: { ip: string, userAgent: string }): Promise<User> {

        // Verify email address is correct
        const user = await this.User.findOne({ where: { email: userData.email } })

        // TODO check if error number is correct
        // Change message before going into production
        if (!user) throw new HTTPException(400, 'Email not found')

        // Verify password
        const checkPassword = await bcrypt.compare(userData.email, user.email)

        // TODO check if error number is correct
        // Change message before going into production
        if (!checkPassword) throw new HTTPException(400, 'Email not found')

        return user

        // Create session and refresh tokens in the controller for this function
    }

    public async updateUser(userId: number, userData: CreateUserDTO): Promise<User> {
        const findUser: User = await this.User.findByPk(userId)

        if (!findUser) throw new NotFound('User')

        await this.User.update({ ...userData }, { where: { id: userId } })

        const updatedUser = await this.User.findByPk(userId)

        return updatedUser
    }

    public async deleteUser(userId: number): Promise<User> {
        const finduser: User = await this.User.findByPk(userId)

        await this.User.destroy({ where: { id: userId } })

        return finduser
    }

    public async validateEmail(data: { email: string, token: string }) {
        // Create hash
        const emailToken = await createVerifyEmailToken(data.email)

        // Compare hash and token
        const isValid = emailToken === data.token
        if (isValid) {
            // Change user valid to true
            await this.User.update({ verified: true }, { where: { email: data.email } })

            return isValid
        }
        else {
            throw new HTTPException(401, 'Unable to validate email');

        }
    }
}
export default UserService