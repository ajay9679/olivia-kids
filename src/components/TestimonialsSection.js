"use client";
const testimonials = [
  {
    name: "Aarav's Parent",
    text: "Olivia Kids School has transformed my child's learning experience. The teachers are caring and the activities are so creative!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya's Parent",
    text: "We love the vibrant community and the focus on holistic development. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan's Parent",
    text: "My son looks forward to school every day. The programs are fun and educational!",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Maya's Parent",
    text: "The school environment is so positive and nurturing. My daughter has grown so much in confidence!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];


import Image from "next/image";
import React, { useState } from "react";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
  <section className="w-full my-12 overflow-x-hidden">
      <h3 className="text-2xl font-extrabold text-pink-600 mb-8 text-center tracking-tight drop-shadow">Testimonials</h3>
      <div className="flex flex-col items-center justify-center relative max-w-xl mx-auto">
        <button
          onClick={prev}
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-pink-200 text-pink-600 rounded-full p-2 shadow text-2xl font-bold z-10"
          aria-label="Previous testimonial"
          style={{ minWidth: 40 }}
        >&#8592;</button>
        <div className="bg-white rounded-2xl shadow-xl px-8 py-8 flex flex-col items-center w-full mx-8 sm:mx-0">
          <Image
            width={100} height={100}
            src={testimonials[current].img}
            alt={testimonials[current].name}
            className="w-20 h-20 rounded-full object-cover border-4 border-pink-200 mb-4 shadow"
          />
          <p className="italic text-gray-700 text-lg text-center mb-4">&quot;{testimonials[current].text}&quot;</p>
          <div className="text-pink-700 font-bold text-base text-center">- {testimonials[current].name}</div>
        </div>
        <button
          onClick={next}
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-pink-200 text-pink-600 rounded-full p-2 shadow text-2xl font-bold z-10"
          aria-label="Next testimonial"
          style={{ minWidth: 40 }}
        >&#8594;</button>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-pink-500" : "bg-pink-200"}`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
