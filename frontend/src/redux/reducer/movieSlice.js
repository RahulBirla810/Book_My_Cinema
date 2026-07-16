import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { toast } from "react-hot-toast";
import { movieEndPoins, adminendpoints } from "../api";

const { ADD_MOVIE_API, UPDATE_MOVIE_API, GET_MOVIE_DETAILS } = movieEndPoins;
const { ADD_CITY_API } = adminendpoints;

// Initial state
const initialState = {
  movieName: "",
  categories: [],
  releaseDate: "",
  summary: "",
  genres: [],
  cast: [],
  crew: [],
  supportingLanguages: [],
  thumbnailImage: "",
  bannerImage: "",
  loading: false,
  error: null,
  movie: {},
};

// Async thunk to fetch all movies from the API
export const fetchMovieApi = createAsyncThunk(
  "movie/fetchMovies",
  async ({ movieId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(GET_MOVIE_DETAILS, { movieId });
      return response.data;
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

//update movie
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (movieFormData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(UPDATE_MOVIE_API, movieFormData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Movie Updated Successfully");
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("updateMovie error:", error);
      return rejectWithValue(error.message || "Error while updating movie");
    }
  }
);

// Async action to submit the movie form
export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_MOVIE_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Movie Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("addMovie error:", error);
      return rejectWithValue(error.message || "Error while adding movie");
    }
  }
);

export const addCity = createAsyncThunk(
  "cinema/addCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_CITY_API, { cityName });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("City Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addCity error:", error);
      return rejectWithValue(error.message || "Error while adding city");
    }
  }
);

// Reducer and actions
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFormData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = {};
      })
      .addCase(fetchMovieApi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const movie = action.payload.data;
        state.movieName = movie.movieName;
        state.releaseDate = movie.releaseDate;
        state.summary = movie.summary;
        state.genres = movie.genres;
        state.cast = movie.cast;
        state.crew = movie.crew;
        state.supportingLanguages = movie.supportingLanguages;
        state.thumbnailImage = movie.thumbnail;
        state.bannerImage = movie.banner;
        state.movie = movie;
      })
      .addCase(fetchMovieApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, resetFormData, setLoading } = movieSlice.actions;
export default movieSlice.reducer;
