const nodemailer = require("nodemailer");

const sendResetMail = async (email, resetToken, type) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
                <h2>Password Reset</h2>
                <p>You requested for a password reset. Click the link below to reset your password. This link is valid for 10 minutes.</p>
                <a href="${process.env.FRONTEND_API_LINK}/${type}/update-password/${resetToken}" target="_blank">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reset email sent successfully");
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Could not send reset email");
  }
};

module.exports = sendResetMail;
