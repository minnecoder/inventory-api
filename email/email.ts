const nodemailer = require('nodemailer')

interface Email {
    to: string
    subject: string
    html: string
}
async function sendEmail(data: Email) {
    const { to, subject, html } = data
    const { EMAIL_USER, EMAIL_PWD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL_USER,
            pass: EMAIL_PWD,
            clientId: OAUTH_CLIENTID,
            clientSecret: OAUTH_CLIENT_SECRET,
            refreshToken: OAUTH_REFRESH_TOKEN
        }
    })

    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        html
    }

    transporter.sendMail(mailOptions, (err: string, info: string) => {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
}

module.exports = sendEmail