export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-400 to-pink-300 rounded-lg shadow-lg p-8 mb-8 flex flex-col items-center text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Inspiring Young Minds</h2>
      <p className="text-lg text-white mb-6 max-w-2xl">At Olivia Kids School, we nurture creativity, curiosity, and confidence in every child. Discover a world of fun learning, engaging activities, and a caring community.</p>
      <a href="/admission" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-blue-100 transition">Apply for Admission</a>
    </section>
  );
}
