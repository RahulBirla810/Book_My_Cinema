import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveYourShow, getUnliveShows } from "../../redux/reducer/adminSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";

const LiveYourShow = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const result = await dispatch(getUnliveShows());
    if (getUnliveShows.fulfilled.match(result)) {
      setShows(result?.payload?.data || []);
    }
  };

  const handleLiveYourShow = async (showId) => {
    const result = await dispatch(liveYourShow(showId));
    if (liveYourShow.fulfilled.match(result)) {
      fetchShows();
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col ">
        <h1 className="text-2xl text-center sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Live Your Show
        </h1>
        {isLoading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div className="my-3 sm:my-5 px-5 sm:px-8 py-3 bg-gray-200 rounded-md">
            {shows.length > 0 ? (
              shows?.map((show) => (
                <div key={show._id} className="w-fit relative">
                  <MovieCard
                    movie={show.movieId}
                    key={show.movieId._id}
                    isShow={false}
                  />
                  <button
                    onClick={() => handleLiveYourShow(show._id)}
                    disabled={isLoading}
                    className="absolute top-0 right-0 mt-1 mr-1 sm:mr-[14px] md:mr-1 p-2 text-xs bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                  >
                    {isLoading ? "Updating..." : "Live Show"}
                  </button>
                  <div className="mt-1 flex flex-col items-start justify-center">
                    <h2 className="sm:text-lg lg:text-xl font-medium">
                      {show?.movieId?.movieName}
                    </h2>
                    <h2 className="text-xs md:text-sm">
                      <span className="font-medium">Cinema:</span>{" "}
                      {show?.cinemaId?.cinemaName}
                    </h2>
                    <h2 className="text-xs md:text-sm">
                      <span className="font-medium">Time:</span> {show?.timing}
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="my-5 sm:my-7 text-center">
                No shows to do live
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveYourShow;
