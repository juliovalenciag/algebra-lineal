import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold">
        Aquí estará la homepage, por lo mientras denle a matrices en la barra de arriba
      </h1>
    </>
  )
}

export default App
