import React, { useEffect } from "react";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowDetailes } from "../../redux/reducer/showSlice";

const CinemasShowPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { cinemas, movieDetailes, loading } = useSelector(
    (state) => state.show
  );

  const consolidateData = (data) => {
    const map = new Map();
    for (const item of data) {
      const key = `${item.cinemaId}-${item.screens[0]}`;
      if (!map.has(key)) {
        map.set(key, { ...item, timing: [item.timing] });
      } else {
        map.get(key).timing.push(item.timing);
      }
    }

    return Array.from(map.values());
  };

  // const formatTime = (isoTimestamp) => {
  //   const date = new Date(isoTimestamp);
  //   let hours = date.getHours();
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const amPm = hours >= 12 ? "PM" : "AM";

  //   // Convert 24-hour format to 12-hour format
  //   hours = hours % 12 || 12; // Converts 0 to 12 for midnight
  //   hours = String(hours).padStart(2, "0"); // Ensure 2-digit format

  //   return `${hours}:${minutes} ${amPm}`;
  // };

  useEffect(() => {
    const fetchShowsDetailesData = async (movie_id) => {
      await dispatch(fetchShowDetailes({ movieId: movie_id }));
    };
    fetchShowsDetailesData(movie_id);
  }, [dispatch, movie_id]);

  return (
    <div>
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="custom-loader text-center"></div>
        </div>
      ) : (
        <div className="my-5 sm:my-8">
          <div className="px-6 sm:px-12 flex flex-col gap-3">
            <h1
              onClick={() =>
                navigate(`/movie/${movieDetailes?.movieName}/${movie_id}`)
              }
              className="w-fit text-2xl sm:text-3xl md:text-4xl cursor-pointer hover:underline"
            >
              {movieDetailes?.movieName}
            </h1>
            <div className="flex gap-2">
              {movieDetailes?.genres?.map((lang, index) => (
                <div
                  key={index}
                  className="text-[10px] sm:text-xs py-[1px] md:py-[2px] px-2 md:px-3 xl:px-4 text-gray-600 border border-gray-500 rounded-2xl"
                >
                  <p>{lang}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 h-[60px] border-t-[1px] border-gray-300"></div>
          <div className="bg-gray-100 px-4 sm:px-8 md:px-10 py-3">
            <div className="px-5 sm:px-8 py-3 bg-white">
              <div className="hidden mb-2 sm:flex justify-end items-center gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                  <div className="text-gray-400 text-[10px]">AVAILABLE</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-[8px] h-[8px] rounded-full bg-orange-500"></div>
                  <div className="text-gray-400 text-[10px]">FAST FILLING</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="px-1 border border-green-500 text-green-500 text-[8px]">
                    LAN
                  </div>
                  <div className="text-gray-400 text-[10px]">
                    SUBTITLES LANGUAGE
                  </div>
                </div>
              </div>
              {consolidateData(cinemas)?.map((cinema, index) => (
                <div
                  key={index}
                  className="w-full border-t-[1px] py-4 flex flex-col lg:flex-row gap-5 lg:gap-0"
                >
                  <div className="lg:w-[45%] text-sm sm:font-medium">
                    <div className="mb-3 w-fit cursor-pointer hover:underline">
                      {cinema?.cinemaName}
                    </div>
                    <div className="flex gap-6">
                      <div className="flex">
                        <svg
                          fill="#49ba8e"
                          width="25px"
                          height="25px"
                          viewBox="0 0 1500.00 1500.00"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#49ba8e"
                          strokeWidth="0.01024"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M697.887 777.86c22.625 0 40.96-18.335 40.96-40.96V205.444c0-22.625-18.335-40.96-40.96-40.96H328.223c-22.625 0-40.96 18.335-40.96 40.96V736.9c0 22.625 18.335 40.96 40.96 40.96h369.664zm0 40.96H328.223c-45.246 0-81.92-36.674-81.92-81.92V205.444c0-45.246 36.674-81.92 81.92-81.92h369.664c45.246 0 81.92 36.674 81.92 81.92V736.9c0 45.246-36.674 81.92-81.92 81.92zM431.77 103.556h162.56c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48H431.77c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48z"></path>
                            <path d="M759.86 982.66c45.245 0 81.92-36.675 81.92-81.92V122.879c0-45.245-36.675-81.92-81.92-81.92H266.241c-45.245 0-81.92 36.675-81.92 81.92V900.74c0 45.245 36.675 81.92 81.92 81.92H759.86zm0 40.96H266.241c-67.866 0-122.88-55.014-122.88-122.88V122.879c0-67.866 55.014-122.88 122.88-122.88H759.86c67.866 0 122.88 55.014 122.88 122.88V900.74c0 67.866-55.014 122.88-122.88 122.88z"></path>
                            <path d="M533.53 900.74c0-11.309-9.171-20.48-20.48-20.48s-20.48 9.171-20.48 20.48c0 11.309 9.171 20.48 20.48 20.48s20.48-9.171 20.48-20.48zm40.96 0c0 33.931-27.509 61.44-61.44 61.44s-61.44-27.509-61.44-61.44 27.509-61.44 61.44-61.44 61.44 27.509 61.44 61.44z"></path>
                          </g>
                        </svg>
                        <div className="text-[#49ba8e] text-[10px] sm:text-xs">
                          M-Ticket
                        </div>
                      </div>
                      <div className="flex">
                        <svg
                          fill="#ffa426"
                          width="25px"
                          height="25px"
                          viewBox="0 0 90.00 90.00"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#ffa426"
                          strokeWidth="0.01024"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M63,7V1H45.78c-1.523,0-2.804,1.141-2.979,2.652L41.243,17H25v6h2.095l1.554,15.537C27.574,34.769,24.108,32,20,32 c-4.289,0-7.88,3.018-8.778,7.04L2.903,21.57L1.097,22.43l9.481,19.911C6.79,43.402,4,46.877,4,51c0,0.68,0.084,1.347,0.232,2H2.382 l-1.5,3l3.5,7H32h3.618h21.287l4-40H63v-6H47.633l1.25-10H63z M29.019,42.237c-0.035-0.008-0.069-0.019-0.104-0.027 c0.025-0.187,0.031-0.377,0.045-0.565L29.019,42.237z M30.306,35h8.049C36.312,36.651,35,39.174,35,42s1.312,5.349,3.356,7h-2.587 c-0.597-2.616-2.334-4.799-4.661-5.999L30.306,35z M51,42c0,3.859-3.14,7-7,7s-7-3.141-7-7s3.14-7,7-7S51,38.141,51,42z M49.644,35 h8.051l-1.4,14h-6.651C51.688,47.349,53,44.826,53,42S51.688,36.651,49.644,35z M21.768,53C21.916,52.347,22,51.68,22,51 c0-0.518-0.054-1.022-0.138-1.516C23.024,48.524,24.107,48,25,48c1.026,0,1.792,0.471,2.76,1.067C29.159,49.929,30.899,51,34,51 c0,0.684-0.098,1.354-0.29,2H21.768z M13.078,42.004c-0.032-0.226-0.047-0.453-0.058-0.682C13.948,40.189,16.125,38,18,38 c1.026,0,1.792,0.471,2.76,1.067C22.159,39.929,23.899,41,27,41c0,0.338-0.031,0.673-0.078,1.005 c-2.705,0.024-5.242,1.279-6.92,3.353C18.366,43.332,15.873,42.028,13.078,42.004z M33.702,48.988 c-2.337-0.065-3.641-0.853-4.893-1.623C27.719,46.693,26.593,46,25,46c-1.183,0-2.44,0.483-3.746,1.422 c-0.034-0.078-0.075-0.152-0.111-0.229C22.43,45.22,24.633,44,27,44C30.16,44,32.835,46.106,33.702,48.988z M20,34 c3.16,0,5.835,2.106,6.702,4.988c-2.337-0.065-3.641-0.853-4.893-1.623C20.719,36.693,19.593,36,18,36 c-1.542,0-3.01,0.812-4.19,1.741C14.984,35.52,17.317,34,20,34z M13,44c3.16,0,5.835,2.106,6.702,4.988 c-2.337-0.065-3.641-0.853-4.893-1.623C13.719,46.693,12.593,46,11,46c-1.542,0-3.01,0.812-4.19,1.741C7.984,45.52,10.317,44,13,44z M6.016,51.328C6.941,50.196,9.122,48,11,48c1.026,0,1.792,0.471,2.76,1.067C15.159,49.929,16.899,51,20,51 c0,0.684-0.098,1.354-0.29,2H6.29C6.128,52.458,6.042,51.898,6.016,51.328z M32,61H5.618l-1-2H30v-2H3.618l-0.5-1l0.5-1h32.764 l0.5,1l-0.5,1H32v2h3.382l-1,2H32z M36.618,61l2.5-5l-1.5-3h-1.851C35.916,52.347,36,51.68,36,51h20.095l-1,10H36.618z M61,21h-4v2 h1.895l-1,10H30.106l-1.001-10H55v-2H27v-2h34V21z M43.257,17l1.53-13.116C44.846,3.38,45.273,3,45.78,3H61v2H47.117l-1.5,12H43.257 z"></path>
                          </g>
                        </svg>
                        <div className="text-[#ffa426] text-[10px] sm:text-xs">
                          Food & Beverage
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-fit mt-1 px-3 md:px-4 lg:mr-16 flex flex-wrap gap-2 sm:gap-4">
                    {cinema?.timing.map((time, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          navigate(
                            `/buytickets/${movie_id}/${cinema?.cinemaId}/${time}/seats`
                          )
                        }
                        className="w-fit px-5 sm:px-7 py-2 border border-gray-400 rounded-md text-green-500 text-xs md:text-sm cursor-pointer text-center"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemasShowPage;
