import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import OtpInput from "react-otp-input";
import { signUpApi } from "../../redux/reducer/authSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const CustomOtpInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signupData, isLoading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const [timeLeft, setTimeLeft] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsDisabled(true);
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleResendOTP = () => {
    setTimeLeft(120);
    setIsDisabled(false);
    setCanResend(false);
  };

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    if (!signupData) return;

    const {
      accountType,
      userName,
      email,
      contactNumber,
      password,
      confirmPassword,
    } = signupData;

    const result = await dispatch(
      signUpApi({
        otp,
        email,
        accountType,
        userName,
        contactNumber,
        password,
        confirmPassword,
      })
    );

    if (signUpApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-3 sm:mt-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Verify OTP
        </h1>
        <form
          onSubmit={handleVerifyAndSignup}
          className="w-[95%] sm:w-fit mt-3 mb-5 p-5 sm:p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/mobile-encryption-concept-illustration_114360-5173.jpg?semt=ais_hybrid"
              alt="Mobile Encryption Illustration"
              className="w-80 h-72 rounded-lg mb-4"
            />
          </div>

          <h1 className="text-2xl font-medium text-center">
            Verify your <span className="text-rose-500 "> email</span>
          </h1>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>-</span>}
            containerStyle="flex sm:gap-0 justify-center gap-2 flex-wrap"
            renderInput={(props) => (
              <input
                {...props}
                className="text-center border border-gray-300 sm:m-[0.5rem] rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                style={{
                  width: isMobile ? "37px" : "40px",
                  height: isMobile ? "37px" : "40px",
                }}
              />
            )}
          />

          <div className="text-center text-red-500 font-semibold">
            <span className=" text-center text-gray-500 font-semibold ">
              {" "}
              This code will expire in
            </span>{" "}
            {formatTime(timeLeft)}
          </div>

          <button
            type="submit"
            disabled={isLoading || isDisabled}
            className={`w-full py-3 rounded-lg font-medium transition ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center mt-4">
            <span>Didn't receive OTP? </span>
            <button
              onClick={handleResendOTP}
              disabled={!canResend}
              className={`text-blue-600 font-medium hover:underline ${
                canResend ? "" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomOtpInput;
