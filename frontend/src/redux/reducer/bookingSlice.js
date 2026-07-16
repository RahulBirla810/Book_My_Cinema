import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { bookingEndPoints } from "../api";

const { GET_ALL_BOOKINGS_API } = bookingEndPoints;
const initialState = {
  seats: [],
  bookings: [],
  loading: false,
  error: null,
};

export const fetchAllBookings = createAsyncThunk(
  "bookings/tickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_ALL_BOOKINGS_API);
      return response.data; // Return the movie data if successful
    } catch (error) {
      // Handle errors properly
      if (error.response) {
        // The request was made, but the server responded with an error status
        return rejectWithValue(
          error.response.data.message || "Failed to fetch movies"
        );
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue("No response from server");
      } else {
        // Something else happened while setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async ({ bookingId, reason }, { rejectWithValue, dispatch }) => {
    try {
      const { CANCEL_BOOKING_API } = bookingEndPoints;
      const response = await AxiosInstance.post(CANCEL_BOOKING_API, { bookingId, reason });
      dispatch(fetchAllBookings());
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to cancel booking"
        );
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.error = null;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.cinemas = [];
        state.movieDetailes = {};
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSeats, setLoading } = bookSlice.actions;
export default bookSlice.reducer;
