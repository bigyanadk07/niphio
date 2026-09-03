import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { GithubFill } from "akar-icons";

import gdjson from "../json/gd.json";
import sdejson from "../json/sde.json";

interface CaseStudy {
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  technical?: string;
  architecture?: string[];
  challenges?: string;
  learnings?: string;
  limitations?: string[];
  roadmap?: string[];
}

interface ProjectItem {
  title: string;
  genre: string;
  description: string;
  preview: string;
  thumbnail: string;
  engine: string;
  github: string;
  "additional-notes": string;
  "reference-date": string;
  "case-study"?: CaseStudy;
}

interface NavState {
  project: ProjectItem;
  category: string;
  index: number;
}

const formatTitleForUrl = (title: string) =>
  title.trim().toLowerCase().replace(/\s+/g, "-");

// Fallback lookup for direct links / refreshes, where router state is gone.
const findBySlug = (slug: string): NavState | null => {
  const sdeMatch = sdejson.findIndex(
    (p) => formatTitleForUrl(p.title) === slug,
  );

  if (sdeMatch !== -1) {
    return {
      project: sdejson[sdeMatch],
      category: "SDE",
      index: sdeMatch + 1,
    };
  }

  const gdMatch = gdjson.findIndex(
    (p) => formatTitleForUrl(p.title) === slug,
  );

  if (gdMatch !== -1) {
    return {
      project: gdjson[gdMatch],
      category: "GD",
      index: gdMatch + 1,
    };
  }

  return null;
};

