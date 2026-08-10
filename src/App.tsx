// React Imports
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Page Imports
import Home from './pages/Index'
import Projects from './pages/Project'
import Topbar from './components/Topbar'
import Contact from './pages/Contact'
import Bottombar from './components/Bottombar'
import Resume from './pages/Resume'
import ProjectDetails from './pages/Project-Details'

// The main single-scroll landing page (all sections stacked)
const MainPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6]">
      <Topbar/>
      <Home />
      <Projects />
      <Resume />
      <Contact />
      <Bottombar />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-[#FAF9F6]">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App