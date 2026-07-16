const Razorpay = require("razorpay");

const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY;
const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

let instance = null;

if (keyId && keySecret) {
  try {
    instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (err) {
    console.error("⚠️ Failed to initialize Razorpay:", err.message);
  }
}

if (!instance) {
  console.warn("⚠️ Razorpay credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are missing or invalid! Using dummy instance to bypass startup crash.");
  instance = {
    orders: {
      create: async () => {
        throw new Error("Razorpay credentials are missing! Unable to initiate real payments.");
      }
    }
  };
}

exports.instance = instance;
