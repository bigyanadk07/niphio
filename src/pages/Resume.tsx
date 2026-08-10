import React from "react";

const experience = [
  {
    role: "Network Operations Intern",
    org: "Broadlink Network and Communications",
  },
  {
    role: "Backend Developer Intern",
    org: "Wisdom Technologies Pvt. Ltd.",
  },
];

const education = [
  {
    degree: "Bachelor of Science in CSIT",
    org: "Tribhuvan University",
    period: "2021 – 2024",
  },
];

const skills = [
  {
    label: "Frontend",
    stack: "JavaScript, TypeScript (React)",
  },
  {
    label: "Backend",
    stack: "JavaScript (Express/Node), SQL (Mongo/Postgres)",
  },
  {
    label: "Game Dev",
    stack: "GDScript, C# (Godot Engine), C++ (Unreal Engine 4)",
  },
  {
    label: "Scripting",
    stack: "Lua",
  },
];

const Resume: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen ray-olsen">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left column — sticky */}
          <div className="md:sticky md:top-24 self-start">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8C897F] mb-3">
              CV / Background
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1B1B18] mb-6">
              Resume
            </h1>
            
              <a href="/resume.pdf"
              download
              className="group inline-flex items-center gap-3 px-5 py-2.5 bg-[#1B1B18] text-[#FAF9F6] font-mono text-sm tracking-wide transition-colors duration-300 hover:bg-[#5B6B4F]"
            >
              Download PDF
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>

          {/* Right column — content */}
          <div className="space-y-20">
            {/* About */}
            <section>
              <p className="text-lg leading-relaxed text-[#1B1B18]">
                I'm a Software Developer and a Game Developer, as well as an
                enthusiast in Cybersecurity. Having worked in multiple
                organizations in SDE as well as Networking, I aim to further
                my career in the field of Cybersecurity.
              </p>
              <p className="text-lg leading-relaxed text-[#1B1B18] mt-5">
                Currently laying the groundwork for my own software and game
                development studio.
              </p>
              <p className="text-lg leading-relaxed text-[#1B1B18] mt-5">
                I hold a Bachelor of Science in Computer Science and
                Information Technology, focusing on modern software
                development approaches, from Tribhuvan University.
              </p>
            </section>

            {/* Experience */}
            <section>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8C897F] mb-6">
                Experience
              </p>
              <div className="border-t border-[#E4E1D8]">
                {experience.map((item) => (
                  <div
                    key={item.role}
                    className="py-6 border-b border-[#E4E1D8]"
                  >
                    <h3 className="font-serif text-xl text-[#1B1B18]">
                      {item.role}
                    </h3>
                    <p className="text-sm text-[#8C897F] mt-1">{item.org}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8C897F] mb-6">
                Education
              </p>
              <div className="border-t border-[#E4E1D8]">
                {education.map((item) => (
                  <div
                    key={item.degree}
                    className="py-6 border-b border-[#E4E1D8] flex items-baseline justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-serif text-xl text-[#1B1B18]">
                        {item.degree}
                      </h3>
                      <p className="text-sm text-[#8C897F] mt-1">
                        {item.org}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-[#5B6B4F] shrink-0">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8C897F] mb-6">
                Skills &amp; Languages
              </p>
              <div className="border-t border-[#E4E1D8]">
                {skills.map((item) => (
                  <div
                    key={item.label}
                    className="py-5 border-b border-[#E4E1D8] grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-6"
                  >
                    <span className="font-mono text-sm text-[#1B1B18]">
                      {item.label}
                    </span>
                    <span className="text-sm text-[#8C897F]">
                      {item.stack}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;