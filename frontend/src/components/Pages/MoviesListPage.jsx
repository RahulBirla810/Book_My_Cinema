import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";
import { GrFormSearch } from "react-icons/gr";

const MoviesListPage = () => {
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (!allMovies || allMovies.length === 0) {
      dispatch(getAllMoviesApi());
    }
  }, [dispatch, allMovies]);

  // Extract all unique genres for filtering
  const allGenres = allMovies
    ? Array.from(new Set(allMovies.flatMap((m) => m.genres || [])))
    : [];

  const filteredMovies = allMovies
    ? allMovies.filter((movie) => {
        const matchesSearch = movie.movieName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre
          ? movie.genres?.includes(selectedGenre)
          : true;
        return matchesSearch && matchesGenre;
      })
    : [];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Banner */}
        <div className="w-full h-[150px] sm:h-[220px] md:h-[280px] bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-between p-6 sm:p-12 text-white shadow-md mb-8">
          <div className="space-y-2 sm:space-y-4 max-w-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              🎬 Movies In The Spotlight
            </h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              Explore blockbusters, award-winning dramas, comedies, and thrillers. Book seats instantly at your favorite cinemas!
            </p>
          </div>
          <div className="hidden md:block text-8xl opacity-20 transform rotate-12 select-none">
            🎟️
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm h-10 border border-gray-300 rounded-lg pl-10 pr-4 outline-none focus:border-rose-500 font-sans"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <GrFormSearch className="w-5 h-5" />
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => setSelectedGenre("")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedGenre === ""
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              All Genres
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedGenre === genre
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <div className="w-full py-20 flex justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No movies match your criteria.
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
      </div>
    </div>
  );
};

export default MoviesListPage;
