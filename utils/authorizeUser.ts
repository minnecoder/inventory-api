import { compare } from "bcryptjs";
import { User } from "/interfaces/user.interface";

async function authorizeUser(email: string, password: string) {
    const user = await this.User.findOne({ where: { email: email } })

    const isAuthorized = await compare(password, user.password)

    return { isAuthorized, userId: user.id }
}

export default authorizeUser