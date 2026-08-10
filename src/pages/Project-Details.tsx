import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { GithubFill } from "akar-icons";

import gdjson from "../json/gd.json";
import sdejson from "../json/sde.json";

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
    return { project: sdejson[sdeMatch], category: "SDE", index: sdeMatch + 1 };
  }
  const gdMatch = gdjson.findIndex((p) => formatTitleForUrl(p.title) === slug);
  if (gdMatch !== -1) {
    return { project: gdjson[gdMatch], category: "GD", index: gdMatch + 1 };
  }
  return null;
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eaf2d7]">
      <span className="absolute top-6 right-8 md:top-10 md:right-16 font-sans font-bold text-[100px] md:text-[160px] leading-none text-[#1B1B18] opacity-[0.04] select-none pointer-events-none">
        {paddedIndex}
      </span>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-xs tracking-[0.1em] text-black hover:text-[#1B1B18] duration-300 mb-10 cursor-pointer hover:-translate-x-2"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-[#E4E1D8]" />
              <div className="font-mono text-xs tracking-[0.15em] text-[#8C897F] leading-relaxed">
                <div>
                  {category} / {paddedIndex}
                </div>
                <div className="uppercase">{project.genre}</div>
              </div>
            </div>

            <h1 className="font-sans font-bold tracking-tight text-5xl md:text-6xl text-[#1B1B18] leading-[1.05] mb-10">
              {project.title}
            </h1>

            {project.description && (
              <p className="text-base md:text-lg text-[#1B1B18]/80 leading-relaxed mb-10 max-w-md">
                {project.description}
              </p>
            )}

            <div className="border-t border-[#E4E1D8] max-w-md">
              {project.engine && (
                <div className="flex items-center justify-between py-4 border-b border-[#E4E1D8]">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#8C897F]">
                    Engine / Stack
                  </span>
                  <span className="text-sm text-[#1B1B18]">
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
                <div className="flex items-center justify-between py-4 border-b border-[#E4E1D8] gap-6">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#8C897F] shrink-0">
                    Notes
                  </span>
                  <span className="text-sm text-[#1B1B18] text-right">
                    {project["additional-notes"]}
                  </span>
                </div>
              )}
            </div>

            {project.github?.trim() && (
              <a
                href={project.github.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 mt-10 px-5 py-2.5 bg-[#1B1B18] text-[#FAF9F6] font-mono text-sm tracking-wide transition-colors duration-300 hover:bg-[#5B6B4F]"
              >
                <GithubFill
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                View on GitHub
              </a>
            )}  
          </div>

          <div className="w-full aspect-[4/5] bg-[#EFEDE6] overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
