import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flushSync } from 'react-dom'

// Json Imports
import gdjson from '../json/gd.json'
import sdejson from '../json/sde.json'

interface ProjectItem {
  title: string
  genre: string
  description: string
  preview: string
  thumbnail: string
  engine: string
  github: string
  'additional-notes': string
  'reference-date': string
}

const formatTitleForUrl = (title: string) =>
  title.trim().toLowerCase().replace(/\s+/g, '-')

// Navigates with a smooth cross-fade when the browser supports the
// View Transitions API, falling back to an instant navigate otherwise.
const navigateWithTransition = (
  navigate: ReturnType<typeof useNavigate>,
  path: string,
  state: unknown
) => {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void
  }
  if (doc.startViewTransition) {
    doc.startViewTransition(() => {
      flushSync(() => navigate(path, { state }))
    })
  } else {
    navigate(path, { state })
  }
}

const toRoman = (num: number): string => {
  const map: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let n = num
  let result = ''
  for (const [value, symbol] of map) {
    while (n >= value) {
      result += symbol
      n -= value
    }
  }
  return result
}

const toCodeIndex = (num: number): string => String(num).padStart(2, '0')

type NumberStyle = 'code' | 'roman'

const ProjectRow: React.FC<{
  eyebrow: string
  category: string
  heading: string
  description: string
  projects: ProjectItem[]
  numberStyle: NumberStyle
}> = ({ eyebrow, category, heading, description, projects, numberStyle }) => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const count = projects.length

  const handleProjectClick = (
    e: React.MouseEvent,
    project: ProjectItem,
    index: number
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
    e.preventDefault()

    const path = `/projects/${formatTitleForUrl(project.title)}`
    navigateWithTransition(navigate, path, {
      project,
      category,
      index: index + 1,
    })
  }

  return (
    <section className="lowercase">
      <div className="mb-6 md:mb-10 max-w-xl ray-olsen">
        <p className="font-mono text-xs tracking-[0.15em] text-gray-400 mb-2">
          {eyebrow}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-black mb-2">
          {heading}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Mobile — stacked list, no hover/sliding (no hover on touch anyway) */}
      <div className="flex flex-col md:hidden">
        {projects.map((project, i) => (
          
          <a  key={project.title}
            href={`/projects/${formatTitleForUrl(project.title)}`}
            onClick={(e) => handleProjectClick(e, project, i)}
            className="flex items-center gap-4 py-5 border-b border-[#E4E1D8] first:border-t"
          >
            <div className="w-20 h-20 shrink-0 overflow-hidden bg-[#EFEDE6]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[11px] text-gray-400">
                {numberStyle === 'roman' ? toRoman(i + 1) : toCodeIndex(i + 1)}
              </span>
              <h3 className="text-base font-medium text-black truncate">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {project.genre}
              </p>
            </div>
            <span className="text-black shrink-0">↗</span>
          </a>
        ))}
      </div>

      {/* Desktop — numbered columns with sliding image on hover */}
      <div
        className="hidden md:grid relative"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        <div
          className="absolute top-0 h-[320px] lg:h-[460px] overflow-hidden transition-all duration-500 ease-out"
          style={{
            width: `${100 / count}%`,
            left: `${active * (100 / count)}%`,
          }}
        >
          <img
            src={projects[active].thumbnail}
            alt={projects[active].title}
            className="w-full h-full object-cover"
          />
        </div>

        {projects.map((project, i) => (
          
            <a key={project.title}
            href={`/projects/${formatTitleForUrl(project.title)}`}
            onMouseEnter={() => setActive(i)}
            onClick={(e) => handleProjectClick(e, project, i)}
            className="relative flex flex-col cursor-pointer h-[420px] lg:h-[560px]"
          >
            <div className="flex items-center justify-center h-[320px] lg:h-[460px]">
              <span
                className={`leading-none select-none transition-colors duration-300 ${
                  numberStyle === 'roman'
                    ? 'font-serif text-[56px] lg:text-[80px]'
                    : 'font-mono text-[40px] lg:text-[56px]'
                }`}
                style={
                  active === i
                    ? { color: 'transparent', WebkitTextStroke: '1.5px white' }
                    : { color: '#111' }
                }
              >
                {numberStyle === 'roman' ? toRoman(i + 1) : toCodeIndex(i + 1)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 lg:pt-5 pl-1 pr-4">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-black truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {project.genre}
                </p>
              </div>
              <span className="text-black shrink-0">↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

const ProjectsShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto space-y-16 md:space-y-28">
        <ProjectRow
          eyebrow="SDE — 01"
          category="SDE"
          heading="Software Development"
          description="Products, tools, and platforms I've designed and built."
          projects={sdejson}
          numberStyle="code"
        />
        <div className="border-t border-gray-100" />
        <ProjectRow
          eyebrow="GD — 02"
          category="GD"
          heading="Game Development"
          description="Worlds and mechanics I've built from the ground up."
          projects={gdjson}
          numberStyle="roman"
        />
      </div>
    </div>
  )
}

export default ProjectsShowcase