import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isShow = true }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.movieName}/${movie._id}`)}
      className="cursor-pointer"
    >
      <div className="w-[135px] h-[210px] md:w-[175px] md:h-[270px] lg:w-[220px] lg:h-[330px]">
        <img
          src={movie?.thumbnail}
          alt="movie-thumbnail"
          className="w-full h-full rounded-lg"
        />
      </div>
      {isShow && (
        <div className="flex flex-col items-start justify-center">
          <span className="sm:text-lg lg:text-xl font-medium">
            {movie?.movieName}
          </span>
          <div className="text-xs sm:text-sm lg:text-base flex items-start justify-center">
            {movie?.supportingLanguages?.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-[rgb(105,105,100)]"
              >
                <div>{lang}</div>
                {index !== movie?.supportingLanguages?.length - 1 && (
                  <div>/</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
