const Movie = require("../models/Movie");
const MovieShow = require("../models/MovieShow");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.getAllMovies = async (req, res) => {
  try {
    // fetch all movies
    const movies = await Movie.find();

    // return response
    return res.status(200).json({
      success: true,
      data: movies,
      message: "All Movies fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch All Movies, please try again",
    });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    // fetch course details
    const { movieId } = req.body;

    // validation
    const movieDetails = await Movie.findById(movieId);
    if (!movieDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find movie with id: ${movieId}`,
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      data: movieDetails,
      message: "Movie Details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch Movie Details, please try again",
    });
  }
};

exports.getMovieCinema = async (req, res) => {
  try {
    // fetch course details
    const { movieId } = req.body;

    // Find the MovieShow document that matches the movieId and isLive is true
    const uniqueCinemas = await MovieShow.find({
      movieId: movieId,
      isLive: true,
    })
      .populate({
        path: "movieId",
        model: "Movie",
      })
      .populate({
        path: "cinemaId",
        model: "Cinema",
        populate: {
          path: "cityId",
          model: "City",
        },
      })
      .populate({
        path: "showSeats",
        model: "ShowSeat",
        select: "seatId price status",
      });

    if (!uniqueCinemas || uniqueCinemas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No live movie show found for this movie.",
      });
    }

    const tempData = uniqueCinemas.map((show) => {
      return {
        movieDetails: show.movieId,
        isLive: show.isLive,
        cinemas: {
          showStart: show.showStart,
          showEnd: show.showEnd,
          timing: show.timing,
          cinemaId: show.cinemaId._id,
          cinemaName: show.cinemaId.cinemaName,
          screens: show.cinemaId.screens,
          pincode: show.cinemaId.pincode,
          city: show.cinemaId.cityId.cityName,
          adminDetailes: show.cinemaId.adminDetailes,
          showScreenId: show.screenId,
          showSeats: show.showSeats,
        },
      };
    });

    const arr = [];
    for (const key of tempData) {
      arr.push(key.cinemas);
    }

    const finalData = {
      movieDetails: tempData[0].movieDetails,
      isLive: tempData[0].isLive,
      cinemas: arr,
    };

    // return response
    return res.status(200).json({
      success: true,
      data: finalData,
      message: "MovieShow and cinema details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch Movie Show, please try again",
    });
  }
};

exports.addMovie = async (req, res) => {
  try {
    // fetch data
    const {
      movieName,
      releaseDate,
      summary,
      genres,
      cast,
      crew,
      supportingLanguages,
      thumbnail,
      banner,
    } = req.body;

    // get thumbnail image
    // const thumbnail = req.files.thumbnailImage;
    // const banner = req.files.thumbnailImage;

    // validation
    if (
      !movieName ||
      !releaseDate ||
      !summary ||
      !genres ||
      !cast ||
      !crew ||
      !supportingLanguages ||
      !thumbnail ||
      !banner
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the details",
      });
    }

    // // upload image to cloudinary
    // const thumbnailUpload = await uploadFileToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_IMAGE
    // );

    // create an entry for new course
    const newMovie = await Movie.create({
      movieName,
      releaseDate,
      summary,
      genres,
      cast,
      crew,
      supportingLanguages,
      thumbnail,
      banner,
    });

    return res.status(200).json({
      success: true,
      data: newMovie,
      message: "Movie Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to Add Movie, please try again",
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    // fetch data
    const { movieId } = req.body;
    const updates = req.body;

    // validation
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // // If Thumbnail Image is found, update it
    // if (req.files) {
    //   const thumbnail = req.files.thumbnailImage;
    //   const thumbnailImage = await uploadFileToCloudinary(
    //     thumbnail,
    //     process.env.FOLDER_IMAGE
    //   );
    //   movie.thumbnail = thumbnailImage.secure_url;
    // }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      movie[key] = updates[key];
    }
    await movie.save();

    return res.status(200).json({
      success: true,
      data: movie,
      message: "Movie Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to Update Movie, please try again",
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    // fetch data
    const { movieId } = req.body;

    // delete the movie
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to Delete Movie, please try again",
    });
  }
};

exports.seedDatabase = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const bcrypt = require("bcrypt");
    const Movie = require("../models/Movie");
    const Cinema = require("../models/Cinema");
    const City = require("../models/City");
    const MovieShow = require("../models/MovieShow");
    const Screen = require("../models/Screen");
    const Seat = require("../models/Seat");
    const ShowSeat = require("../models/ShowSeat");
    const User = require("../models/User");
    const Event = require("../models/Event");
    const Offer = require("../models/Offer");
    const GiftCard = require("../models/GiftCard");
    const { bollywoodMovies } = require("../utils/seed_bollywood_movies");
    const { sampleEvents, sampleOffers, sampleGiftCards } = require("../utils/seed_categories");

    console.log("Starting Master Seeding Process...");

    // 1. Clean up old data to ensure clean state
    await Movie.deleteMany({});
    await City.deleteMany({});
    await Cinema.deleteMany({});
    await Screen.deleteMany({});
    await Seat.deleteMany({});
    await MovieShow.deleteMany({});
    await ShowSeat.deleteMany({});
    await Event.deleteMany({});
    await Offer.deleteMany({});
    await GiftCard.deleteMany({});
    await User.deleteMany({ email: "admin@cinema.com" });
    await User.deleteMany({ email: "rahulbirla810@gmail.com" });

    // 2. Create Admin
    const hashedPassword = await bcrypt.hash("Rahul@123", 10);
    const admin = await User.create({
      userName: "Rahul Birla",
      email: "rahulbirla810@gmail.com",
      password: hashedPassword,
      contactNumber: "9876543210",
      accountType: "SuperAdmin"
    });

    // 3. Create Cities (Indore, Delhi, Mumbai, Bengaluru)
    const citiesToCreate = ["indore", "delhi", "mumbai", "bengaluru"];
    const createdCities = [];
    for (const cityName of citiesToCreate) {
      const city = await City.create({ cityName });
      createdCities.push(city);
    }
    const defaultCity = createdCities.find(c => c.cityName === "indore") || createdCities[0];

    // 4. Create Cinema
    const cinema = await Cinema.create({
      cinemaName: "PVR Indore Treasure Island",
      pincode: 452001,
      cityId: defaultCity._id,
      adminDetailes: admin._id,
      screens: []
    });

    // 5. Create Screen
    const screen = await Screen.create({
      cinemaId: cinema._id,
      seats: []
    });
    cinema.screens.push(screen._id);
    await cinema.save();

    // 6. Create 60 Seats (10 VIP, 20 BALCONY, 30 REGULAR)
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

    // 7. Seed Movies & Shows & Show Seats
    let seededMoviesCount = 0;
    let createdShowsCount = 0;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(21, 0, 0, 0);

    for (const movieData of bollywoodMovies) {
      const movieDoc = await Movie.create(movieData);
      seededMoviesCount++;

      // Create a 6-9 PM show for the movie
      const showDoc = await MovieShow.create({
        movieId: movieDoc._id,
        cinemaId: cinema._id,
        screenId: screen._id,
        adminId: admin._id,
        showStart: tomorrow,
        showEnd: tomorrowEnd,
        isLive: true,
        timing: "9-12pm"
      });
      createdShowsCount++;

      // Create Show Seats
      const showSeatIds = [];
      for (const seatId of screen.seats) {
        const showSeat = await ShowSeat.create({
          seatId,
          showId: showDoc._id,
          status: "Available"
        });
        showSeatIds.push(showSeat._id);
      }
      showDoc.showSeats = showSeatIds;
      await showDoc.save();
    }

    // 8. Seed categories, events, offers, gift cards
    const createdEvents = await Event.insertMany(sampleEvents);
    const createdOffers = await Offer.insertMany(sampleOffers);
    const createdGiftCards = await GiftCard.insertMany(sampleGiftCards);

    return res.status(200).json({
      success: true,
      message: "Database seeded successfully!",
      admin: admin.email,
      citiesCreatedCount: createdCities.length,
      cinemaCreated: cinema.cinemaName,
      seatsCreatedCount: seatIds.length,
      moviesSeededCount: seededMoviesCount,
      showsCreatedCount: createdShowsCount,
      eventsSeededCount: createdEvents.length,
      offersSeededCount: createdOffers.length,
      giftCardsSeededCount: createdGiftCards.length
    });
  } catch (error) {
    console.error("Error during database seeding:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Seeding failed"
    });
  }
};

exports.getLatestOtp = async (req, res) => {
  try {
    const OTP = require("../models/OTP");
    const email = req.params.email;
    const latestOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp) {
      return res.status(404).json({ success: false, message: "OTP not found for this email" });
    }
    return res.status(200).json({ success: true, otp: latestOtp.otp });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
