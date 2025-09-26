"use client";

import React from "react";
import useTypewriterCursor from "../hooks/useTypewriterCursor";
import Image from "next/image";


const carouselImages = [
  { src: "/carousel/carousel1.jpg", caption: "Fun at the playground" },
  { src: "/carousel/carousel2.jpg", caption: "Creative classroom moments" },
  { src: "/carousel/carousel3.jpg", caption: "Outdoor learning" },
  { src: "/carousel/carousel4.jpg", caption: "Teamwork and games" },
];


export default function CarouselSection() {
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef();

  // Improved auto-play logic with setInterval
  React.useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % carouselImages.length);
      }, 3500);
    }
    return () => clearInterval(timeoutRef.current);
  }, [isHovered]);

  const prev = () => setCurrent((c) => (c === 0 ? carouselImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === carouselImages.length - 1 ? 0 : c + 1));


  // Typewriter effect for caption, always pass a valid string
  const caption = carouselImages[current]?.caption || "";
  const [typewriterCaption, isTyping] = useTypewriterCursor(caption, 120, 200);

  return (
    <section className="w-full">
      <div
        className="relative w-full aspect-[16/7] flex items-center justify-center overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ minHeight: '320px', maxHeight: '60vh' }}
      >
        {/* Image with fade/slide transition */}
  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent z-10 pointer-events-none" />
        <Image
          width={100} height={100}
          src={carouselImages[current].src}
          alt={carouselImages[current].caption}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{ opacity: 1 }}
        />
    {/* Caption overlay with typewriter effect, no background */}
  <div className="absolute bottom-12 left-0 right-0 mx-auto flex justify-center items-center text-white drop-shadow-lg z-10 text-2xl sm:text-3xl font-bold min-h-[2.5rem] text-center px-2">
          {typewriterCaption}
          <span className={"inline-block w-3 animate-blink" + (isTyping ? "" : " opacity-0")}>|</span>
        </div>
        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-blue-600 hover:text-white text-blue-700 rounded-full p-3 shadow-lg z-10 transition-all duration-200 text-2xl font-bold opacity-80 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-blue-600 hover:text-white text-blue-700 rounded-full p-3 shadow-lg z-10 transition-all duration-200 text-2xl font-bold opacity-80 group-hover:opacity-100"
          aria-label="Next slide"
        >
          &#8594;
        </button>
        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {carouselImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3.5 h-3.5 rounded-full border-2 border-blue-300 transition-all duration-200 ${idx === current ? "bg-blue-500 scale-110 border-blue-700" : "bg-white/70 hover:bg-blue-200"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
