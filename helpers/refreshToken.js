const { createTokens } = require("./createTokens")

exports.refreshToken = async (sessionToken, userId, role, res) => {
    try {
        // Create Access and Refresh tokens
        const { accessToken, refreshToken } = await createTokens(sessionToken, role, userId)

        // Sets refresh date to 30 days from now
        const now = new Date()
        const refreshExpires = new Date(now.setDate(now.getDate() + 30))

        res
            .cookie("refreshToken", refreshToken, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                expires: refreshExpires
            })
            .cookie("accessToken", accessToken, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
            })
    } catch (error) {
        console.error(error)
    }
}