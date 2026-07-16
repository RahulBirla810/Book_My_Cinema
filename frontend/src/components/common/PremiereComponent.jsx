import React from "react";
import playImg from "../../utils/play.jpg";
import premiereArray from "../../utils/PremiereData";
import PremiereSlider from "./PremiereSlider";

const PremiereComponent = () => {
  return (
    <div className="w-full sm:min-h-[100vh] min-h-[80vh] bg-[rgb(43,49,73)] flex items-center justify-center">
      <div className="flex flex-col w-[90%] min-h-[90%]">
        <div>
          <img className="sm:mb-10 sm:w-auto" src={playImg} alt="Play" />
        </div>
        <div className="flex flex-col text-white">
          <h1 className="text-[24px] font-[700]">PREMIERE</h1>
          <h2 className="text-[14px] font-normal">
            Brand new releases every Friday
          </h2>
        </div>
        <div className="flex overflow-hidden">
          <PremiereSlider></PremiereSlider>
        </div>
      </div>
    </div>
  );
};

export default PremiereComponent;
