const programs = [
  { title: "Art & Craft", desc: "Unleash creativity with hands-on art and craft sessions." },
  { title: "Music & Dance", desc: "Fun music and dance classes to build confidence and rhythm." },
  { title: "STEM Explorers", desc: "Exciting science and math activities for curious minds." },
  { title: "Sports & Fitness", desc: "Physical activities to promote health and teamwork." },
];

export default function ProgramsSection() {
  return (
    <section className="w-full my-8">
  <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Our Programs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {programs.map((p, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <h4 className="font-bold text-pink-600 mb-2">{p.title}</h4>
            <p className="text-gray-700">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
