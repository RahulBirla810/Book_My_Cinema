import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { toast } from "react-hot-toast";

const OffersPage = () => {
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Banner */}
        <div className="w-full h-[150px] sm:h-[220px] md:h-[280px] bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-between p-6 sm:p-12 text-white shadow-md mb-8">
          <div className="space-y-2 sm:space-y-4 max-w-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              🔥 Offers & Coupons
            </h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              Unlock exclusive deals, instant cashback rewards, and huge discounts on your favorite cinema tickets!
            </p>
          </div>
          <div className="hidden md:block text-8xl opacity-20 transform rotate-12 select-none">
            🎁
          </div>
        </div>

        {/* Coupons list */}
        {loading ? (
          <div className="w-full py-20 flex justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : !offers || offers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No active offers found. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={offer.thumbnail}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {offer.title}
                    </h2>
                    <p className="text-sm text-gray-600 min-h-[40px] line-clamp-2">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-gray-50 border-t flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-400">COUPON CODE</span>
                    <span className="text-sm font-mono font-extrabold text-gray-800 select-all">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-all"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
