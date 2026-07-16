import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { addCinema, getCities } from "../../redux/reducer/adminSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const AddCinema = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.admin);
  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  const initialState = {
    cinemaName: "",
    pincode: "",
    cityId: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    const result = await dispatch(getCities());
    if (getCities.fulfilled.match(result)) {
      setCities(result?.payload?.data);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addCinema(formData));
    if (addCinema.fulfilled.match(result)) {
      setFormData(initialState);
      fetchCities();
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Add Cinema
        </h1>
        {isLoading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            style={{
              width: isMobile ? "85%" : "0%",
              minWidth: isMobile ? "0px" : "330px",
              padding: isMobile ? "22px" : "32px",
            }}
            className="mx-auto my-3 sm:my-5 bg-gray-200 shadow-lg rounded-lg space-y-5"
          >
            {/* Cinema Name */}
            <div>
              <label
                htmlFor="cinemaName"
                className="block text-sm font-medium text-gray-700"
              >
                Cinema Name
              </label>
              <input
                type="text"
                id="cinemaName"
                name="cinemaName"
                placeholder="Enter cinema name"
                value={formData.cinemaName}
                onChange={handleOnChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Pincode */}
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleOnChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
            </div>

            {/* City Names */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <select
                onChange={handleOnChange}
                name="cityId"
                id="cityId"
                value={formData.cityId}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => {
                  return (
                    <option key={city._id} value={city._id}>
                      {city.cityName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
            >
              {isLoading ? "Adding..." : "Add Cinema"}
            </button>

            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddCinema;
