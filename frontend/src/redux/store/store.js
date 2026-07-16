import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import homeReducer from "../reducer/homeSlice";
import movieReducer from "../reducer/movieSlice";
import adminReducer from "../reducer/adminSlice";
import seatReducer from "../reducer/seatSlice";
import showReducer from "../reducer/showSlice";
import bookReducer from "../reducer/bookingSlice";
import paymentReducer from "../reducer/paymentSlice";
import categoryReducer from "../reducer/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    movie: movieReducer,
    admin: adminReducer,
    seat: seatReducer,
    show: showReducer,
    book: bookReducer,
    payment: paymentReducer,
    category: categoryReducer,
  },
});
