import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdminCinemas } from "../../redux/reducer/adminSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const AdminCinemas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
  const [adminCinemas, setAdminCinemas] = useState([]);

  useEffect(() => {
    const fetchAdminCinemas = async () => {
      const result = await dispatch(getAdminCinemas());
      if (getAdminCinemas.fulfilled.match(result)) {
        setAdminCinemas(result?.payload?.data || []);
      }
    };
    fetchAdminCinemas();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-3 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Cinema List
        </h1>
        {isLoading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div className="my-3 sm:my-5 px-5 sm:px-8 py-3 bg-gray-200 rounded-md">
            {adminCinemas?.map((cinema, index) => (
              <div
                key={cinema._id}
                className={`py-4 flex justify-between gap-8 sm:gap-24 ${
                  index != 0 && "border-t-[1px] border-black"
                }`}
              >
                <div>
                  <div className="w-fit text-xs sm:text-sm cursor-pointer text-[rgb(51,51,51)]">
                    <span className="font-medium text-black">Cinema: </span>{cinema?.cinemaName}
                  </div>
                  <div className="w-fit text-xs sm:text-sm cursor-pointer capitalize text-[rgb(51,51,51)]">
                    <span className="font-medium text-black">City: </span>{cinema?.cityId?.cityName}
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/cinema/${cinema._id}/updateScreen/${cinema.screens[0]}`
                    )
                  }
                  className="w-fit h-fit bg-rose-500 text-white text-[10px] sm:text-sm px-2 py-[7px] sm:px-3 sm:py-2 rounded-lg hover:bg-rose-600 transition"
                >
                  Update Screen
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCinemas;
