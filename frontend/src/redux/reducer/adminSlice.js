import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { toast } from "react-hot-toast";
import { adminendpoints } from "../api";

const {
  ADD_CINEMA_API,
  UPDATE_SCREEN_API,
  GET_ADMIN_CINEMAS_API,
  ADD_SHOW_API,
  LIVE_YOUR_SHOW_API,
  GET_UNLIVE_SHOWS_API,
  GET_CITIES_API,
} = adminendpoints;

// set this in api call to handle formData in server
// {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// }

export const addCinema = createAsyncThunk(
  "cinema/addCinema",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_CINEMA_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Cinema Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addCinema error:", error);
      return rejectWithValue(error.message || "Error while adding cinema");
    }
  }
);

export const updateScreen = createAsyncThunk(
  "cinema/updateScreen",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(UPDATE_SCREEN_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Screen Updated Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("updateScreen error:", error);
      return rejectWithValue(error.message || "Error while updating screen");
    }
  }
);

export const getAdminCinemas = createAsyncThunk(
  "cinema/getAdminCinemas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_ADMIN_CINEMAS_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("getAdminCinemas error:", error);
      return rejectWithValue(error.message || "Error while getting cinemas");
    }
  }
);

export const addShow = createAsyncThunk(
  "show/addShow",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_SHOW_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Show Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addShow error:", error);
      return rejectWithValue(error.message || "Error while adding show");
    }
  }
);

export const liveYourShow = createAsyncThunk(
  "show/liveYourShow",
  async (showId, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(LIVE_YOUR_SHOW_API, { showId });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Show Lived Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("liveYourShow error:", error);
      return rejectWithValue(error.message || "Error while live show");
    }
  }
);

export const getUnliveShows = createAsyncThunk(
  "show/getUnliveShows",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_UNLIVE_SHOWS_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("getUnliveShows error:", error);
      return rejectWithValue(
        error.message || "Error while getting unlive show"
      );
    }
  }
);

export const getCities = createAsyncThunk(
  "city/getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_CITIES_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("getCities error:", error);
      return rejectWithValue(error.message || "Error while getting cities");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    allCinemas: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ------------------- addCinema -------------------
      .addCase(addCinema.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCinema.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCinema.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- updateScreen -------------------
      .addCase(updateScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateScreen.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateScreen.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- getAdminCinemas -------------------
      .addCase(getAdminCinemas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminCinemas.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAdminCinemas.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- addShow -------------------
      .addCase(addShow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addShow.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addShow.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- liveYourShow -------------------
      .addCase(liveYourShow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(liveYourShow.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(liveYourShow.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- getUnliveShows -------------------
      .addCase(getUnliveShows.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnliveShows.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUnliveShows.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- getCities -------------------
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getCities.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminSlice.reducer;
