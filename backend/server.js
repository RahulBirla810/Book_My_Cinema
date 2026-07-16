const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const PORT = process.env.PORT || 5000;

const http = require("http");
const { Server } = require("socket.io");

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(",").map(url => url.trim()) 
  : ["http://localhost:3000"];

// middleware setup
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or headers like Authorization
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or headers like Authorization
  },
  transports: ["websocket", "polling"], // Try WebSocket first, then fallback to polling
});

// Trigger fresh deployment on Render after Atlas IP Whitelist update
console.log("Starting server...");

// connections
dbConnect();

console.log("Connecting to Cloudinary...");
cloudinaryConnect();
console.log("Cloudinary Connected");

// importing routes
console.log("Registering Routes...");
const userRoutes = require("./routes/userRoute");
const cinemaRoutes = require("./routes/cinemaRoute");
const movieRoutes = require("./routes/movieRoute");
const showRoutes = require("./routes/showRoute")(io);
const paymentRoutes = require("./routes/paymentRoute")(io);
const bookingRoutes = require("./routes/bookingRoute");
const eventRoutes = require("./routes/eventRoute");

// route handlers
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/cinema", cinemaRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/show", showRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/event", eventRoutes);

// default route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// start server
console.log("Starting HTTP Server...");
server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
