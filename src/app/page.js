import CarouselSection from "../components/CarouselSection";
import CookieConsent from "../components/CookieConsent";
import GallerySection from "../components/GallerySection";
import ProgramsSection from "../components/ProgramsSection";
import EventsSection from "../components/EventsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Stats from "../components/Stats";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-pink-100 overflow-x-hidden">
      <CookieConsent />
      <Header />
      {/* Full-width Carousel (no overflow) */}
      <div className="w-full">
        <CarouselSection />
      </div>
      {/* Stats Section */}
      <Stats />
      <main className="w-full max-w-5xl mx-auto flex flex-col items-center px-2">
        <div id="gallery" className="w-full"><GallerySection /></div>
        <div id="programs" className="w-full"><ProgramsSection /></div>
        <div id="events" className="w-full"><EventsSection /></div>
        <div id="testimonials" className="w-full"><TestimonialsSection /></div>
        {/* Add admission form or section here if needed */}
      </main>
      <Footer />
    </div>
  );
}
