import React from "react";
import planToday from "../../utils/planToday.jpeg";
import planTommorow from "../../utils/planTommorow.jpeg";
import weekendPlan from "../../utils/weekendPlan.jpeg";

const EventComponent = () => {
  return (
    <div className="sm:h-[0] overflow-hidden w-full h-max pl-2 pr-2 flex flex-col items-start justify-center mb-3">
      <p className="text-[24px] font-[700]">BEST EVENTS THIS WEEK</p>
      <p className="text-[14px] font-normal">
        Monday To Sunday, we got you covered
      </p>
      <div className="flex items-center w-full justify-center gap-2 mt-5 mb-5">
        <img className="w-[110px] h-[110px] rounded-md" src={planToday}></img>
        <img
          className="w-[110px] h-[110px] rounded-md"
          src={planTommorow}
        ></img>
        <img className="w-[110px] h-[110px] rounded-md" src={weekendPlan}></img>
      </div>
    </div>
  );
};

export default EventComponent;
