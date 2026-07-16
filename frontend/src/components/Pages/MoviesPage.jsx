import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavBar from "../common/NavBar";
import MovieCard from "../common/MovieCard";
import HomeSlider from "../common/HomeSlider";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";

const MoviesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const { allMovies, isLoading } = useSelector((state) => state.home);

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const [movie, setMovie] = useState(null);
  const [recommendedArray, setRecommendedArray] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  const movieBookHandler = (movieName, movie_id) => {
    navigate(`/shows/${movieName}/${movie_id}`);
  };

  const updateMovieHandler = (movie_id) => {
    navigate(`/movie/updatemovie/${movie_id}`);
  };

  const addShowHandler = (movie_id) => {
    navigate(`/show/addShow/${movie_id}`);
  };

  // Fetch movies if not already available
  useEffect(() => {
    const fetchMovies = async () => {
      if (!allMovies || allMovies.length === 0) {
        await dispatch(getAllMoviesApi());
      }
    };

    fetchMovies();
  }, [dispatch, allMovies]);

  // Filter selected movie and recommended movies
  useEffect(() => {
    if (allMovies && allMovies.length > 0) {
      const selectedMovie = allMovies.find((movie) => movie._id === movie_id);
      if (selectedMovie) {
        setMovie(selectedMovie);
        setRecommendedArray(
          allMovies.filter((movie) => movie._id !== movie_id)
        );
      }
    }
  }, [allMovies, movie_id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div>
      {movie ? (
        <>
          <NavBar />
          <div className="hidden md:block">
            <HomeSlider isShow={false} />
          </div>
          <div
            style={{
              backgroundImage: isMobile
                ? "none"
                : `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), 
        url(${movie?.banner})`,
            }}
            className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[370px] xl:min-h-[500px] mx-auto sm:px-6 md:px-10 xl:px-12 flex items-center bg-no-repeat bg-right-top relative"
          >
            <div className="w-full h-full mt-2 flex flex-col sm:flex-row sm:gap-8 z-50">
              <p className="sm:hidden px-5 mb-2 text-2xl font-semibold">
                {movie?.movieName}
              </p>
              <img
                src={movie?.thumbnail || ""}
                className="hidden sm:block w-[175px] md:w-[205px] xl:w-[295px] rounded-lg"
                alt={movie?.movieName || "Movie Thumbnail"}
              />
              <div className="px-4 sm:hidden">
                <img
                  src={movie?.banner || ""}
                  className="w-full rounded-md"
                  alt={movie?.banner || "Movie Banner"}
                />
              </div>

              <div className="px-6 sm:px-3 md:px-4 xl:px-7 py-4 sm:py-7 md:py-9 xl:py-12 flex flex-col gap-3 sm:gap-4 xl:gap-6">
                <p className="hidden sm:block text-lg sm:text-2xl md:text-3xl xl:text-5xl sm:text-white font-semibold">
                  {movie?.movieName}
                </p>

                <div className="flex font-medium gap-2 sm:gap-3">
                  {movie?.supportingLanguages?.map((lang, index) => (
                    <div
                      key={index}
                      className="text-sm md:text-base py-1 xl:py-2 px-3 xl:px-4 bg-gray-300 rounded-sm"
                    >
                      <p>{lang}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap text-sm sm:text-base md:text-lg xl:text-xl font-medium sm:text-white">
                  <span>2h 24m</span>
                  <span className="mx-2">•</span>
                  <div>
                    {movie?.genres?.map((genre, index) => (
                      <span key={index}>
                        {genre}
                        {index < movie?.genres?.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <span className="mx-2">•</span>
                  <span>UA</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(movie?.releaseDate)}</span>
                </div>

                {user?.accountType === "SuperAdmin" && (
                  <button
                    onClick={() => {
                      updateMovieHandler(movie_id);
                    }}
                    className="w-fit mt-3 sm:mt-5 text-sm sm:text-base md:text-lg xl:text-xl px-6 sm:px-8 xl:px-14 py-3 xl:py-[18px] rounded-lg lg:rounded-xl text-white bg-rose-500 font-medium"
                  >
                    Update Movie
                  </button>
                )}

                {user?.accountType === "Admin" && (
                  <button
                    onClick={() => {
                      addShowHandler(movie_id);
                    }}
                    className="w-fit mt-3 sm:mt-5 text-sm sm:text-base md:text-lg xl:text-xl px-6 sm:px-8 xl:px-14 py-3 xl:py-[18px] rounded-lg lg:rounded-xl text-white bg-rose-500 font-medium"
                  >
                    Add Show
                  </button>
                )}

                {user?.accountType === "Viewer" && (
                  <button
                    onClick={() => {
                      movieBookHandler(movie.movieName, movie._id);
                    }}
                    className="w-fit mt-3 sm:mt-5 text-sm sm:text-base md:text-lg xl:text-xl px-6 sm:px-8 xl:px-14 py-3 xl:py-[18px] rounded-lg lg:rounded-xl text-white bg-rose-500 font-medium"
                  >
                    Book Tickets
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto mt-7 sm:mt-10 px-6 md:px-12 lg:px-16 flex flex-col gap-8 sm:gap-12">
            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[32px] leading-8 font-medium">
                About the movie
              </h4>
              <p className="mt-3 sm:mt-5 tracking-[0.2px] text-sm md:text-base lg:text-lg lg:w-[75%]">
                {movie?.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[32px] leading-8 font-medium">
                Cast
              </h4>
              <div className="mt-3 sm:mt-5 flex gap-7 sm:gap-10 overflow-x-scroll scrollbar-hide">
                {movie?.cast?.map((cast, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="h-[75px] w-[75px] md:h-[90px] md:w-[90px]">
                      <img
                        className="w-full h-full rounded-full"
                        src="https://th.bing.com/th/id/OIP.kqOLyWHQPVOCDVOgCDRvvAHaHa?w=215&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                        alt="cast-image"
                      />
                    </div>
                    <h5 className="text-sm text-center md:text-base mt-2 tracking-[0.2px] whitespace-nowrap">
                      {cast}
                    </h5>
                    <h5 className="text-xs text-center md:text-sm text-gray-500 tracking-[0.2px]">
                      Actor
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[32px] leading-8 font-medium">
                Crew
              </h4>
              <div className="relative mt-3 sm:mt-5 flex gap-7 sm:gap-10 overflow-x-scroll scrollbar-hide">
                {movie?.crew?.map((crew, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="h-[75px] w-[75px] md:h-[90px] md:w-[90px]">
                      <img
                        className="w-full h-full rounded-full"
                        src="https://th.bing.com/th/id/OIP.kqOLyWHQPVOCDVOgCDRvvAHaHa?w=215&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                        alt="cast-image"
                      />
                    </div>
                    <h5 className="text-sm text-center md:text-base mt-2 tracking-[0.2px] whitespace-nowrap">
                      {crew?.name}
                    </h5>
                    <h5 className="text-xs text-center md:text-sm text-gray-500 tracking-[0.2px]">
                      {crew?.profession}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mt-2 flex justify-between items-center">
                <h4 className="text-xl sm:text-2xl lg:text-[32px] leading-8 font-medium tracking-[0.2px]">
                  You might also like
                </h4>
                <Link
                  to="/"
                  className="text-sm sm:text-lg font-medium text-rose-500"
                >
                  View All
                </Link>
              </div>
              <div className="mt-5 sm:mt-7 flex gap-5 md:gap-8 overflow-x-scroll scrollbar-hide bg-[rgb(245,245,245)]">
                {recommendedArray?.slice(0, 6)?.map((recommmovie) => (
                  <MovieCard movie={recommmovie} key={recommmovie._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <NavBar />
          <div className="text-2xl text-center mt-14">Movie not found</div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
