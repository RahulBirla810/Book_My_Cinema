import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import { fetchCategoryItems } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";

const FooterFilterPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);
  const { items: categoryItems } = useSelector((state) => state.category);

  const [pageType, setPageType] = useState("movies"); // 'help' or 'movies'
  const [pageTitle, setPageTitle] = useState("");
  const [helpData, setHelpData] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayNotice, setDisplayNotice] = useState("");

  useEffect(() => {
    if (!allMovies || allMovies.length === 0) {
      dispatch(getAllMoviesApi());
    }
  }, [dispatch, allMovies]);

  useEffect(() => {
    // 1. HELP PAGES
    const helpPages = {
      "about-us": {
        title: "About Us",
        content: "BookMyCinema is India's premier online entertainment ticketing platform. Founded with a vision to make movie and event ticketing seamless, we bring the best of cinemas, concerts, plays, sports, and activities to millions of entertainment lovers across the country. Our focus is to deliver a premium user experience and secure transactions.",
        icon: "ℹ️"
      },
      "contact-us": {
        title: "Contact Us",
        content: "Have questions or need assistance with a booking? Reach out to our 24/7 Customer Support team at support@bookmycinema.com or call our toll-free helpline at 1800-200-3000. Address: Bigtree Entertainment Pvt. Ltd., Wankhede Stadium, Mumbai.",
        icon: "📞"
      },
      "current-opening": {
        title: "Current Openings",
        content: "Join the revolution in entertainment ticketing! We are looking for talented Frontend Engineers, Backend Developers, UI Designers, and Product Managers. Send your resume to careers@bookmycinema.com.",
        icon: "💼"
      },
      "faqs": {
        title: "Frequently Asked Questions",
        content: "Q: Can I cancel my tickets?\nA: Yes, bookings can be cancelled before the show starts by visiting the Transactions page.\n\nQ: How do I collect my physical ticket?\nA: You can print your ticket or show the Booking ID/email at the cinema counter.\n\nQ: What payment options are supported?\nA: We support Credit Cards, Debit Cards, Netbanking, UPI, and Gift Vouchers.",
        icon: "❓"
      },
      "terms-conditions": {
        title: "Terms and Conditions",
        content: "Welcome to BookMyCinema. By using our website and services, you agree to comply with our booking terms, cancellation timelines, payment verification steps, and user code of conduct. Ticket cancellation is allowed only before the show starts.",
        icon: "📜"
      },
      "privacy-policy": {
        title: "Privacy Policy",
        content: "Your privacy is of utmost importance to us. We secure your personal information, transactional records, and payment credentials using industry-grade SSL encryption. We do not sell or share user data with unauthorized third parties.",
        icon: "🔒"
      }
    };

    if (helpPages[slug]) {
      setPageType("help");
      setPageTitle(helpPages[slug].title);
      setHelpData(helpPages[slug]);
      return;
    }

    // 2. GENRES
    const genresList = {
      action: "Action",
      drama: "Drama",
      thriller: "Thriller",
      adventure: "Adventure",
      animation: "Animation",
      fantasy: "Fantasy",
      classic: "Classic",
      biography: "Biography",
      mystery: "Mystery",
      political: "Political"
    };

    const cleanSlug = slug.toLowerCase().replace("-movies", "").trim();

    if (genresList[cleanSlug]) {
      setPageType("movies");
      setPageTitle(`${genresList[cleanSlug]} Movies`);
      setDisplayNotice("");
      if (allMovies) {
        const matches = allMovies.filter(m =>
          m.genres?.some(g => g.toLowerCase() === cleanSlug)
        );
        setFilteredMovies(matches);
      }
      return;
    }

    // 3. LANGUAGES
    const languagesList = {
      hindi: "Hindi",
      english: "English",
      sindhi: "Sindhi",
      japanese: "Japanese",
      panjabi: "Panjabi",
      telugu: "Telugu",
      tamil: "Tamil",
      odia: "Odia",
      korean: "Korean"
    };

    if (languagesList[cleanSlug]) {
      setPageType("movies");
      setPageTitle(`Movies in ${languagesList[cleanSlug]}`);
      setDisplayNotice("");
      if (allMovies) {
        const matches = allMovies.filter(m =>
          m.supportingLanguages?.some(l => l.toLowerCase() === cleanSlug)
        );
        setFilteredMovies(matches);
      }
      return;
    }

    // 4. SPORTS
    const sportsList = {
      running: "Running",
      football: "Football",
      kabaddi: "Kabaddi",
      chess: "Chess",
      badminton: "Badminton",
      boxing: "Boxing",
      cricket: "Cricket",
      athletics: "Athletics",
      mma: "Mixed Martial Arts"
    };

    if (sportsList[cleanSlug]) {
      // Sports will redirect to CategoryListPage or fetch categories
      navigate("/sports");
      return;
    }

    // 5. CITIES & COUNTRIES
    const citiesList = {
      mumbai: "Mumbai",
      "delhi-ncr": "Delhi-NCR",
      chennai: "Chennai",
      bengluru: "Bengluru",
      hyderabad: "Hyderabad",
      pune: "Pune",
      kolkata: "Kolkata",
      kochi: "Kochi",
      indonesia: "Indonesia",
      singapore: "Singapore",
      uae: "UAE",
      "sri-lanka": "Sri Lanka",
      "west-indies": "West Indies"
    };

    if (citiesList[cleanSlug]) {
      setPageType("movies");
      setPageTitle(`Trending Movies in ${citiesList[cleanSlug]}`);
      setDisplayNotice("");
      if (allMovies) {
        setFilteredMovies(allMovies);
      }
      return;
    }

    // 6. SPECIFIC MOVIE SLUGS
    if (allMovies && allMovies.length > 0) {
      const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
      const match = allMovies.find(m => {
        const normalizedName = m.movieName.toLowerCase().replace(/[^a-z0-9]/g, "");
        return normalizedName.includes(normalizedSlug) || normalizedSlug.includes(normalizedName);
      });

      if (match) {
        navigate(`/movie/${match.movieName.replace(/\s+/g, "-")}/${match._id}`);
        return;
      } else {
        // Fallback for missing/upcoming movies: Display all movies with a friendly notice
        setPageType("movies");
        const formattedName = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        setPageTitle("Movies Spotlight");
        setDisplayNotice(`"${formattedName}" is not currently playing, but check out these blockbusters showing now!`);
        setFilteredMovies(allMovies);
      }
    }
  }, [slug, allMovies, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {pageType === "help" && helpData ? (
          /* Help Page Layout */
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-gray-200 p-8 text-left mt-8">
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
              <span className="text-4xl">{helpData.icon}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                {pageTitle}
              </h1>
            </div>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-base sm:text-lg">
              {helpData.content}
            </div>
          </div>
        ) : (
          /* Movie Filtering Grid Catalog */
          <>
            <div className="w-full h-[150px] sm:h-[180px] bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-between p-6 sm:p-10 text-white shadow mb-8">
              <div className="space-y-1.5 max-w-xl text-left">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  🎬 {pageTitle}
                </h1>
                <p className="text-xs sm:text-sm opacity-90">
                  Explore top-rated entertainment shows and listings. Book tickets instantly!
                </p>
              </div>
            </div>

            {displayNotice && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-lg text-left">
                ℹ️ {displayNotice}
              </div>
            )}

            {isLoading ? (
              <div className="w-full py-20 flex justify-center">
                <div className="custom-loader"></div>
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No movies found for "{slug}".
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                  <div key={movie._id} className="flex justify-center">
                    <MovieCard movie={movie} isShow={true} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FooterFilterPage;
