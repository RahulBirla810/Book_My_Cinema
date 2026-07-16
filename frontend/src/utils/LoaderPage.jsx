import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import clapBoard from "./clapBoard.png";
import popcornLoaderfour from "./popcornLoader4.png";
import "../App.css";

const LoaderPage = () => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Split text into spans
    const textElement = titleRef.current;
    const text = textElement.innerHTML;
    const array = text.split("");
    const clutter = array.map((char) => `<span>${char}</span>`).join("");
    textElement.innerHTML = clutter;

    // GSAP Animations
    const t1 = gsap.timeline();

    // Image Animation
    t1.from(imageRef.current, {
      scale: 0,
      duration: 1,
      yoyo: true,
    });

    // Text Animation for spans
    const spans = textElement.querySelectorAll("span");
    t1.from("h1 span", {
      y: 100, // Increase Y value for noticeable movement
      opacity: 0,
      duration: 0.1,
      stagger: 0.1, // Adds stagger effect
      ease: "power2.out", // Smooth animation
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white flex-col items-center justify-center flex">
      <img
        ref={imageRef}
        src={popcornLoaderfour}
        className="w-[200px] h-[150px]"
        alt="Clap Board"
      />
      <div className="w-full h-[30px] overflow-hidden flex items-center justify-center">
        <h1
          id="title"
          ref={titleRef}
          className="uppercase font-sans font-[400] text-[20px] siteTitle"
        >
          𝖇𝖔𝖔𝖐 𝖒𝖞 𝖈𝖎𝖓𝖊𝖒𝖆
        </h1>
      </div>
    </div>
  );
};

export default LoaderPage;
