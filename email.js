const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(toEmail, enclosedMessage) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"My Portfolio" <d.pansevic.portfolio@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: "Portfolio Message Left", // Subject line
    text: enclosedMessage, // plain text body
    html: enclosedMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


module.exports = sendEmail;