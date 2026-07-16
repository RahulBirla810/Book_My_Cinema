import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import AxiosInstance from "../utils/apiConnector";
import { endpoints } from "../api";

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoints;

// ------------------ sendOtp API -------------------
export const sendOtpApi = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(SENDOTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message || "Error sending OTP");
    }
  }
);

// ------------------ signUp API -------------------
export const signUpApi = createAsyncThunk(
  "auth/signUp",
  async (
    {
      accountType,
      userName,
      email,
      contactNumber,
      password,
      confirmPassword,
      otp,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosInstance.post(SIGNUP_API, {
        accountType,
        userName,
        email,
        contactNumber,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successfull");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message || "Error during signup");
    }
  }
);

// ------------------ login API -------------------
export const loginApi = createAsyncThunk(
  "auth/login",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(LOGIN_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message || "Unexpected login error");
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Login error:", error);
      return rejectWithValue(error.message || "Error during login");
    }
  }
);

// --------------- Slice ---------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    error: null,
    signupData: {},
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
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------- sendOtp -------------------
      .addCase(sendOtpApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOtpApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOtpApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ------------------- signUp -------------------
      .addCase(signUpApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ------------------- login -------------------
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setToken, clearError, setSignupData } =
  authSlice.actions;

export default authSlice.reducer;
