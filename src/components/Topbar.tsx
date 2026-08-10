import React from 'react'
import { Link } from 'react-router-dom'

const Topbar: React.FC = () => {
  return (
    <div className="flex justify-center items-center px-6 md:px-10 py-5 ray-olsen">
      <Link
        to="/"
        className="group flex items-center gap-3 lowercase"
        aria-label="Go to home"
      >
        <span className="ray-olsen text-lg text-[#1B1B18] transition-opacity duration-300 group-hover:opacity-60">
          Bigyan Adhikari
        </span>
      </Link>
    </div>
  )
}

export default Topbar