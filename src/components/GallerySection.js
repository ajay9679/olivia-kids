
"use client"
const galleryImages = [
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_9579_KZfqvUl5N.JPG?updatedAt=1758603288605",
    alt: "Children playing with building blocks",
    title: "Building Blocks",
    tall: false,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/526634364_1271672948083798_8576527772171332175_n_eX0OIjbPKt.jpg?updatedAt=1758604335550",
    alt: "Kids drawing with crayons",
    title: "Creative Drawing",
    tall: true,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_9593_SRp5FkCGG.JPG?updatedAt=1758603286546",
    alt: "Children in classroom raising hands",
    title: "Classroom Participation",
    tall: false,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_9593_SRp5FkCGG.JPG?updatedAt=1758603286546",
    alt: "Kids playing soccer",
    title: "Soccer Time",
    tall: true,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/526836783_1271672721417154_8919529957979989203_n_5cjZyqvaOI.jpg?updatedAt=1758604335369",
    alt: "Children doing crafts",
    title: "Crafts Session",
    tall: false,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_3802_vpORpaaWs.JPG?updatedAt=1758604616834",
    alt: "Kids reading outdoors",
    title: "Outdoor Reading",
    tall: true,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_1860_ivVp8HPaN.JPG?updatedAt=1758603771945",
    alt: "Kids painting in art class",
    title: "Art Class Inspiration",
    tall: false,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_20250805_113710508_HDR_PORTRAIT_Fv3ed24tq.jpg?updatedAt=1758604505444",
    alt: "Children running on sports field",
    title: "Sports Day Fun",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    alt: "Kids doing science experiment",
    title: "Science Project",
    tall: false,
  },
  {
    src: "https://ik.imagekit.io/ekleesk3b0h/olivia-kids/IMG_6429_SYCk2kVdn.JPG?updatedAt=1758603944204",
    alt: "Children playing music instruments",
    title: "Music Performance",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    alt: "Group of friends smiling outdoors",
    title: "Friendship & Smiles",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    alt: "Kids reading books together",
    title: "Reading Time",
    tall: true,
  },
];

import Image from "next/image";
import React, { useState } from "react";

export default function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = (e) => {
    e.stopPropagation();
    setLightboxIdx((idx) => (idx === 0 ? galleryImages.length - 1 : idx - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setLightboxIdx((idx) => (idx === galleryImages.length - 1 ? 0 : idx + 1));
  };

  return (
    <section className="w-full my-12">
  <h3 className="text-2xl font-extrabold text-pink-600 mb-8 text-center tracking-tight drop-shadow">Gallery</h3>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className="relative mb-4 break-inside-avoid rounded-xl overflow-hidden group shadow-lg cursor-pointer"
            style={{ height: img.tall ? '320px' : '200px' }}
            onClick={() => openLightbox(idx)}
          >
            
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={img.tall ? 320 : 200}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ minHeight: '100%', maxHeight: '100%' }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-lg font-semibold drop-shadow-lg">{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadein"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-8 text-white text-4xl font-bold bg-black/40 rounded-full px-3 py-1 hover:bg-black/70 transition"
            aria-label="Close"
          >
            &times;
          </button>
          <button
            onClick={prevImg}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/40 rounded-full px-3 py-1 hover:bg-black/70 transition"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <div className="max-w-3xl w-full flex flex-col items-center">
            <Image
              src={galleryImages[lightboxIdx].src}
              alt={galleryImages[lightboxIdx].alt}
              className="rounded-xl shadow-2xl w-full max-h-[70vh] object-contain"
            />
            <div className="mt-4 text-white text-xl font-semibold text-center drop-shadow-lg">
              {galleryImages[lightboxIdx].title}
            </div>
          </div>
          <button
            onClick={nextImg}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/40 rounded-full px-3 py-1 hover:bg-black/70 transition"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}
