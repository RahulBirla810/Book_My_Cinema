const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter;

    // Check if credentials are dummy or missing
    const isDummy =
      !process.env.MAIL_USER ||
      process.env.MAIL_USER.includes("dummy") ||
      !process.env.MAIL_PASS ||
      process.env.MAIL_PASS.includes("dummy");

    if (isDummy) {
      console.log("\n==================================================");
      console.log("📝 DUMMY MODE ACTIVE (SMTP credentials missing/dummy)");
      console.log(`To: ${email}`);
      console.log(`Subject: ${title}`);
      console.log(`OTP/Body: ${body}`);
      console.log("==================================================\n");

      return {
        messageId: "mock-message-id-" + Date.now(),
        preview: "Mock preview - check server logs for OTP code"
      };
    } else {
      // Use configured SMTP details
      const transportConfig = {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT) || 587,
        secure: process.env.MAIL_PORT === "465",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      };

      // Force secure SMTPS (port 465) for Google SMTP on Render to bypass STARTTLS blocks
      if (process.env.MAIL_HOST && (process.env.MAIL_HOST.includes("gmail") || process.env.MAIL_HOST.includes("googlemail"))) {
        transportConfig.host = "smtp.gmail.com";
        transportConfig.port = 465;
        transportConfig.secure = true;
      }

      transporter = nodemailer.createTransport(transportConfig);

      let info = await transporter.sendMail({
        from: `Movie-Booker <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      });

      console.log(`\n📧 Email sent successfully to ${email} (via ${process.env.MAIL_HOST || 'Gmail service'})`);
      return info;
    }
  } catch (error) {
    console.error("❌ Error in mailSender:", error.message);
    throw error; // Rethrow to let caller handle it if needed
  }
};

module.exports = mailSender;
