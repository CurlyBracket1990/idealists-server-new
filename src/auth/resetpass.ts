import { JsonController, Post, Body, BadRequestError } from 'routing-controllers'
import User from '../users/entity'
import { IsEmail, } from 'class-validator'
import { sign } from './jwt'

const nodemailer = require("nodemailer");

class AuthenticatePayload {
  @IsEmail()
  email: string
}

@JsonController()
export default class ResetPasswordController {

  @Post('/reset-password')
  async resetPassword(
    @Body() { email }: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user || !user.id) throw new BadRequestError('A user with this email does not exist')

    const jwt = sign({ id: user.id })
    // return { jwt }
    async function sendEmail(usr) {
      let transporter = nodemailer.createTransport({
        host: "smtp.hostnet.nl",
        port: 587,
        secure: false,
        auth: {
          user: 'support@the-idealists.com',
          pass: process.env.MAIL_PASS
        },
        logger: true,
      });

      let mailOptions = {
        from: '"The Idealists" <support@the-idealists.com>', // sender address
        to: usr.email, // list of receivers
        subject: "The Idealists - reset password", // Subject line
        text: `Dear ${usr.firstName}. You requested to reset your password for The Idealists. Please visit this url http://localhost:3000/reset-password/${jwt} and enter your new password`, // plain text body
        html: `<h3>Dear ${usr.firstName},</h3>
        <p>You requested to reset your password for The Idealists.</p>
        <p>Please click on <a href=http://localhost:3000/reset-password/${jwt} >this link</a> to reset your password`, // html body
      };
      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      console.log(usr.firstName, jwt)
    }
    console.log(user.firstName, jwt)
    sendEmail(user).catch(console.error);
  }

  // @Put("/reset-pwd/:token")
  // async reset(@Param("token") token: verify(),

  //   @Body() update: Partial<User>
  // ) {
  //   const user = await User.findOne(id)
  //   if (!user) throw new NotFoundError('Cannot find user')

  //   return User.merge(user, update).save();
  // }
}