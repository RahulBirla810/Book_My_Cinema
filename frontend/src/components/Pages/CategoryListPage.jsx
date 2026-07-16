import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategoryItems } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { GrFormSearch } from "react-icons/gr";

const CategoryListPage = () => {
  const { type } = useParams(); // 'streams', 'events', 'plays', 'sports', 'activities'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.category);
  const [searchTerm, setSearchTerm] = useState("");

  // Map route param to backend enum type
  const getBackendType = (routeType) => {
    switch (routeType?.toLowerCase()) {
      case "streams":
        return "Stream";
      case "events":
        return "Event";
      case "plays":
        return "Play";
      case "sports":
        return "Sport";
      case "activities":
        return "Activity";
      default:
        return "Event";
    }
  };

  const backendType = getBackendType(type);

  useEffect(() => {
    dispatch(fetchCategoryItems({ type: backendType }));
  }, [dispatch, type, backendType]);

  const filteredItems = items
    ? items.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const getThemeStyles = (catType) => {
    switch (catType?.toLowerCase()) {
      case "streams":
        return {
          title: "Streams",
          desc: "Watch award-winning movies and independent films from the comfort of your home.",
          gradient: "from-blue-600 to-indigo-700",
          icon: "🌐",
        };
      case "events":
        return {
          title: "Live Events",
          desc: "Unforgettable music concerts, stand-up comedies, festivals, and exhibitions.",
          gradient: "from-purple-600 to-pink-700",
          icon: "🎤",
        };
      case "plays":
        return {
          title: "Theater Plays",
          desc: "Experience classical adaptations, musicals, and thrilling stage drama.",
          gradient: "from-amber-500 to-rose-600",
          icon: "🎭",
        };
      case "sports":
        return {
          title: "Sports Tournaments",
          desc: "Cheer for your favorite teams live at local arenas and championships.",
          gradient: "from-emerald-500 to-teal-700",
          icon: "🏆",
        };
      case "activities":
        return {
          title: "Activities & Fun",
          desc: "Hot air balloon safaris, room escapes, go-karting, and local experiences.",
          gradient: "from-rose-500 to-orange-600",
          icon: "🎈",
        };
      default:
        return {
          title: "Entertainment",
          desc: "Explore top-rated entertainment shows and listings in your city.",
          gradient: "from-rose-500 to-red-600",
          icon: "🎟️",
        };
    }
  };

  const theme = getThemeStyles(type);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Banner */}
        <div
          className={`w-full h-[150px] sm:h-[220px] md:h-[280px] bg-gradient-to-r ${theme.gradient} rounded-xl flex items-center justify-between p-6 sm:p-12 text-white shadow-md mb-8`}
        >
          <div className="space-y-2 sm:space-y-4 max-w-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {theme.icon} {theme.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              {theme.desc}
            </p>
          </div>
          <div className="hidden md:block text-8xl opacity-20 transform rotate-12 select-none">
            {theme.icon}
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={`Search in ${theme.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm h-10 border border-gray-300 rounded-lg pl-10 pr-4 outline-none focus:border-rose-500 font-sans"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <GrFormSearch className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="w-full py-20 flex justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No listings found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/category/${type}/detail/${item._id}`)}
                className="cursor-pointer group"
              >
                <div className="w-full aspect-[2/3] overflow-hidden rounded-xl bg-gray-100 shadow border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200"
                  />
                </div>
                <div className="mt-3 flex flex-col items-start">
                  <span className="text-base font-semibold text-gray-800 group-hover:text-rose-500 line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {item.genres?.join(" / ")}
                  </span>
                  <span className="text-sm font-bold text-rose-600 mt-1">
                    Rs. {item.price} onwards
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;
