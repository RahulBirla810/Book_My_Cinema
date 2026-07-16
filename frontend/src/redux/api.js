const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const adminendpoints = {
  ADD_CINEMA_API: BASE_URL + "/cinema/addCinema",
  UPDATE_SCREEN_API: BASE_URL + "/cinema/updateScreen",
  GET_SHOW_CINEMA_API: BASE_URL + "/cinema/getShowCinema",
  GET_ADMIN_CINEMAS_API: BASE_URL + "/cinema/getCinemaDetailes",
  ADD_CITY_API: BASE_URL + "/cinema/addCity",
  ADD_SHOW_API: BASE_URL + "/show/addShow",
  LIVE_YOUR_SHOW_API: BASE_URL + "/show/liveYourShow",
  GET_UNLIVE_SHOWS_API: BASE_URL + "/show/getUnliveShows",
  GET_CITIES_API: BASE_URL + "/cinema/getCities",
};

export const movieEndPoins = {
  ADD_MOVIE_API: BASE_URL + "/movie/addMovie",
  UPDATE_MOVIE_API: BASE_URL + "/movie/updatemovie",
  GET_MOVIE_DETAILS: BASE_URL + "/movie/getMovieDetails",
  GET_MOVIES: BASE_URL + "/movie/getAllMovies",
  SHOW_SEATS_API: BASE_URL + "/cinema/getShowCinema",
  GET_SHOWS_CINEMAS_API: BASE_URL + "/movie/getMovieCinema",
};

export const bookingEndPoints = {
  GET_ALL_BOOKINGS_API: BASE_URL + "/booking/fetchBookings",
  CAPTURE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  VERIFICATION_PAYMENT_API: BASE_URL + "/payment/verifyPayment",
  RESERVE_SEATS_API: BASE_URL + "/show/reserveSeats",
  CANCEL_BOOKING_API: BASE_URL + "/booking/cancelBooking",
};

export const categoryEndPoints = {
  GET_CATEGORY_ITEMS_API: BASE_URL + "/event/getAllEvents",
  GET_CATEGORY_ITEM_DETAIL_API: BASE_URL + "/event/getEventDetails",
  GET_OFFERS_API: BASE_URL + "/event/getAllOffers",
  GET_GIFT_CARDS_API: BASE_URL + "/event/getAllGiftCards",
  SUBMIT_LISTING_API: BASE_URL + "/event/submitListing",
};
