require("dotenv").config();
var nodemailer = require("nodemailer");

function send_mail(to) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  var mailOptions = {
    from: process.env.USER,
    to: to,
    subject: "Review the experience in Pallawala Resort, Katharagama",
    text: "Review Us using www.google.com",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = send_mail;
