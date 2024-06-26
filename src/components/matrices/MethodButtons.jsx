import React from 'react';
import { Button } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';
import gaussJordanIcon from '../../assets/img/gj1.png';
import determinanteIcon from '../../assets/img/determinante.png';
import inversaIcon from '../../assets/img/inversa.png';
import systemIcon from '../../assets/img/AXB.png';

const MethodButtons = () => {
    const { solveGaussJordan, calculateDeterminant, calculateInverse, solveLinearSystem } = useMatrix();

    return (
        <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-2 lg:gap-4 p-6 rounded-lg shadow-lg bg-white dark:bg-dark-foreground">
            <Button
                onClick={solveGaussJordan}
                className='flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full max-w-xs'
            >
                <img src={gaussJordanIcon} alt="Gauss-Jordan" className='w-10 h-10 lg:w-12 lg:h-12' />
            </Button>
            <Button
                onClick={calculateDeterminant}
                className='flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full max-w-xs'
            >
                <img src={determinanteIcon} alt="Determinante" className='w-10 h-10 lg:w-12 lg:h-12' />
            </Button>
            <Button
                onClick={calculateInverse}
                className='flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full max-w-xs'
            >
                <img src={inversaIcon} alt="Inversa" className='w-10 h-10 lg:w-12 lg:h-12' />
                
            </Button>
            <Button
                onClick={solveLinearSystem}
                className='flex items-center justify-center lg:justify-start space-x-2 lg:space-x-4 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full max-w-xs'
            >
                <img src={systemIcon} alt="Sistema Lineal" className='w-10 h-10 lg:w-12 lg:h-12' />
                
            </Button>
        </div>
    );
};

export default MethodButtons;
