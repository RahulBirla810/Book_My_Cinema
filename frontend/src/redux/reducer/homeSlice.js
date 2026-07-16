import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { movieEndPoins } from "../api";

const { GET_MOVIES } = movieEndPoins;

// ------------------ get all movies API -------------------
export const getAllMoviesApi = createAsyncThunk(
  "movie/getAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_MOVIES);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error sending OTP");
    }
  }
);

// --------------- Slice ---------------
const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    token: null,
    error: null,
    allMovies: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAllMovies: (state, action) => {
      state.allMovies = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllMoviesApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMoviesApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allMovies = action.payload.data;
      })
      .addCase(getAllMoviesApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setToken, clearError, setAllMovies } =
  homeSlice.actions;

export default homeSlice.reducer;
