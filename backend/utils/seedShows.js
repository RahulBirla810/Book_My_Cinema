const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: __dirname + "/../.env" });

const Movie = require("../models/Movie");
const Cinema = require("../models/Cinema");
const City = require("../models/City");
const MovieShow = require("../models/MovieShow");
const Screen = require("../models/Screen");
const Seat = require("../models/Seat");
const ShowSeat = require("../models/ShowSeat");
const User = require("../models/User");

async function seed() {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bookmycinema";
    console.log("Connecting to MongoDB at:", mongoUrl);
    await mongoose.connect(mongoUrl);

    console.log("Cleaning old cinema, city, show, screen, seat data...");
    await City.deleteMany({});
    await Cinema.deleteMany({});
    await Screen.deleteMany({});
    await Seat.deleteMany({});
    await MovieShow.deleteMany({});
    await ShowSeat.deleteMany({});
    await User.deleteMany({ email: "admin@cinema.com" });

    console.log("Creating Admin User...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      userName: "Admin User",
      email: "admin@cinema.com",
      password: hashedPassword,
      contactNumber: "9876543210",
      accountType: "SuperAdmin"
    });
    console.log("Admin User created successfully.");

    console.log("Creating City 'mumbai'...");
    const city = await City.create({
      cityName: "mumbai"
    });

    console.log("Creating Cinema 'PVR Icon Infiniti Mall'...");
    const cinema = await Cinema.create({
      cinemaName: "PVR Icon Infiniti Mall",
      pincode: 400053,
      cityId: city._id,
      adminDetailes: admin._id,
      screens: []
    });

    console.log("Creating Screen...");
    const screen = await Screen.create({
      cinemaId: cinema._id,
      seats: []
    });

    cinema.screens.push(screen._id);
    await cinema.save();

    console.log("Creating 60 Seats (10 VIP, 20 Balcony, 30 Regular)...");
    const seatIds = [];
    for (let i = 1; i <= 60; i++) {
      let seatType = "REGULAR";
      let seatPrice = 150;
      if (i <= 10) {
        seatType = "VIP";
        seatPrice = 300;
      } else if (i <= 30) {
        seatType = "BALCONY";
        seatPrice = 250;
      }
      const seat = await Seat.create({
        seatType,
        seatNumber: i,
        seatPrice
      });
      seatIds.push(seat._id);
    }
    screen.seats = seatIds;
    await screen.save();
    console.log("Seats created successfully.");

    console.log("Fetching movies to create shows...");
    const movies = await Movie.find();
    if (movies.length === 0) {
      console.log("No movies found! Run seedMovies.js first.");
      return;
    }

    console.log(`Creating MovieShows for ${movies.length} movies...`);
    for (const movie of movies) {
      // Create a 3-6 PM show
      const show1 = await MovieShow.create({
        movieId: movie._id,
        cinemaId: cinema._id,
        adminId: admin._id,
        showStart: new Date(),
        showEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        isLive: true,
        timing: "3-6pm",
        screenId: screen._id,
        showSeats: []
      });

      // Create ShowSeats for show1
      const showSeatIds1 = [];
      for (const seatId of seatIds) {
        const showSeat = await ShowSeat.create({
          seatId: seatId,
          showId: show1._id,
          status: "Available"
        });
        showSeatIds1.push(showSeat._id);
      }
      show1.showSeats = showSeatIds1;
      await show1.save();

      // Create a 9-12 PM show
      const show2 = await MovieShow.create({
        movieId: movie._id,
        cinemaId: cinema._id,
        adminId: admin._id,
        showStart: new Date(),
        showEnd: new Date(Date.now() + 3 * 60 * 60 * 1000),
        isLive: true,
        timing: "9-12pm",
        screenId: screen._id,
        showSeats: []
      });

      // Create ShowSeats for show2
      const showSeatIds2 = [];
      for (const seatId of seatIds) {
        const showSeat = await ShowSeat.create({
          seatId: seatId,
          showId: show2._id,
          status: "Available"
        });
        showSeatIds2.push(showSeat._id);
      }
      show2.showSeats = showSeatIds2;
      await show2.save();
    }

    console.log("Database successfully seeded with Shows and Seats!");
  } catch (error) {
    console.error("Error during show seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
