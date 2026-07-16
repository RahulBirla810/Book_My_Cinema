import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import sliderArray from "../../utils/SliderData";
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active slide
  const [isVideoPlaying, setIsVideoPlaying] = useState(true); // Track video play state
  const swiperRef = useRef(null); // Ref to access Swiper instance

  // Effect to handle autoplay when the slide becomes active
  useEffect(() => {
    const videoIframe = document.querySelector(
      `iframe[data-index="${activeIndex}"]`
    );
    if (videoIframe) {
      // Trigger autoplay when video is active
      const videoSrc = sliderArray[activeIndex].vedioSrc.split("?")[0];
      videoIframe.src = `${videoSrc}?${
        isVideoPlaying ? "autoplay=1" : "autoplay=0"
      }&controls=0&modestbranding=1&rel=0&showinfo=0`;
    }
  }, [activeIndex, isVideoPlaying]);

  // Function to toggle play/pause on video click
  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying); // Toggle play/pause state
  };

  return (
    <div
      style={{ position: "relative", width: "100vw", margin: "0 auto" }}
      className="bg-[rgb(0,0,0)] sm:h-[90vh] flex items-center justify-center"
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        allowTouchMove={false} // Disable swipe by mouse/touch
        coverflowEffect={{
          slideShadows: true,
        }}
        pagination={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Set Swiper instance to ref
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {sliderArray.map((element, index) => (
          <SwiperSlide key={index}>
            {activeIndex === index ? (
              <div onClick={handleVideoClick}>
                <iframe
                  data-index={index} // Custom attribute to identify the video iframe
                  className="w-[300px] h-[300px]"
                  src={`${element.vedioSrc}?${
                    isVideoPlaying ? "autoplay=0" : "autoplay=0"
                  }&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    pointerEvents: "none", // Prevent hover interactions
                  }}
                ></iframe>
              </div>
            ) : (
              <img
                src={element.img} // Using the image from sliderArray
                alt={`Slide ${index + 1}`}
                className="w-[250px] h-full object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left and Right Buttons (Always visible) */}
      <button
        onClick={() => swiperRef.current.slidePrev()} // Move to previous slide
        style={{
          left: "10%",
          zIndex: "999",
          backgroundColor: "rgb(153,153,153)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
        className="sm:top-[50%] absolute top-[46%]"
      >
        &lt;
      </button>
      <button
        onClick={() => swiperRef.current.slideNext()} // Move to next slide
        style={{
          position: "absolute",
          top: "50%",
          right: "10%",
          zIndex: "999",
          transform: "translateY(-50%)",
          backgroundColor: "rgb(153,153,153)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        &gt;
      </button>
    </div>
  );
}
