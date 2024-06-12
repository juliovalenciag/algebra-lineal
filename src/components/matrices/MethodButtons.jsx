import React from 'react';
import { Button } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';
import gaussJordanIcon from '../../assets/img/gj1.png';
import determinanteIcon from '../../assets/img/determinante.png';
import inversaIcon from '../../assets/img/inversa.png';
import systemIcon from '../../assets/img/AXB.png'; // Icono para el sistema lineal

const MethodButtons = () => {
    const { solveGaussJordan, calculateDeterminant, calculateInverse, solveLinearSystem } = useMatrix();

    return (
        <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4 p-6 rounded-lg shadow-lg bg-white dark:bg-dark-foreground">
            <Button
                onClick={solveGaussJordan}
                className='flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={gaussJordanIcon} alt="Gauss-Jordan" className='w-12 h-12' />
                <span className='hidden lg:inline text-sm lg:text-base'>Gauss-Jordan</span>
            </Button>
            <Button
                onClick={calculateDeterminant}
                className='flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={determinanteIcon} alt="Determinante" className='w-12 h-12' />
                <span className='hidden lg:inline text-sm lg:text-base'>Determinante</span>
            </Button>
            <Button
                onClick={calculateInverse}
                className='flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={inversaIcon} alt="Inversa" className='w-12 h-12' />
                <span className='hidden lg:inline text-sm lg:text-base'>Inversa</span>
            </Button>
            <Button
                onClick={solveLinearSystem}
                className='flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={systemIcon} alt="Sistema Lineal" className='w-12 h-12' />
                <span className='hidden lg:inline text-sm lg:text-base'>Ax=B</span>
            </Button>
        </div>
    );
};

export default MethodButtons;
