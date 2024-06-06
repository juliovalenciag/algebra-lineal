import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import HeroSection from './components/homepage/HeroSection'
import Workflow from './components/homepage/Workflow'
import CTA from './components/homepage/CTA'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto pt-20 px-6'>
        <HeroSection />
        <Workflow />
      </div>
      <CTA />
      <Footer />
    </>
  )
}

export default App
