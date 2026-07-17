const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from FWF",
      otp
    );
    console.log("Email sent Successfully", mailResponse);
  } catch (error) {
    console.error("⚠️ WARNING: Error occurred while sending OTP email:", error.message);
    console.log(`Allowing registration to proceed. OTP code is: ${otp}`);
    // Do not throw the error so the database document is successfully created
    // even if outbound SMTP is blocked by the cloud provider (Render).
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
