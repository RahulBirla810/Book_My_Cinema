const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // 1. Resend Integration (HTTPS port 443 - completely bypasses SMTP blocks)
    if (process.env.RESEND_API_KEY) {
      console.log(`Sending email to ${email} via Resend HTTP API...`);
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM || "onboarding@resend.dev",
          to: email,
          subject: title,
          html: body
        })
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Resend API call failed");
      }
      console.log("📧 Email sent successfully via Resend HTTP API:", responseData);
      return responseData;
    }

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
      // 2. Use configured SMTP details (Nodemailer)
      const mailPort = parseInt(process.env.MAIL_PORT) || 587;
      const transportConfig = {
        host: process.env.MAIL_HOST,
        port: mailPort,
        secure: mailPort === 465, // secure: true for port 465, false for 587
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000, // 10 seconds connection timeout
        greetingTimeout: 10000,
        socketTimeout: 10000,
      };

      console.log("Configuring SMTP Transporter with values:", {
        host: transportConfig.host,
        port: transportConfig.port,
        secure: transportConfig.secure,
        user: transportConfig.auth.user,
        hasPass: !!transportConfig.auth.pass
      });

      transporter = nodemailer.createTransport(transportConfig);

      // Verify SMTP Transporter connection
      console.log("Verifying SMTP connection settings...");
      try {
        await transporter.verify();
        console.log("SMTP Connection verified successfully!");
      } catch (verifyError) {
        console.error("❌ SMTP Verification Failed:", {
          message: verifyError.message,
          code: verifyError.code,
          command: verifyError.command,
          stack: verifyError.stack
        });
        throw verifyError;
      }

      let info = await transporter.sendMail({
        from: `Movie-Booker <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      });

      console.log(`\n📧 Email sent successfully to ${email} (via ${process.env.MAIL_HOST})`);
      return info;
    }
  } catch (error) {
    console.error("❌ Error in mailSender utility:", {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    throw error;
  }
};

module.exports = mailSender;
