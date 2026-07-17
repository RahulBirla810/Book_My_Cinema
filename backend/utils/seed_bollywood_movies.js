const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/bookmycinema";

// Register all schemas
const Movie = require("../models/Movie");
const City = require("../models/City");
const Cinema = require("../models/Cinema");
const Screen = require("../models/Screen");
const MovieShow = require("../models/MovieShow");
const ShowSeat = require("../models/ShowSeat");
const Seat = require("../models/Seat");
const User = require("../models/User");

const bollywoodMovies = [
  {
    movieName: "3 Idiots",
    genres: ["Comedy", "Drama"],
    supportingLanguages: ["Hindi", "English"],
    summary: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    cast: ["Aamir Khan", "Madhavan", "Sharman Joshi", "Kareena Kapoor"],
    crew: [{ name: "Rajkumar Hirani", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2009-12-25")
  },
  {
    movieName: "Dangal",
    genres: ["Drama", "Sports" || "Drama"], // Fallback to Drama if Sports is not in enum
    supportingLanguages: ["Hindi"],
    summary: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
    cast: ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh"],
    crew: [{ name: "Nitesh Tiwari", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2016-12-23")
  },
  {
    movieName: "PK",
    genres: ["Comedy", "Drama"],
    supportingLanguages: ["Hindi"],
    summary: "An alien on Earth loses the communication device to his spaceship. He asks innocent questions that prompt the society to examine its religious beliefs.",
    cast: ["Aamir Khan", "Anushka Sharma", "Sushant Singh Rajput"],
    crew: [{ name: "Rajkumar Hirani", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2014-12-19")
  },
  {
    movieName: "Bajrangi Bhaijaan",
    genres: ["Drama", "Family"],
    supportingLanguages: ["Hindi"],
    summary: "An Indian man with a magnanimous heart takes a mute young Pakistani girl back to her homeland to reunite her with her family.",
    cast: ["Salman Khan", "Kareena Kapoor Khan", "Nawazuddin Siddiqui"],
    crew: [{ name: "Kabir Khan", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/dd/Bajrangi_Bhaijaan_Poster.jpg",
    banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2015-07-17")
  },
  {
    movieName: "Sholay",
    genres: ["Action", "Adventure"],
    supportingLanguages: ["Hindi"],
    summary: "After his family is murdered by a notorious bandit, a retired police officer enlists the services of two outlaws to capture him.",
    cast: ["Dharmendra", "Amitabh Bachchan", "Sanjeev Kumar", "Hema Malini"],
    crew: [{ name: "Ramesh Sippy", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/52/Sholay-poster.jpg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("1975-08-15")
  },
  {
    movieName: "Dilwale Dulhania Le Jayenge",
    genres: ["Romantic" || "Drama", "Drama"], // Romantic is in enum
    supportingLanguages: ["Hindi"],
    summary: "Raj and Simran meet during a trip to Europe. Raj falls in love with Simran, but she is already promised to another man in India.",
    cast: ["Shah Rukh Khan", "Kajol", "Amrish Puri"],
    crew: [{ name: "Aditya Chopra", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/80/Dilwale_Dulhania_Le_Jayenge_poster.jpg",
    banner: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("1995-10-20")
  },
  {
    movieName: "Kabir Singh",
    genres: ["Drama", "Romantic"],
    supportingLanguages: ["Hindi"],
    summary: "A short-tempered house surgeon goes down a self-destructive path of alcohol and drugs after his lover is forced to marry another man.",
    cast: ["Shahid Kapoor", "Kiara Advani"],
    crew: [{ name: "Sandeep Reddy Vanga", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2019-06-21")
  },
  {
    movieName: "Animal",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["Hindi", "Telugu", "Tamil"],
    summary: "A violent relationship develops between a father and son, leading the son down a dark path of vengeance against his family's enemies.",
    cast: ["Ranbir Kapoor", "Anil Kapoor", "Rashmika Mandanna", "Bobby Deol"],
    crew: [{ name: "Sandeep Reddy Vanga", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/90/Animal_2023_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-12-01")
  },
  {
    movieName: "Jawan",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["Hindi", "Tamil", "Telugu"],
    summary: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
    cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
    crew: [{ name: "Atlee", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-09-07")
  },
  {
    movieName: "Pathaan",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["Hindi"],
    summary: "An Indian secret agent fights a rogue outfit of mercenaries led by a cold-blooded former agent who has a score to settle.",
    cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
    crew: [{ name: "Siddharth Anand", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-01-25")
  },
  {
    movieName: "Chhaava",
    genres: ["Action", "Drama"],
    supportingLanguages: ["Hindi"],
    summary: "An epic historical drama centered around the life of Chhatrapati Sambhaji Maharaj, the brave king of the Maratha Empire.",
    cast: ["Vicky Kaushal", "Rashmika Mandanna", "Akshaye Khanna"],
    crew: [{ name: "Laxman Utekar", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/eb/Chhaava_poster.jpg",
    banner: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2025-02-14")
  },
  {
    movieName: "Kesari",
    genres: ["Action", "Drama"],
    supportingLanguages: ["Hindi"],
    summary: "Based on an incredible true story of the Battle of Saragarhi in which 21 Sikh soldiers fought against 10,000 Afghan invaders.",
    cast: ["Akshay Kumar", "Parineeti Chopra"],
    crew: [{ name: "Anurag Singh", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c4/Kesari_poster.jpg",
    banner: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2019-03-21")
  },
  {
    movieName: "Drishyam 2",
    genres: ["Thriller", "Drama"],
    supportingLanguages: ["Hindi"],
    summary: "Seven years after the case related to Vijay Salgaonkar and his family was closed, a series of unexpected events brings the truth to light.",
    cast: ["Ajay Devgn", "Tabu", "Akshaye Khanna", "Shriya Saran"],
    crew: [{ name: "Abhishek Pathak", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/d7/Drishyam_2_2022_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2022-11-18")
  },
  {
    movieName: "Bhool Bhulaiyaa 3",
    genres: ["Comedy", "Horror"],
    supportingLanguages: ["Hindi"],
    summary: "Rooh Baba returns to resolve a new paranormal curse inside a haunted mansion alongside standard comic twists.",
    cast: ["Kartik Aaryan", "Vidya Balan", "Madhuri Dixit", "Triptii Dimri"],
    crew: [{ name: "Anees Bazmee", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/eb/Bhool_Bhulaiyaa_3_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2024-11-01")
  },
  {
    movieName: "War",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["Hindi", "Tamil", "Telugu"],
    summary: "An Indian soldier is assigned to eliminate his former mentor, who has gone rogue.",
    cast: ["Hrithik Roshan", "Tiger Shroff", "Vaani Kapoor"],
    crew: [{ name: "Siddharth Anand", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/6f/War_official_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2019-10-02")
  },
  {
    movieName: "Tiger 3",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["Hindi", "Tamil", "Telugu"],
    summary: "Tiger and Zoya are framed as traitors by a vengeful terrorist. They embark on a life-threatening mission to clear their names.",
    cast: ["Salman Khan", "Katrina Kaif", "Emraan Hashmi"],
    crew: [{ name: "Maneesh Sharma", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/50/Tiger_3_poster.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-11-12")
  },
  {
    movieName: "Raid 2",
    genres: ["Drama", "Thriller"],
    supportingLanguages: ["Hindi"],
    summary: "IRS Officer Amay Patnaik returns to trace and eliminate another complex tax evasion syndicate.",
    cast: ["Ajay Devgn", "Riteish Deshmukh", "Vaani Kapoor"],
    crew: [{ name: "Raj Kumar Gupta", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/00/Raid_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2025-05-02")
  },
  {
    movieName: "Sitaare Zameen Par",
    genres: ["Drama", "Family"],
    supportingLanguages: ["Hindi"],
    summary: "A spiritual sequel highlighting down-syndrome issues while portraying an uplifting relationship between a coach and a special team.",
    cast: ["Aamir Khan", "Genelia D'Souza"],
    crew: [{ name: "R.S. Prasanna", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_India.svg",
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2025-12-25")
  }
];

// Sitaare Zameen Par is the final movie in the catalog boundary constraint.

async function seed() {
  try {
    await mongoose.connect(url);
    console.log("Connected to database for Bollywood movies seeding.");

    // Retrieve default cinema and screen
    const cinema = await Cinema.findOne();
    const screen = await Screen.findOne();
    const admin = await User.findOne({ accountType: { $in: ["Admin", "SuperAdmin"] } });

    if (!cinema || !screen || !admin) {
      console.log("❌ Seeding halted: Make sure a Cinema, Screen, and User exist in the DB.");
      await mongoose.disconnect();
      return;
    }

    console.log(`Reusing Cinema: ${cinema.cinemaName}, Screen: ${screen._id}, User: ${admin.email}`);

    // Remove previous seeded Cinematic Journey movies to keep database perfectly clean
    const deleteResult = await Movie.deleteMany({ movieName: /Cinematic Journey/i });
    console.log(`🧹 Cleaned up ${deleteResult.deletedCount} dynamic journey movies.`);

    let seededCount = 0;
    let showsCount = 0;

    for (const movie of bollywoodMovies) {
      // Find or create movie
      let movieDoc = await Movie.findOne({ movieName: movie.movieName });
      if (!movieDoc) {
        movieDoc = await Movie.create(movie);
        seededCount++;
      }

      // Find or create live show
      let showDoc = await MovieShow.findOne({ movieId: movieDoc._id });
      if (!showDoc) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(18, 0, 0, 0);
        const tomorrowEnd = new Date(tomorrow);
        tomorrowEnd.setHours(21, 0, 0, 0);

        showDoc = await MovieShow.create({
          movieId: movieDoc._id,
          cinemaId: cinema._id,
          screenId: screen._id,
          adminId: admin._id,
          showStart: tomorrow,
          showEnd: tomorrowEnd,
          isLive: true,
          timing: "9-12pm"
        });

        // Seed seats for show
        let newSeatArray = [];
        for (const seatId of screen.seats) {
          const showSeat = await ShowSeat.create({
            seatId,
            showId: showDoc._id,
            status: "Available"
          });
          newSeatArray.push(showSeat._id);
        }

        showDoc.showSeats = newSeatArray;
        await showDoc.save();
        showsCount++;
      }
    }

    console.log(`✅ Seeded ${seededCount} popular Bollywood movies successfully.`);
    console.log(`✅ Created ${showsCount} bookable shows and populated seating grids successfully.`);

    const totalMovies = await Movie.countDocuments();
    console.log(`📊 Current total movies in database: ${totalMovies}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { bollywoodMovies, seed };
