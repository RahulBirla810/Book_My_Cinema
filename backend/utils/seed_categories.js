const mongoose = require("mongoose");
const Event = require("../models/Event");
const Offer = require("../models/Offer");
const GiftCard = require("../models/GiftCard");

const url = "mongodb://127.0.0.1:27017/bookmycinema";

const sampleEvents = [
  // 1. Streams
  {
    title: "The Dark Knight",
    type: "Stream",
    releaseDate: new Date("2008-07-18"),
    summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    supportingLanguages: ["English", "Hindi"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&h=600",
    price: 149,
    location: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    title: "Interstellar",
    type: "Stream",
    releaseDate: new Date("2014-11-07"),
    summary: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    supportingLanguages: ["English", "Hindi", "Telugu"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=600",
    price: 199,
    location: "https://www.youtube.com/watch?v=zSWdZAeeM8o"
  },
  {
    title: "Inception",
    type: "Stream",
    releaseDate: new Date("2010-07-16"),
    summary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Sci-Fi", "Adventure"],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    supportingLanguages: ["English", "Hindi"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/8e/Inception_%282010%29_theatrical_poster.jpg",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&h=600",
    price: 149,
    location: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    title: "Dune: Part Two",
    type: "Stream",
    releaseDate: new Date("2024-03-01"),
    summary: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    genres: ["Sci-Fi", "Action", "Adventure"],
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    supportingLanguages: ["English", "Hindi", "Tamil"],
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=600",
    price: 249,
    location: "https://www.youtube.com/watch?v=Way9Dexny3w"
  },

  // 2. Events
  {
    title: "Laughter Nights ft. Zakir Khan",
    type: "Event",
    releaseDate: new Date("2026-08-15"),
    summary: "Get ready for a night of pure hilarity with India's most beloved storyteller and stand-up comedian, Zakir Khan, performing live in Indore.",
    genres: ["Comedy", "Standup"],
    cast: ["Zakir Khan"],
    supportingLanguages: ["Hindi"],
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eed262?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=1200&h=600",
    price: 999,
    location: "Abhay Prashal Auditorium, Indore"
  },
  {
    title: "Sunburn Festival Goa 2026",
    type: "Event",
    releaseDate: new Date("2026-12-27"),
    summary: "Experience Asia's biggest Electronic Dance Music festival on the sunny shores of Vagator beach, Goa with international DJs.",
    genres: ["Music", "EDM", "Festival"],
    cast: ["Hardwell", "Martin Garrix", "Alan Walker"],
    supportingLanguages: ["English"],
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&h=600",
    price: 3499,
    location: "Vagator Beach, Goa"
  },
  {
    title: "A.R. Rahman Live Concert",
    type: "Event",
    releaseDate: new Date("2026-09-10"),
    summary: "The legendary maestro A.R. Rahman returns to the stage with a spectacular multi-city live concert carrying his finest symphonies.",
    genres: ["Music", "Concert"],
    cast: ["A.R. Rahman", "Jonita Gandhi", "Javed Ali"],
    supportingLanguages: ["Hindi", "Tamil"],
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&h=600",
    price: 1999,
    location: "DY Patil Stadium, Mumbai"
  },

  // 3. Plays
  {
    title: "Mughal-E-Azam: The Musical",
    type: "Play",
    releaseDate: new Date("2026-08-20"),
    summary: "Feroz Abbas Khan's tribute to the classic film returns to theater spaces carrying live music singing, Kathak dances, and designer costumes.",
    genres: ["Drama", "Musical", "History"],
    cast: ["Nissar Khan", "Priyanka Barve"],
    supportingLanguages: ["Hindi", "Urdu"],
    thumbnail: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&h=600",
    price: 1200,
    location: "NCPA: Jamshed Bhabha Theatre, Mumbai"
  },
  {
    title: "Hamlet - A Shakespearean Masterpiece",
    type: "Play",
    releaseDate: new Date("2026-07-28"),
    summary: "A thrilling contemporary staging of William Shakespeare's immortal tragedy about prince Hamlet seeking revenge for his father.",
    genres: ["Tragedy", "Drama"],
    cast: ["Vikramaditya Shah", "Tara Deshpande"],
    supportingLanguages: ["English"],
    thumbnail: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=1200&h=600",
    price: 499,
    location: "Ravindra Natya Mandir, Prabhadevi"
  },

  // 4. Sports
  {
    title: "T20 IPL League: Mumbai vs Delhi",
    type: "Sport",
    releaseDate: new Date("2026-05-12"),
    summary: "Watch the giants of Indian cricket clash live in an action-packed, nail-biting T20 encounter at the iconic Wankhede Stadium.",
    genres: ["Cricket", "T20"],
    cast: ["Rohit Sharma", "Rishabh Pant"],
    supportingLanguages: ["English", "Hindi"],
    thumbnail: "https://images.unsplash.com/photo-1531415080290-bc9854503f3f?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=600",
    price: 800,
    location: "Wankhede Stadium, Mumbai"
  },
  {
    title: "Indore Marathon 2026",
    type: "Sport",
    releaseDate: new Date("2026-10-04"),
    summary: "Indore's flagship running event promoting fitness, health, and clean environment initiatives. Join thousands of runners today.",
    genres: ["Running", "Marathon"],
    cast: [],
    supportingLanguages: ["Hindi", "English"],
    thumbnail: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&h=600",
    price: 350,
    location: "Nehru Stadium, Indore"
  },

  // 5. Activities
  {
    title: "Hot Air Balloon Safari",
    type: "Activity",
    releaseDate: new Date("2026-11-20"),
    summary: "Fly high over panoramic landscapes, lakes, and historical forts with standard safety equipment and certified pilots.",
    genres: ["Adventure", "Sightseeing"],
    cast: [],
    supportingLanguages: ["English", "Hindi"],
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&h=600",
    price: 4500,
    location: "Lonavala Adventure Camp, Pune"
  },
  {
    title: "Mystery Room Escape Challenge",
    type: "Activity",
    releaseDate: new Date("2026-07-22"),
    summary: "A thrilling real-life escape game where teams are locked in a room and must crack codes, solve puzzles, and escape under 60 minutes.",
    genres: ["Puzzle", "Indoor Team Game"],
    cast: [],
    supportingLanguages: ["English", "Hindi"],
    thumbnail: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=400&h=600",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=600",
    price: 600,
    location: "Treasure Island Mall, Indore"
  }
];

const sampleOffers = [
  {
    title: "Festive Season Discount",
    description: "Get flat 50% discount on purchasing tickets online during the festive week.",
    code: "FESTIVE50",
    discount: 50,
    thumbnail: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=300&h=200"
  },
  {
    title: "Movie Buff Special",
    description: "Get flat Rs. 100 off on booking 2 or more tickets together using our online portal.",
    code: "MOVIEBUFF",
    discount: 100,
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&h=200"
  },
  {
    title: "First Purchase Deal",
    description: "New users receive flat 20% discount on their very first transaction with us.",
    code: "FIRST20",
    discount: 20,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=300&h=200"
  }
];

const sampleGiftCards = [
  {
    title: "Happy Birthday Gift Voucher",
    description: "Celebrate their special day by gifting them the joy of unlimited movies and entertainment choices.",
    price: 500,
    thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&h=200"
  },
  {
    title: "Universal Cinema Voucher",
    description: "Universal pass gift voucher valid across all cities and screens, redeemable on any show.",
    price: 1000,
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&h=200"
  },
  {
    title: "Corporate Rewards Card",
    description: "Show appreciation to employees and corporate partners with prime entertainment vouchers.",
    price: 2000,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&h=200"
  }
];

async function seed() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB.");

    // Clear existing
    await Event.deleteMany({});
    await Offer.deleteMany({});
    await GiftCard.deleteMany({});
    console.log("Cleared existing collections.");

    // Seed events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`Seeded ${createdEvents.length} events/listings successfully.`);

    // Seed offers
    const createdOffers = await Offer.insertMany(sampleOffers);
    console.log(`Seeded ${createdOffers.length} offers successfully.`);

    // Seed gift cards
    const createdGiftCards = await GiftCard.insertMany(sampleGiftCards);
    console.log(`Seeded ${createdGiftCards.length} gift cards successfully.`);

    await mongoose.disconnect();
    console.log("Disconnected from database. Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding process:", error.message);
  }
}

seed();
