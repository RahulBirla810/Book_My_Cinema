const mailSender = async (email, title, body) => {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const sender = process.env.MAIL_FROM || "onboarding@resend.dev";

    if (!resendKey) {
      // Allow fallback to dummy logging mode for local testing if API key is not configured
      console.log("\n==================================================");
      console.log("📝 DUMMY MODE ACTIVE (RESEND_API_KEY missing)");
      console.log(`To: ${email}`);
      console.log(`Subject: ${title}`);
      console.log(`OTP/Body: ${body}`);
      console.log("==================================================\n");

      return {
        messageId: "mock-message-id-" + Date.now(),
        preview: "Mock preview - check server logs for OTP code"
      };
    }

    console.log(`Sending email to ${email} via Resend HTTP API (From: ${sender})...`);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: sender,
        to: email,
        subject: title,
        html: body
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error("❌ Resend API Error Response:", responseData);
      throw new Error(responseData.message || `Resend API returned status ${response.status}`);
    }

    console.log("📧 Email sent successfully via Resend HTTP API:", responseData);
    return responseData;
  } catch (error) {
    console.error("❌ Error in Resend mailSender utility:", {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

module.exports = mailSender;
