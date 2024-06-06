import React from 'react'
import logo1 from '../assets/img/logo1.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full bg-white py-24'>
      <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0'>

        <div className='col-span-2'>
          <img src={logo1} className="h-[50px]" />
          <h3 className='text-2xl font-bold mt-10'>Algebra Lineal</h3>
          <h3 className='py-2 text-[#6D737A]'>Alumnos de segundo semestre<br></br>de la materia de algebra lineal.</h3>
          <h3 className='py-2 text-[#363A3D]'>ESCOM - IPN - MX</h3>


        </div>

        <div>
          <h3 className='text-2xl font-bold'>Explora</h3>
          <ul className='py-6 text-[#6D737A]'>
            <li className='py-2'>
              <Link to='/'>Inicio</Link>
            </li>
            <li className='py-2'>
              <Link to='/matrices'>Matrices</Link>
            </li>
            <li className='py-2'>
              <Link to='/espacios-vectoriales'>Espacios vectoriales</Link>
            </li>

          </ul>
        </div>


        <div className='max-[780px]:col-span-2'>
          <h3 className='text-2xl font-bold'>Accede</h3>
          <h3 className='py-2 text-[#6D737A]'>Utiliza la herramienta <br></br> para resolver matrices</h3>
          <form className='py-4'>

            <button className='max-[780px]:w-full my-4 px-5 py-3 rounded-md bg-primary text-white font-medium'>Matrices</button>

          </form>


        </div>

      </div>
    </div>
  )
}

export default Footer