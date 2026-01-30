const nodemailer = require("nodemailer");

module.exports = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const info = await transporter.sendMail({
    from: `SANOHOLIC <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });

  console.log("✅ Email accepted by Gmail:", info.messageId);
};
