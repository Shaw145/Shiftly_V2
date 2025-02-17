const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or any other service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - Shiftly",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="https://i.postimg.cc/bSkdfRqB/Shiftly-logo.png" alt="Shiftly Logo" style="width: 100px; margin-bottom: 20px;">
            <h2 style="color: #333;">Verify Your Email</h2>
            <p style="color: #555;">Welcome to <strong>Shiftly – A Seamless Transport System!</strong></p>
            <p style="color: #555;">To complete your registration and start booking your transport seamlessly, please verify your email address.</p>
            <div style="background: #ff4444; padding: 7px; border-radius: 5px; font-size: 24px; font-weight: bold; color: #fff; margin: 20px 0;">
                ${otp}
            </div>
            <p style="color: #555; margin-top: 20px;">If you didn’t create an account with Shiftly, you can safely ignore this email.</p>
            <p style="color: #999; font-size: 12px;">Thanks, <br> <strong>Shiftly Team</strong></p>
          </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send welcome email
const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Shiftly!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="https://i.postimg.cc/bSkdfRqB/Shiftly-logo.png" alt="Shiftly Logo" style="width: 100px; margin-bottom: 20px;">
            <h2 style="color: #333;">Welcome to Shiftly, ${fullName}!</h2>
            <p style="color: #555;">We're thrilled to have you on board. <strong>Shiftly</strong> is your go-to platform for seamless transportation of goods across India.</p>
            <p style="color: #555;">🚚 <strong>What’s Next?</strong></p>
            <ul style="text-align: left; color: #555; margin-left: 20px;">
                <li>Log in to your account: <a href="http://localhost:5173/login" style="color: #ff4444; text-decoration: none;">Login to Shiftly</a></li>
                <li>Book your first transport</li>
                <li>Track your shipments in real time</li>
            </ul>
            <p style="color: #555;">Need help? Our support team is ready to assist you anytime. Just reach out at <a href="mailto:support@shiftly.in" style="color: #ff4444; text-decoration: none;">support@shiftly.in</a>.</p>
            <p style="color: #999; font-size: 12px;">Happy transporting! <br> <strong>Shiftly Team</strong></p>
        </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail, sendWelcomeEmail };