const Section: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <section className="border-t border-[#1B1B18]/10 pt-8 md:pt-10">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 md:gap-10">
        <div>
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#8C897F]">
            {label}
          </span>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
};

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as NavState | null;
  const resolved = state ?? (slug ? findBySlug(slug) : null);

  if (!resolved) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-4">
        <p className="text-[#1B1B18]">Project not found.</p>

        <button
          onClick={() => navigate("/projects")}
          className="font-mono text-sm text-[#5B6B4F] underline"
        >
          Back to projects
        </button>
      </div>
    );
  }

  const { project, category, index } = resolved;
  const paddedIndex = String(index).padStart(2, "0");
  const caseStudy = project["case-study"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eaf2d7]">
      {/* Large background project number */}
      <span className="absolute top-6 right-8 md:top-10 md:right-16 font-sans font-bold text-[100px] md:text-[160px] leading-none text-[#1B1B18] opacity-[0.04] select-none pointer-events-none">
        {paddedIndex}
      </span>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-xs tracking-[0.1em] text-black hover:text-[#1B1B18] duration-300 mb-10 cursor-pointer hover:-translate-x-2"
        >
          ← Back
        </button>

        {/* =========================================================
            HERO
        ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            {/* Category */}
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-[#E4E1D8]" />

              <div className="font-mono text-xs tracking-[0.15em] text-[#8C897F] leading-relaxed">
                <div>
                  {category} / {paddedIndex}
                </div>

                <div className="uppercase">{project.genre}</div>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-sans font-bold tracking-tight text-5xl md:text-6xl text-[#1B1B18] leading-[1.05] mb-10">
              {project.title}
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-base md:text-lg text-[#1B1B18]/80 leading-relaxed mb-10 max-w-xl">
                {project.description}
              </p>
            )}

            {/* Metadata */}
            <div className="border-t border-[#E4E1D8] max-w-xl">
              {project.engine && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-[#E4E1D8]">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#8C897F]">
                    Engine / Stack
                  </span>

                  <span className="text-sm text-[#1B1B18] sm:text-right">
                    {project.engine}
                  </span>
                </div>
              )}

              {project["reference-date"] && (
                <div className="flex items-center justify-between py-4 border-b border-[#E4E1D8]">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#8C897F]">
                    Date
                  </span>

                  <span className="text-sm text-[#1B1B18]">
                    {project["reference-date"]}
                  </span>
                </div>
              )}

              {project["additional-notes"] && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-[#E4E1D8]">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#8C897F]">
                    Notes
                  </span>

                  <span className="text-sm text-[#1B1B18] sm:text-right">
                    {project["additional-notes"]}
                  </span>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-10">
              {project.github?.trim() && (
                <a
                  href={project.github.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B1B18] text-[#FAF9F6] font-mono text-sm tracking-wide transition-colors duration-300 hover:bg-[#5B6B4F]"
                >
                  <GithubFill
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  View on GitHub
                </a>
              )}

              {project.preview?.trim() && (
                <a
                  href={project.preview.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1B1B18] text-[#1B1B18] font-mono text-sm tracking-wide transition-colors duration-300 hover:bg-[#1B1B18] hover:text-[#FAF9F6]"
                >
                  View Preview →
                </a>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="w-full aspect-[4/5] bg-[#EFEDE6] overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* =========================================================
            CASE STUDY
        ========================================================== */}
        {caseStudy && (
          <div className="mt-24 md:mt-32 space-y-16 md:space-y-20">
            {/* Overview */}
            {caseStudy.overview && (
              <Section label="Overview">
                <p className="text-lg md:text-xl text-[#1B1B18] leading-relaxed max-w-3xl">
                  {caseStudy.overview}
                </p>
              </Section>
            )}

            {/* Problem */}
            {caseStudy.problem && (
              <Section label="The Problem">
                <p className="text-base md:text-lg text-[#1B1B18]/75 leading-relaxed max-w-3xl">
                  {caseStudy.problem}
                </p>
              </Section>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <Section label="The Solution">
                <p className="text-base md:text-lg text-[#1B1B18]/75 leading-relaxed max-w-3xl">
                  {caseStudy.solution}
                </p>
              </Section>
            )}

            {/* Features */}
            {caseStudy.features && caseStudy.features.length > 0 && (
              <Section label="Key Features">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {caseStudy.features.map((feature, featureIndex) => (
                    <div
                      key={`${feature}-${featureIndex}`}
                      className="flex gap-4 py-4 border-b border-[#1B1B18]/10"
                    >
                      <span className="font-mono text-xs text-[#8C897F] pt-1">
                        {String(featureIndex + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm md:text-base text-[#1B1B18]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Architecture */}
            {caseStudy.architecture &&
              caseStudy.architecture.length > 0 && (
                <Section label="How It Works">
                  <div className="max-w-3xl">
                    {caseStudy.architecture.map((step, stepIndex) => (
                      <React.Fragment key={`${step}-${stepIndex}`}>
                        <div className="flex items-center gap-5 py-3">
                          <span className="font-mono text-xs text-[#8C897F] w-6">
                            {String(stepIndex + 1).padStart(2, "0")}
                          </span>

                          <span className="text-base md:text-lg text-[#1B1B18]">
                            {step}
                          </span>
                        </div>

                        {stepIndex !== caseStudy.architecture!.length - 1 && (
                          <div className="ml-[11px] h-5 border-l border-[#1B1B18]/15" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </Section>
              )}

            {/* Technical */}
            {caseStudy.technical && (
              <Section label="Technical Implementation">
                <p className="text-base md:text-lg text-[#1B1B18]/75 leading-relaxed max-w-3xl">
                  {caseStudy.technical}
                </p>
              </Section>
            )}

            {/* Challenges */}
            {caseStudy.challenges && (
              <Section label="Challenges">
                <p className="text-base md:text-lg text-[#1B1B18]/75 leading-relaxed max-w-3xl">
                  {caseStudy.challenges}
                </p>
              </Section>
            )}

            {/* Learnings */}
            {caseStudy.learnings && (
              <Section label="What I Learned">
                <p className="text-base md:text-lg text-[#1B1B18]/75 leading-relaxed max-w-3xl">
                  {caseStudy.learnings}
                </p>
              </Section>
            )}

            {/* Limitations */}
            {caseStudy.limitations &&
              caseStudy.limitations.length > 0 && (
                <Section label="Current Limitations">
                  <ul className="max-w-3xl space-y-3">
                    {caseStudy.limitations.map((limitation, limitationIndex) => (
                      <li
                        key={`${limitation}-${limitationIndex}`}
                        className="flex gap-4 text-base text-[#1B1B18]/75 leading-relaxed"
                      >
                        <span className="text-[#8C897F]">—</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

            {/* Roadmap */}
            {caseStudy.roadmap && caseStudy.roadmap.length > 0 && (
              <Section label="Future Direction">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {caseStudy.roadmap.map((item, roadmapIndex) => (
                    <div
                      key={`${item}-${roadmapIndex}`}
                      className="py-4 border-b border-[#1B1B18]/10 text-sm md:text-base text-[#1B1B18]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}

        {/* =========================================================
            FOOTER ACTION
        ========================================================== */}
        {project.github?.trim() && (
          <div className="mt-24 md:mt-32 pt-10 border-t border-[#1B1B18]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#8C897F]">
                Source
              </span>

              <p className="text-lg text-[#1B1B18] mt-2">
                Explore the implementation on GitHub.
              </p>
            </div>

            <a
              href={project.github.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-mono text-sm text-[#1B1B18] hover:text-[#5B6B4F] transition-colors"
            >
              <GithubFill size={18} />

              <span>View Repository</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;