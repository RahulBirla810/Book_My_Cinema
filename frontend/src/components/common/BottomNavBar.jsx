import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/reducer/authSlice";
import { toast } from "react-hot-toast";

const BottomNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(setToken(null));
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div
      style={{
        zIndex: "999",
      }}
      className="sm:hidden flex fixed bottom-0 left-0 right-0 w-full h-[50px] p-3 bg-white border-t border-gray-200"
    >
      <ul className="flex items-center justify-around bg-white w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-rose-500" : "text-gray-600"
          }
        >
          <li className="flex flex-col items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <p className="text-[10px] font-medium">Home</p>
          </li>
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/book/transactions"
              className={({ isActive }) =>
                isActive ? "text-rose-500" : "text-gray-600"
              }
            >
              <li className="flex flex-col items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  ></path>
                </svg>
                <p className="text-[10px] font-medium">Bookings</p>
              </li>
            </NavLink>
            <li
              onClick={logoutHandler}
              className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-rose-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <p className="text-[10px] font-medium">Logout</p>
            </li>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-rose-500" : "text-gray-600"
            }
          >
            <li className="flex flex-col items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <p className="text-[10px] font-medium">Sign In</p>
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default BottomNavBar;
