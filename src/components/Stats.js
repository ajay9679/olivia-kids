import AnimatedNumber from "./AnimatedNumber";

export default function Stats() {
  return (
    <section className="w-full flex flex-col items-center py-8 bg-white/80">
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-12 text-center">
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2">
            <AnimatedNumber value={15} suffix="+" />
          </span>
          <span className="text-lg font-semibold text-gray-700">Years of Experience</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2">
            <AnimatedNumber value={2500} suffix="+" />
          </span>
          <span className="text-lg font-semibold text-gray-700">Students</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2">
            <AnimatedNumber value={100} suffix="+" />
          </span>
          <span className="text-lg font-semibold text-gray-700">Events & Activities</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2">
            <AnimatedNumber value={70} suffix="+" />
          </span>
          <span className="text-lg font-semibold text-gray-700">Dedicated Teachers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2">
            <AnimatedNumber value={10} suffix="+" />
          </span>
          <span className="text-lg font-semibold text-gray-700">Prestigious Awards</span>
        </div>
      </div>
    </section>
  );
}
