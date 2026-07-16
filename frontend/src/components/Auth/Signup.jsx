import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sendOtpApi, setSignupData } from "../../redux/reducer/authSlice";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    accountType: "Viewer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePhoneNumber(formData.contactNumber)) {
      toast.error("Please enter a valid contact number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    dispatch(setSignupData(formData));
    const result = await dispatch(sendOtpApi(formData.email));
    if (sendOtpApi.fulfilled.match(result)) {
      navigate("/otp");
    }
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-3 mb-5 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center w-full text-rose-500 ">
            Hello
          </h1>

          <div className="text-center text-sm sm:text-base text-gray-600 mt-2">
            <p>There, please enter your details to get started!</p>
          </div>

          <button
            type="button"
            className="mt-4 w-full py-2 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <FcGoogle className="text-lg mr-2" />
            Sign up with Google
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500 text-lr">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleOnSubmit} className="mt-4 space-y-4">
            <div className="relative flex items-center">
              <AiOutlineUser className="text-lg mr-2" />
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleOnChange}
                placeholder="Enter user name"
                className="w-full border-b border-gray-300 p-2 text-sm  text-[rgb(102,102,102)] outline-none"
              />
            </div>

            <div className="relative flex items-center">
              <AiOutlineMail className="text-lg mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="w-full border-b border-gray-300 p-2 text-sm text-[rgb(102,102,102)] outline-none"
              />
            </div>

            <div className="relative flex items-center">
              <AiOutlineLock className="text-lg mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className="w-full border-b border-gray-300 p-2 text-sm text-[rgb(102,102,102)] outline-none "
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="gray" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="gray" />
                )}
              </span>
            </div>

            <div className="relative flex items-center">
              <AiOutlineLock className="text-lg mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter confirm password"
                className="w-full border-b border-gray-300 p-2 text-sm text-[rgb(102,102,102)] outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="gray" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="gray" />
                )}
              </span>
            </div>

            <div className="relative flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/330/330439.png"
                className="mr-2 w-6 h-6"
              />
              <span>+91</span>

              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleOnChange}
                placeholder="Enter contact number"
                className="w-full border-b border-gray-300 p-2 text-sm text-[rgb(102,102,102)] outline-none"
              />
            </div>

            <div className="flex  items-center mt-4">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2 "
                disabled={
                  !(
                    formData.userName &&
                    formData.email &&
                    formData.contactNumber &&
                    formData.password &&
                    formData.confirmPassword
                  )
                }
              />
              <label
                htmlFor="agreeToTerms"
                className="text-sm    text-gray-600  "
              >
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={
                !formData.userName ||
                !formData.email ||
                !formData.contactNumber ||
                !formData.password ||
                !formData.confirmPassword ||
                !agreeToTerms ||
                isLoading
              }
              className={`w-full py-2 rounded-lg font-medium transition ${
                formData.userName &&
                formData.email &&
                formData.contactNumber &&
                formData.password &&
                formData.confirmPassword &&
                agreeToTerms
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            <div className="mt-3 text-center text-sm text-gray-600">
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="font-medium hover:underline text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
