import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";
import { setToken } from "../../redux/reducer/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [isLogedIn, setIsLogedIn] = useState(false);

  const logo = require("../../utils/png-clipart-bookmyshow-office-android-ticket-android-text-logo-removebg-preview.png");

  useEffect(() => {
    if (token) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, [token]);

  const logoutClickHandler = () => {
    localStorage.clear();
    dispatch(setToken(null));
    setIsLogedIn(false);
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className="w-full flex items-start justify-center py-5 px-3 sm:px-5 md:px-7">
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-1 justify-center text-[rgb(47,47,47)] text-base lg:text-lg font-medium transform scale-y-150"
          >
            <h2>book</h2>
            <div className="-ml-[10px] -mr-3 w-[52px] h-[28px] sm:w-[52px] sm:h-[28px] text-white rotate-12 inline-block">
              <img src={logo} className="-rotate-12 w-full h-full"></img>
            </div>
            <h2>cinema</h2>
          </NavLink>
          <div className="w-[75%] opacity-0 sm:opacity-100 flex items-center justify-center">
            <div className="relative w-full">
              <input
                className="w-full text-xs lg:text-sm h-[30px] sm:h-[33px] lg:h-[36px] border-gray-300 border rounded-md pl-10 pr-3 outline-none font-sans"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                <GrFormSearch className="w-[30px] h-[25px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {isLogedIn ? (
            <button
              onClick={logoutClickHandler}
              className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border"
            >
              Log Out
            </button>
          ) : (
            <NavLink to="/login" className="px-3 sm:px-4 py-1 text-[11px] sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border">
              Sign in
            </NavLink>
          )}
          <span>
            <RxHamburgerMenu className="text-[22px] sm:text-[26px] cursor-pointer text-[gray]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
