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

const movieData = [
  {
    movieName: "Oppenheimer",
    genres: ["Drama", "Thriller"],
    supportingLanguages: ["English", "Hindi"],
    summary: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    crew: [{ name: "Christopher Nolan", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    banner: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-07-21")
  },
  {
    movieName: "Barbie",
    genres: ["Comedy", "Adventure"],
    supportingLanguages: ["English"],
    summary: "Stereotypical Barbie experiences a full-on existential crisis and must travel to the real world to find herself.",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    crew: [{ name: "Greta Gerwig", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
    banner: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-07-21")
  },
  {
    movieName: "Avatar: The Way of Water",
    genres: ["Sci-Fi", "Action", "Adventure"],
    supportingLanguages: ["English", "Hindi", "Tamil", "Telugu"],
    summary: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started.",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    crew: [{ name: "James Cameron", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2022-12-16")
  },
  {
    movieName: "Spider-Man: No Way Home",
    genres: ["Action", "Sci-Fi", "Adventure"],
    supportingLanguages: ["English", "Hindi", "Tamil", "Telugu"],
    summary: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    crew: [{ name: "Jon Watts", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/01/Spider-Man_No_Way_Home_poster.jpg",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2021-12-17")
  },
  {
    movieName: "Dune",
    genres: ["Sci-Fi", "Action", "Adventure"],
    supportingLanguages: ["English", "Hindi"],
    summary: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    crew: [{ name: "Denis Villeneuve", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2021-10-22")
  },
  {
    movieName: "Top Gun: Maverick",
    genres: ["Action", "Drama"],
    supportingLanguages: ["English", "Hindi"],
    summary: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    crew: [{ name: "Joseph Kosinski", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2022-05-27")
  },
  {
    movieName: "The Batman",
    genres: ["Action", "Thriller", "Drama"],
    supportingLanguages: ["English", "Hindi"],
    summary: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    crew: [{ name: "Matt Reeves", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_poster.jpeg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2022-03-04")
  },
  {
    movieName: "Everything Everywhere All at Once",
    genres: ["Sci-Fi", "Comedy", "Adventure"],
    supportingLanguages: ["English"],
    summary: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    crew: [{ name: "Daniel Kwan", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.png",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2022-03-25")
  },
  {
    movieName: "John Wick: Chapter 4",
    genres: ["Action", "Thriller"],
    supportingLanguages: ["English", "Hindi"],
    summary: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face a new enemy.",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    crew: [{ name: "Chad Stahelski", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e2/John_Wick_Chapter_4_poster.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2023-03-24")
  },
  {
    movieName: "Shailesh",
    genres: ["Drama", "Family"],
    supportingLanguages: ["Hindi"],
    summary: "A heart-warming narrative centered around standard family relationships in small-town central India.",
    cast: ["Manoj Bajpayee", "Surekha Sikri"],
    crew: [{ name: "Shailesh Dev", profession: "Director" }],
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_India.svg",
    banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&h=600",
    releaseDate: new Date("2024-01-01")
  }
];

// Dynamically generate another 45 movie records to complete a large catalog of 55 movies
const dynamicGenres = ["Action", "Adventure", "Comedy", "Drama", "Family", "Horror", "Romantic", "Sci-Fi", "Sports", "Thriller"];
const dynamicLanguages = ["English", "Hindi", "Kannada", "Telugu", "Tamil"];
const dynamicDirectors = ["Steven Spielberg", "Martin Scorsese", "Quentin Tarantino", "Rajamouli", "Sanjay Leela Bhansali", "Karan Johar"];

for (let i = 1; i <= 45; i++) {
  const g1 = dynamicGenres[i % dynamicGenres.length];
  const g2 = dynamicGenres[(i + 2) % dynamicGenres.length];
  const lang1 = dynamicLanguages[i % dynamicLanguages.length];
  const lang2 = dynamicLanguages[(i + 1) % dynamicLanguages.length];
  const dir = dynamicDirectors[i % dynamicDirectors.length];

  movieData.push({
    movieName: `Cinematic Journey Part ${i}`,
    genres: [g1, g2],
    supportingLanguages: [lang1, lang2],
    summary: `An epic cinematic storytelling journey showing chapters of human life, conflict, and celebration. Episode ${i} of the grand series.`,
    cast: [`Actor Alpha ${i}`, `Actress Beta ${i}`, `Star Gamma ${i}`],
    crew: [{ name: dir, profession: "Director" }],
    thumbnail: `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&h=600&q=80`,
    banner: `https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&h=600`,
    releaseDate: new Date(2024, i % 12, (i % 28) + 1)
  });
}

async function seed() {
  try {
    await mongoose.connect(url);
    console.log("Connected to database for large movies seeding.");

    // Retrieve default cinema and screen
    const cinema = await Cinema.findOne();
    const screen = await Screen.findOne();
    // Retrieve any administrative user ID to fulfill ref check
    const admin = await User.findOne({ accountType: { $in: ["Admin", "SuperAdmin"] } });

    if (!cinema || !screen || !admin) {
      console.log("❌ Seeding halted: Make sure a Cinema, Screen, and User exist in the DB.");
      await mongoose.disconnect();
      return;
    }

    console.log(`Reusing Cinema: ${cinema.cinemaName}, Screen Number: ${screen.screenNumber}, User ID: ${admin._id}`);

    let seededCount = 0;
    let showsCount = 0;

    for (const movie of movieData) {
      // Avoid duplicate movie names
      let movieDoc = await Movie.findOne({ movieName: movie.movieName });
      if (!movieDoc) {
        movieDoc = await Movie.create(movie);
        seededCount++;
      }

      // Check if a show exists for this movie. If not, seed a live show!
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

        // Seed show seats for this show so it is immediately bookable
        let newSeatArray = [];
        for (const seatId of screen.seats) {
          const showSeat = await ShowSeat.create({
            seatId: seatId,
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

    console.log(`✅ Seeded ${seededCount} new movies successfully.`);
    console.log(`✅ Created ${showsCount} corresponding live shows and populated show seats successfully.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
  }
}

seed();
