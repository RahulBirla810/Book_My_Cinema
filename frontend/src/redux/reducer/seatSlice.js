import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { movieEndPoins } from "../api";

const { SHOW_SEATS_API } = movieEndPoins;

const initialState = {
  seatsInfo: [],
  loading: false,
  error: null,
  movie: {},
};

// Async thunk to fetch all movies from the API
export const fetchSeatsDetailes = createAsyncThunk(
  "seat/showSeats",
  async ({ movieId, cinemaId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(SHOW_SEATS_API, {
        movieId,
        cinemaId,
      });
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

// Reducer and actions
const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setSeatInfo: (state, action) => {
      state.seatsInfo = action.payload.data;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatsDetailes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatsDetailes.fulfilled, (state, action) => {
        state.loading = false;
        state.seatsInfo = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSeatsDetailes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setSeatInfo } = seatSlice.actions;
export default seatSlice.reducer;
