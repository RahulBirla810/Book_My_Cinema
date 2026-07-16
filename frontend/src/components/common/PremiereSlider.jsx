import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./premiereSlider.css";
import { Pagination, Navigation } from "swiper/modules";
import premiereArray from "../../utils/PremiereData";

const PremiereSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enable navigation buttons
        modules={[Pagination, Navigation]} // Add Navigation module
        className="mySwiper p-8"
        draggable={true} // Enable mouse drag
        breakpoints={{
          300: {
            width: 200,
            slidesPerView: 1,
          },
          576: {
            width: 200,
            slidesPerView: 3,
          },
          768: {
            width: 200,
            slidesPerView: 1,
          },
        }}
      >
        {premiereArray.map((element, index) => {
          return (
            <SwiperSlide key={index} className="flex flex-col">
              <img
                className="w-[100px] object-cover mb-[4px] rounded-md"
                src={element.img}
                alt={element.name}
              />
              <p className="text-white mb-[4px] text-[18px] font-[500]">
                {element.name}
              </p>
              <p className="text-white text-[16px] font-normal">
                {element.lang}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default PremiereSlider;
