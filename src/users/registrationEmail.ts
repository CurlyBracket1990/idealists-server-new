"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail(newUser) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let account = await nodemailer.createTestAccount();
  // console.log('I run');
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostnet.nl",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@the-idealists.com',
      pass: process.env.MAIL_PASS
    },
    logger: true,
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"The Idealists" <support@the-idealists.com>', // sender address
    to: newUser, // list of receivers
    subject: "Registration with Idealists", // Subject line
    text: "Congratulation, you are now registered with Idealists", // plain text body
    html: "<b>Congratulation, you are now registered with Idealists</b>", // html body
  };
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail().catch(console.error);