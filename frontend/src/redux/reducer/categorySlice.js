import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { categoryEndPoints } from "../api";
import { toast } from "react-hot-toast";

const {
  GET_CATEGORY_ITEMS_API,
  GET_CATEGORY_ITEM_DETAIL_API,
  GET_OFFERS_API,
  GET_GIFT_CARDS_API,
  SUBMIT_LISTING_API,
} = categoryEndPoints;

// Async Thunks
export const fetchCategoryItems = createAsyncThunk(
  "category/fetchItems",
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${GET_CATEGORY_ITEMS_API}${type ? `?type=${type}` : ""}`
      );
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch items");
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching items");
    }
  }
);

export const fetchCategoryItemDetail = createAsyncThunk(
  "category/fetchDetail",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(GET_CATEGORY_ITEM_DETAIL_API, {
        eventId,
      });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch detail");
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching details");
    }
  }
);

export const fetchOffers = createAsyncThunk(
  "category/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_OFFERS_API);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch offers");
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching offers");
    }
  }
);

export const fetchGiftCards = createAsyncThunk(
  "category/fetchGiftCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_GIFT_CARDS_API);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch gift cards");
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching gift cards");
    }
  }
);

export const submitListing = createAsyncThunk(
  "category/submitListing",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(SUBMIT_LISTING_API, formData);
      if (response.data.success) {
        toast.success("Listing submitted successfully!");
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to submit listing");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting listing");
      return rejectWithValue(error.message || "Error submitting listing");
    }
  }
);

// Category Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    selectedItem: null,
    offers: [],
    giftCards: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Category Items
      .addCase(fetchCategoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Category Detail
      .addCase(fetchCategoryItemDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedItem = null;
      })
      .addCase(fetchCategoryItemDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchCategoryItemDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Offers
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.offers = [];
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Gift Cards
      .addCase(fetchGiftCards.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.giftCards = [];
      })
      .addCase(fetchGiftCards.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = action.payload;
      })
      .addCase(fetchGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Listing
      .addCase(submitListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitListing.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedItem } = categorySlice.actions;
export default categorySlice.reducer;
