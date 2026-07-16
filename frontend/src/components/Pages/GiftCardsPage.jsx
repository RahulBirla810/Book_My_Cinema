import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCards } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { toast } from "react-hot-toast";

const GiftCardsPage = () => {
  const dispatch = useDispatch();
  const { giftCards, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchGiftCards());
  }, [dispatch]);

  const purchaseGiftCard = (title, price) => {
    toast.success(`Purchase initiated for ${title} worth Rs. ${price}!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Banner */}
        <div className="w-full h-[150px] sm:h-[220px] md:h-[280px] bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-between p-6 sm:p-12 text-white shadow-md mb-8">
          <div className="space-y-2 sm:space-y-4 max-w-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              💳 Gift Cards & Vouchers
            </h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              Gift your friends and family the perfect entertainment pass! Redeemable on any cinema movie, play, or local event.
            </p>
          </div>
          <div className="hidden md:block text-8xl opacity-20 transform rotate-12 select-none">
            🎫
          </div>
        </div>

        {/* Gift Cards list */}
        {loading ? (
          <div className="w-full py-20 flex justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : !giftCards || giftCards.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No gift cards available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCards.map((card) => (
              <div
                key={card._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="h-40 bg-gray-100 overflow-hidden relative flex items-center justify-center">
                    <img
                      src={card.thumbnail}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
                    <span className="absolute top-4 right-4 bg-teal-500 text-white font-extrabold text-sm px-3 py-1 rounded-full shadow-sm">
                      Rs. {card.price}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {card.title}
                    </h2>
                    <p className="text-sm text-gray-600 min-h-[40px] line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-gray-50 border-t flex justify-end">
                  <button
                    onClick={() => purchaseGiftCard(card.title, card.price)}
                    className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-lg transition-all"
                  >
                    Buy Voucher
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

export default GiftCardsPage;
