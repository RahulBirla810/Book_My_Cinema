import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginApi } from "../../redux/reducer/authSlice";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // Clear error for the field being edited
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await dispatch(loginApi(formData));
    if (loginApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-3 flex flex-col justify-center items-center">
        {/* <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Login
        </h1> */}
        <div
          style={{
            width: isMobile && "85%",
          }}
          className="mb-5 p-2 flex flex-col items-center justify-center gap-1 bg-white rounded-lg shadow-xl"
        >
          <div className="w-full mt-3 text-[rgb(51,51,51)] text-sm sm:text-base font-medium flex flex-col items-center justify-center">
            <span>Hi, Welcome Back</span>
            <span>Please Enter Your Details to Sign In</span>
          </div>

          <div className="w-full my-6 flex items-center justify-center">
            <button className="w-[100px] sm:w-[120px] h-[45px] sm:h-[50px] flex items-center justify-center text-xl sm:text-2xl border rounded-lg hover:scale-110 transition duration-200 ease-in-out">
              <SiApple />
            </button>
            <button className="w-[100px] sm:w-[120px] h-[45px] sm:h-[50px] flex items-center justify-center text-xl sm:text-2xl border rounded-lg hover:scale-110 transition duration-200 ease-in-out">
              <FcGoogle />
            </button>
            <button className="w-[100px] sm:w-[120px] h-[45px] sm:h-[50px] flex items-center justify-center text-xl sm:text-2xl border rounded-lg hover:scale-110 transition duration-200 ease-in-out">
              <FaTwitter className="text-[rgb(26,156,244)]" />
            </button>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <div className="w-[40%] border"></div>
            <p className="text-[rgb(102,102,102)] text-sm font-medium font-sans">
              OR
            </p>
            <div className="w-[40%] border"></div>
          </div>

          <form
            onSubmit={handleOnSubmit}
            className="w-full mx-auto px-4 sm:px-8 pt-7 pb-3 rounded-lg flex flex-col items-center justify-center gap-2"
          >
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className={`mt-2 bg-none block w-full text-xs sm:text-sm text-[rgb(102,102,102)] border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className={`mt-2 bg-transparent block w-full text-xs sm:text-sm text-[rgb(102,102,102)] border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 outline-none`}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[35px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="w-full flex items-center justify-between">
              <label
                htmlFor="remember"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer"
              >
                <input type="checkbox" id="remember" name="remember"></input>
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm flex items-center justify-center text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-5 py-2 bg-rose-500 text-white font-medium text-sm rounded-lg hover:bg-rose-600 cursor-pointer"
            >
              {isLoading ? "Signing..." : "Continue"}
            </button>
          </form>

          <div className="mb-2 text-xs sm:text-sm flex items-center justify-center gap-1">
            <span>Don't have an account?</span>
            <Link to="/signup" className="hover:underline text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
