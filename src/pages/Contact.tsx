import React from 'react'

const Contact: React.FC = () => {
  return (
    <div className="px-4 sm:px-8 md:px-20 py-10 md:py-12 ray-olsen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 md:px-40">
        {/* Left Side */}
        <div className="flex items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Let's Work Together!
          </h2>
        </div>

        {/* Right Side */}
        <div>
          <form className="flex flex-col gap-5 md:gap-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-black">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="border border-black px-4 py-3 outline-none focus:border-black w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-black">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="border border-black px-4 py-3 outline-none focus:border-black w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                className="border border-black px-4 py-3 outline-none focus:border-black w-full"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject">
                Subject <span className="text-red-600">*</span>
              </label>
              <input
                id="subject"
                type="text"
                required
                className="border border-black px-4 py-3 outline-none focus:border-black w-full"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={7}
                className="border border-black px-4 py-3 outline-none resize-none focus:border-black w-full"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full sm:w-fit bg-black text-white px-8 py-3 border border-black transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact