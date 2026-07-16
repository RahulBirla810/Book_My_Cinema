import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { addCity } from "../../redux/reducer/movieSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const AddCity = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.movie);
  const [cityName, setCityName] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  const handleOnChange = (e) => {
    setCityName(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addCity(cityName));
    if (addCity.fulfilled.match(result)) {
      setCityName("");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Add City
        </h1>
        <form
          onSubmit={handleOnSubmit}
          style={{
            width: isMobile ? "85%" : "0%",
            minWidth: isMobile ? "0px" : "350px",
          }}
          className="mx-auto my-3 sm:my-5 p-8 bg-gray-200 shadow-lg rounded-lg space-y-8"
        >
          <div>
            <label
              htmlFor="cityName"
              className="block text-sm font-medium text-gray-700"
            >
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={cityName}
              onChange={handleOnChange}
              placeholder="Enter city name"
              required
              className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
          >
            {loading ? "Adding..." : "Add City"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
