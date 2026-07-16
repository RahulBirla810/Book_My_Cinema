import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCategoryItemDetail, clearSelectedItem } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-hot-toast";

const CategoryDetailPage = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loading } = useSelector((state) => state.category);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    dispatch(fetchCategoryItemDetail({ eventId: id }));
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, id]);

  const handleActionClick = () => {
    if (selectedItem?.type === "Stream") {
      window.open(selectedItem.location, "_blank");
      toast.success("Redirecting to stream source!");
    } else {
      toast.success(`Booking request registered for ${selectedItem?.title}!`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      {selectedItem ? (
        <>
          <div
            style={{
              backgroundImage: isMobile
                ? "none"
                : `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), 
              url(${selectedItem.banner})`,
            }}
            className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[370px] xl:min-h-[500px] mx-auto sm:px-6 md:px-10 xl:px-12 flex items-center bg-no-repeat bg-right-top relative bg-cover"
          >
            <div className="w-full h-full mt-2 flex flex-col sm:flex-row sm:gap-8 z-50">
              <p className="sm:hidden px-5 mb-2 text-2xl font-semibold text-gray-800">
                {selectedItem.title}
              </p>
              <img
                src={selectedItem.thumbnail}
                className="hidden sm:block w-[175px] md:w-[205px] xl:w-[295px] rounded-lg shadow-md border border-gray-700"
                alt={selectedItem.title}
              />
              <div className="px-4 sm:hidden">
                <img
                  src={selectedItem.banner}
                  className="w-full rounded-md shadow"
                  alt="Banner"
                />
              </div>

              <div className="px-6 sm:px-3 md:px-4 xl:px-7 py-4 sm:py-7 md:py-9 xl:py-12 flex flex-col gap-3 sm:gap-4 xl:gap-6">
                <p className="hidden sm:block text-lg sm:text-2xl md:text-3xl xl:text-5xl sm:text-white font-bold">
                  {selectedItem.title}
                </p>

                <div className="flex font-medium gap-2 sm:gap-3">
                  {selectedItem.genres?.map((g, index) => (
                    <div
                      key={index}
                      className="text-xs sm:text-sm py-1 px-3 bg-rose-100 text-rose-800 border border-rose-200 rounded"
                    >
                      <p>{g}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap text-sm sm:text-base md:text-lg xl:text-xl font-medium sm:text-white items-center gap-1.5">
                  <span>Type: {selectedItem.type}</span>
                  <span className="mx-1">•</span>
                  <span>Date: {formatDate(selectedItem.releaseDate)}</span>
                  <span className="mx-1">•</span>
                  <span className="text-rose-500 font-bold sm:text-rose-400">
                    Rs. {selectedItem.price}
                  </span>
                </div>

                <button
                  onClick={handleActionClick}
                  className="w-fit mt-3 sm:mt-5 text-sm sm:text-base md:text-lg xl:text-xl px-6 sm:px-8 xl:px-14 py-3 xl:py-[18px] rounded-lg lg:rounded-xl text-white bg-rose-500 font-bold transition-all hover:bg-rose-600 shadow-md"
                >
                  {selectedItem.type === "Stream" ? "💻 Stream Now" : "🎟️ Book Tickets"}
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 sm:mt-12 px-6 md:px-12 lg:px-16 flex flex-col gap-8 sm:gap-12">
            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-gray-800">
                About the Show
              </h4>
              <p className="mt-3 sm:mt-5 tracking-[0.2px] text-sm md:text-base lg:text-lg text-gray-600 lg:w-[75%] leading-relaxed">
                {selectedItem.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-gray-800">
                Venue & Access Details
              </h4>
              <p className="mt-3 sm:mt-5 font-mono text-sm md:text-base lg:text-lg text-gray-700 bg-gray-100 p-4 rounded-lg inline-block border">
                📍 {selectedItem.location}
              </p>
            </div>

            {selectedItem.cast && selectedItem.cast.length > 0 && (
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-gray-800">
                  Cast & Crew
                </h4>
                <div className="mt-3 sm:mt-5 flex gap-7 sm:gap-10 overflow-x-auto scrollbar-hide">
                  {selectedItem.cast.map((castMember, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="h-[75px] w-[75px] md:h-[90px] md:w-[90px]">
                        <img
                          className="w-full h-full rounded-full border shadow-sm"
                          src="https://th.bing.com/th/id/OIP.kqOLyWHQPVOCDVOgCDRvvAHaHa?w=215&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                          alt="cast-image"
                        />
                      </div>
                      <h5 className="text-sm text-center md:text-base mt-2 tracking-[0.2px] font-medium text-gray-800 whitespace-nowrap">
                        {castMember}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Listing not found.
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
