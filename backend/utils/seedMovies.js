const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../.env" });
const Movie = require("../models/Movie");

const sampleMovies = [
  {
    movieName: "Pushpa 2: The Rule",
    releaseDate: new Date("2024-12-05"),
    summary: "Pushpa Raj manages the red sandalwood syndicate while facing opposition from the law and rivals.",
    genres: ["Action", "Drama", "Thriller"],
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
    crew: [{ name: "Sukumar", profession: "Director" }],
    supportingLanguages: ["Telugu", "Hindi", "Tamil", "Kannada"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/11/Pushpa_2-_The_Rule.jpg",
    banner: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pushpa_2-_The_Rule_Promotion_in_Mumbai.jpg"
  },
  {
    movieName: "Kalki 2898 AD",
    releaseDate: new Date("2024-06-27"),
    summary: "A modern avatar of Vishnu, a Hindu god, is believed to have descended to Earth to protect the world from evil forces.",
    genres: ["Action", "Sci-Fi"],
    cast: ["Prabhas", "Amitabh Bachchan", "Kamal Haasan", "Deepika Padukone"],
    crew: [{ name: "Nag Ashwin", profession: "Director" }],
    supportingLanguages: ["Telugu", "Hindi", "Tamil", "English"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg",
    banner: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramoji_Film_City.jpg"
  },
  {
    movieName: "Stree 2",
    releaseDate: new Date("2024-08-15"),
    summary: "The town of Chanderi is haunted by a new headless ghost named 'Sarkata'. The townspeople turn to Stree for help.",
    genres: ["Comedy", "Horror"],
    cast: ["Rajkummar Rao", "Shraddha Kapoor", "Pankaj Tripathi"],
    crew: [{ name: "Amar Kaushik", profession: "Director" }],
    supportingLanguages: ["Hindi"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a1/Stree_2.jpg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600"
  },
  {
    movieName: "Singham Again",
    releaseDate: new Date("2024-11-01"),
    summary: "Supercop Bajirao Singham embarks on a dangerous mission in Sri Lanka to rescue his wife Avni.",
    genres: ["Action", "Drama", "Thriller"],
    cast: ["Ajay Devgn", "Kareena Kapoor Khan", "Ranveer Singh", "Deepika Padukone"],
    crew: [{ name: "Rohit Shetty", profession: "Director" }],
    supportingLanguages: ["Hindi", "Telugu", "Tamil"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/04/Singham_Again_poster.jpg",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&h=600"
  },
  {
    movieName: "Gladiator II",
    releaseDate: new Date("2024-11-15"),
    summary: "Years after witnessing the death of Maximus, Lucius is forced to enter the Colosseum after his home is conquered.",
    genres: ["Action", "Adventure", "Drama"],
    cast: ["Paul Mescal", "Pedro Pascal", "Denzel Washington"],
    crew: [{ name: "Ridley Scott", profession: "Director" }],
    supportingLanguages: ["English", "Hindi", "Tamil", "Telugu"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/04/Gladiator_II_%282024%29_poster.jpg",
    banner: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Fort_Ricasoli_and_filming_locations_of_Gladiator_10.jpg"
  }
];

async function seed() {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bookmycinema";
    console.log("Connecting to MongoDB at:", mongoUrl);
    await mongoose.connect(mongoUrl);
    console.log("Connected successfully. Deleting old movies...");
    await Movie.deleteMany({});
    console.log("Deleted old movies. Inserting new sample movies...");
    await Movie.insertMany(sampleMovies);
    console.log("Successfully seeded sample movies!");
  } catch (error) {
    console.error("Error seeding movies:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
