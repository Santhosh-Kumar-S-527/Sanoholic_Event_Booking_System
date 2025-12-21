const nodemailer = require("nodemailer");

module.exports = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "SANOHOLIC <no-reply@sanoholic.com>",
    to,
    subject,
    text,
  });
  console.log("📧 Email sent:", info.response);
};
