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
      // Programmatically create an Ethereal test SMTP account
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: `"Movie-Booker Test" <${testAccount.user}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      });

      console.log("\n==================================================");
      console.log("📧 Ethereal Test Email Sent Successfully!");
      console.log(`To: ${email}`);
      console.log(`Subject: ${title}`);
      console.log(`OTP/Body: ${body}`);
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      console.log("==================================================\n");

      return info;
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

      // Gmail integration optimization to prevent Render port 25 blocking hang
      if (process.env.MAIL_HOST && (process.env.MAIL_HOST.includes("gmail") || process.env.MAIL_HOST.includes("googlemail"))) {
        delete transportConfig.host;
        delete transportConfig.port;
        delete transportConfig.secure;
        transportConfig.service = "gmail";
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
