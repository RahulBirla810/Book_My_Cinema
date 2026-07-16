const mongoose = require('mongoose');

const dbConnect = () => {
    console.log("Connecting to MongoDB...");
    mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 5000 // fail fast if database is unreachable (5 seconds timeout)
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("DB Connection Failed: ", error.message);
        console.log("Allowing server to keep running even though MongoDB is temporarily unavailable...");
    });
}

module.exports = dbConnect;