import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-hot-toast";
import { addShow, getAdminCinemas } from "../../redux/reducer/adminSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const AddShow = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { isLoading, error } = useSelector((state) => state.admin);
  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  const initialState = {
    movieId: movie_id,
    cinemaId: "",
    screenId: "",
    showStart: "",
    showEnd: "",
    timing: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [cinemas, setCinemas] = useState([]);
  const [screens, setScreens] = useState([]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Check if showEnd is earlier than showStart
    if (new Date(formData.showEnd) < new Date(formData.showStart)) {
      toast.error("End date cannot be earlier than the start date.");
      return;
    }

    const result = await dispatch(addShow(formData));
    if (addShow.fulfilled.match(result)) {
      setFormData(initialState);
    }
  };

  useEffect(() => {
    const fetchAdminCinemas = async () => {
      const result = await dispatch(getAdminCinemas());
      if (getAdminCinemas.fulfilled.match(result)) {
        setCinemas(result.payload.data);
      }
    };
    fetchAdminCinemas();
  }, []);

  useEffect(() => {
    const tempScreens = cinemas.find(
      (temp) => temp._id === formData.cinemaId
    )?.screens;
    setScreens(tempScreens);
  }, [formData.cinemaId]);

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Add Show
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
            {/* Cinemas */}
            <div>
              <label
                htmlFor="cinema"
                className="block text-sm font-medium text-gray-700"
              >
                Cinema
              </label>
              <select
                onChange={handleOnChange}
                name="cinemaId"
                id="cinemaId"
                value={formData.cinemaId}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Cinema</option>
                {cinemas?.map((cinema) => {
                  return (
                    <option key={cinema._id} value={cinema._id}>
                      {cinema.cinemaName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Screens */}
            <div>
              <label
                htmlFor="screen"
                className="block text-sm font-medium text-gray-700"
              >
                Screen
              </label>
              <select
                onChange={handleOnChange}
                name="screenId"
                id="screenId"
                value={formData.screenId}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Screen</option>
                {screens?.map((screen, index) => {
                  return (
                    <option key={screen} value={screen}>
                      {`Screen-${index + 1}`}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Timing */}
            <div>
              <label
                htmlFor="timing"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <select
                onChange={handleOnChange}
                name="timing"
                id="timing"
                value={formData.timing}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Time</option>
                <option value="9-12am">9am to 12am</option>
                <option value="3-6pm">3pm to 6pm</option>
                <option value="9-12pm">9pm to 12pm</option>
              </select>
            </div>

            {/* Show Start */}
            <div>
              <label
                htmlFor="showStart"
                className="block text-sm font-medium text-gray-700"
              >
                Show Start
              </label>
              <input
                type="date"
                id="showStart"
                name="showStart"
                value={formData.showStart}
                onChange={handleOnChange}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Show End */}
            <div>
              <label
                htmlFor="showEnd"
                className="block text-sm font-medium text-gray-700"
              >
                Show End
              </label>
              <input
                type="date"
                id="showEnd"
                name="showEnd"
                value={formData.showEnd}
                onChange={handleOnChange}
                className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
            >
              {isLoading ? "Adding..." : "Add Show"}
            </button>

            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddShow;
