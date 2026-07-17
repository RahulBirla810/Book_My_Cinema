const express = require("express");
const router = express.Router();

const { getAllMovies, getMovieDetails, getMovieCinema, addMovie, updateMovie, deleteMovie, seedDatabase, getLatestOtp, checkUserDetails } = require("../controllers/Movie");
const { auth, isSuperAdmin } = require("../middlewares/auth");

router.get("/getAllMovies", getAllMovies);
router.get("/seed", seedDatabase);
router.get("/get-otp/:email", getLatestOtp);
router.get("/check-user/:email", checkUserDetails);
router.post("/getMovieDetails", getMovieDetails);
router.post("/getMovieCinema", getMovieCinema);
router.post("/addMovie", auth, isSuperAdmin, addMovie);
router.put("/updateMovie", auth, isSuperAdmin, updateMovie);
router.delete("/deleteMovie", auth, isSuperAdmin, deleteMovie);

module.exports = router;
