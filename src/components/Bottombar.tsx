import React from 'react'
import {GithubFill, LinkedinBoxFill, TwitterFill } from 'akar-icons'

const Bottombar:React.FC = () => {
  return (
    <div className='flex list-none gap-20 justify-center items-center p-10  mx-20'>
        <a href="https://www.linkedin.com/in/bigyanadk" target="_blank" className='hover:scale-105 hover:transition duration-300 cursor-pointer'><LinkedinBoxFill/></a>
        <a href="https://github.com/bigyanadk07/" target="_blank"className='hover:scale-105 hover:transition duration-300 cursor-pointer'><GithubFill/></a>
        <a href="https://x.com/Bigyanadk" target="_blank"className='hover:scale-105 hover:transition duration-300 cursor-pointer'><TwitterFill/></a>
    </div>
  )
}

export default Bottombar