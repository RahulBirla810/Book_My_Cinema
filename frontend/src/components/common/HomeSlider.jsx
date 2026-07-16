import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import sliderPictureArray from "../../utils/sliderPicture";
import bannerImgTwo from "../../utils/bannerTwo.jpg";
import sliderArrayMobile from "../../utils/sliderArrayMobileData";
import { gsap } from "gsap";

const HomeSlider = ({ isShow = true }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [index, setIndex] = useState(0);
  const [newIndex, setNewIndex] = useState(0);

  const sliderRef = useRef();
  const topLiRef = useRef();
  const dotRef = useRef();
  const bannerImgRef = useRef();
  const topLiRightRef = useRef();

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    if (
      !animation &&
      dotRef.current &&
      sliderRef.current &&
      bannerImgRef.current
    ) {
      setAnimation(true);

      const dots = dotRef.current.querySelectorAll("div");
      const t1 = gsap.timeline();

      if (topLiRef.current) {
        const elements1 = topLiRef.current.querySelectorAll("li");
        t1.from(elements1, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.2,
          ease: "power1.out",
        });
      }

      // Animate top right list items (if present)
      if (topLiRightRef.current) {
        const elements2 = topLiRightRef.current.querySelectorAll("li");
        t1.from(elements2, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.2,
          ease: "power1.out",
        });
      }

      // Animate the slider
      t1.from(sliderRef.current, {
        y: 500,
        duration: 2,
        ease: "back.out(1.7)",
      });

      // Animate dots
      t1.from(dots, {
        scale: 0,
        duration: 0.1,
        stagger: 0.2,
      });

      // Animate the banner image
      t1.from(bannerImgRef.current, {
        scale: 0,
        duration: 2.5,
        ease: "bounce.out",
      });
    }
  }, [animation]); // Empty dependency array ensures it runs once after mount

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < sliderPictureArray.length - 1) {
        var p = index + 1;

        setIndex(p);
      } else {
        setIndex(0);
      }
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (newIndex < sliderArrayMobile.length - 1) {
        var p = newIndex + 1;

        setNewIndex(p);
      } else {
        setNewIndex(0);
      }
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [newIndex]);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white sm:bg-[rgb(245,245,245)]">
      <div className="w-full sm:h-auto h-[0px] opacity-0 sm:opacity-100 py-3 px-5 md:px-7 flex flex-wrap gap-2 items-center justify-between bg-white sm:bg-[rgb(245,245,245)]">
        <div>
          <ul
            ref={topLiRef}
            className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)] font-medium"
          >
            <li>
              <NavLink to="/movies" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Movies</NavLink>
            </li>
            <li>
              <NavLink to="/streams" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Streams</NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Events</NavLink>
            </li>
            <li>
              <NavLink to="/plays" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Plays</NavLink>
            </li>
            <li>
              <NavLink to="/sports" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Sports</NavLink>
            </li>
            <li>
              <NavLink to="/activities" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Activities</NavLink>
            </li>
          </ul>
        </div>

        {(!user || user?.accountType === "Viewer") && (
          <div>
            <ul
              ref={topLiRightRef}
              className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)] font-medium"
            >
              <li>
                <NavLink to="/listyourshow" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>ListYourShow</NavLink>
              </li>
              <li>
                <NavLink to="/offers" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Offers</NavLink>
              </li>
              <li>
                <NavLink to="/giftcards" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Gift Cards</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/book/transactions" className={({ isActive }) => isActive ? "text-rose-500 font-bold" : "hover:text-rose-500 transition-all"}>Transactions</NavLink>
                </li>
              )}
            </ul>
          </div>
        )}

        {user?.accountType === "Admin" && (
          <div>
            <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
              <li>
                <NavLink to="/cinema/addCinema">Add Cinema</NavLink>
              </li>
              <li>
                <NavLink to="/cinema/adminCinemas">Update Screen</NavLink>
              </li>
              <li>
                <NavLink to="/show/liveYourShow">Live Show</NavLink>
              </li>
            </ul>
          </div>
        )}

        {user?.accountType === "SuperAdmin" && (
          <div>
            <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
              <li>
                <NavLink to="/movie/addMovie">Add Movie</NavLink>
              </li>
              <li>
                <NavLink to="/addCity">Add City</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
      {isShow && (
        <div className="w-full mt-0  relative sm:py-3  md:py-4 sm:bg-[rgb(235,235,235)] overflow-hidden overflow-y-hidden">
          <div
            ref={sliderRef}
            className="sm:w-full sm:opacity-100 opacity-0 sm:h-full h-[0] w-[600px]  flex items-center justify-center overflow-hidden overflow-y-hidden gap-4"
          >
            {index === 0 ? (
              <img
                src={sliderPictureArray[3].img}
                className="w-full h-full sm:rounded-lg sm:opacity-100 opacity-0"
              />
            ) : (
              <img
                src={sliderPictureArray[index - 1].img}
                className="w-full h-full sm:rounded-lg sm:opacity-100 opacity-0"
              />
            )}
            <img
              src={sliderPictureArray[index].img}
              className="w-full h-full sm:rounded-lg sm:opacity-100 opacity-0"
            />
            {index === 3 ? (
              <img
                src={sliderPictureArray[0].img}
                className="w-full h-full sm:rounded-lg sm:opacity-100 opacity-0"
              />
            ) : (
              <img
                src={sliderPictureArray[index + 1].img}
                className="w-full h-full sm:rounded-lg sm:opacity-100 opacity-0"
              />
            )}
          </div>

          <div className="sm:opacity-0 opacity-100 h-auto sm:h-[0]  flex items-center justify-center overflow-hidden overflow-y-hidden gap-4">
            <img
              src={sliderArrayMobile[newIndex].img}
              className="w-full h-full sm:rounded-lg"
            />
          </div>

          <div
            ref={dotRef}
            className="w-full h-[15px] absolute bottom-5 flex items-center justify-center gap-2"
          >
            {sliderPictureArray.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`w-[8px] h-[8px] bg-gray-500 rounded-full ${
                  index === dotIndex
                    ? "w-[12px] h-[12px] bg-white rounded-full"
                    : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}

      {isShow && (
        <div className="sm:w-full sm:h-max w-full flex items-center justify-center sm:mt-5 sm:pt-0 pt-3 ">
          <img
            ref={bannerImgRef}
            src={bannerImgTwo}
            className="sm:w-[80%] sm:h-max w-[330px] h-[60px]"
          ></img>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
