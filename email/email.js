const nodemailer = require('nodemailer')

exports.sendEmail = async (to, subject, html) => {
    const { EMAIL_USER, EMAIL_PWD } = process.env

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PWD
        }
    })

    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
}
