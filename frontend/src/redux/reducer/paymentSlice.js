import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { bookingEndPoints } from "../api";

const { CAPTURE_PAYMENT_API, VERIFICATION_PAYMENT_API, RESERVE_SEATS_API } =
  bookingEndPoints;

const initialState = {
  seats: [],
  bookings: [],
  loading: false,
  error: null,
  capturePaymentData: null, // To store capture payment response
  paymentStatus: null, // To track payment status
};

// Async thunk to verify payment
export const reserveSeats = createAsyncThunk(
  "show/reserveSeats",
  async ({ seatIds }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(RESERVE_SEATS_API, { seatIds });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to reserve seats"
        );
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk to capture payment
export const capturePayment = createAsyncThunk(
  "bookings/capturePayment",
  async ({ showId, seatsBook }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(CAPTURE_PAYMENT_API, {
        showId,
        seatsBook,
      });

      return response.data; // Return payment data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to capture payment"
        );
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk to verify payment
export const verifyPayment = createAsyncThunk(
  "bookings/verifyPayment",
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        VERIFICATION_PAYMENT_API,
        verificationData
      );
      return response.data; // Return verification data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to verify payment"
        );
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
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
      // Capture Payment
      .addCase(capturePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.capturePaymentData = action.payload; // Store payment data
        state.error = null;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload; // Update payment status
        state.error = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSeats, setLoading } = paymentSlice.actions;
export default paymentSlice.reducer;
