// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleClick = () => setToggle(!toggle);

    return (
        <nav className="sticky top-0 z-50 py-4 backdrop-blur-lg bg-primary dark:bg-dark-background border-b dark:border-gray-700">
            <div className='w-full h-[80px] border-b dark:border-gray-700'>
                <div className='md:max-w-[1480px] max-w-[600px] mx-auto w-full h-full flex justify-between items-center px-4'>
                    <div className='flex items-center'>
                        <h1 className="text-2xl font-bold text-white dark:text-background-light">Álgebra Lineal</h1>
                    </div>
                    <div className='hidden md:flex items-center'>
                        <ul className='flex gap-6'>
                            <li className="text-white dark:text-background-light"><Link to='/'>Inicio</Link></li>
                            <li className="text-white dark:text-background-light"><Link to='/matrices'>Matrices</Link></li>
                            <li className="text-white dark:text-background-light"><Link to='/espacios-vectoriales'>Espacios Vectoriales</Link></li>
                        </ul>
                    </div>
                    <div className='md:flex items-center gap-4'>
                        <button onClick={toggleTheme} className="text-white dark:text-background-light">
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                        <div className='md:hidden' onClick={handleClick}>
                            {toggle ? <IoMdClose className="text-white" size={24} /> : <MdOutlineMenu className="text-white" size={24} />}
                        </div>
                    </div>
                </div>
                <div className={toggle ? 'absolute z-10 p-4 bg-primary dark:bg-dark-background w-full md:hidden border-b dark:border-gray-700' : 'hidden'}>
                    <ul>
                        <li className='p-4 text-white dark:text-background-light hover:bg-primary-dark dark:hover:bg-dark-foreground'><Link to='/'>Inicio</Link></li>
                        <li className='p-4 text-white dark:text-background-light hover:bg-primary-dark dark:hover:bg-dark-foreground'><Link to='/matrices'>Matrices</Link></li>
                        <li className='p-4 text-white dark:text-background-light hover:bg-primary-dark dark:hover:bg-dark-foreground'><Link to='/espacios-vectoriales'>Espacios Vectoriales</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
