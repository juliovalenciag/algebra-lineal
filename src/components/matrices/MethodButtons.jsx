import React from 'react';
import { Button } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';
import gaussJordanIcon from '../../assets/img/gj1.png';
import determinanteIcon from '../../assets/img/determinante.png';
import inversaIcon from '../../assets/img/inversa.png';

const MethodButtons = () => {
    const { solveGaussJordan, calculateDeterminant, calculateInverse } = useMatrix();

    return (
        <div className="flex flex-col items-center lg:items-start space-y-4 p-6 rounded-lg shadow-lg bg-white dark:bg-dark-foreground">
            <Button
                onClick={solveGaussJordan}
                className='w-full flex items-center justify-start space-x-4 bg-primary dark:bg-secondary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-4 rounded-md w-full'
            >
                <img src={gaussJordanIcon} alt="Gauss-Jordan" className='w-12 h-12' />
                <span>Gauss-Jordan</span>
            </Button>
            <Button
                onClick={calculateDeterminant}
                className='flex items-center justify-center lg:justify-start space-x-4 bg-primary dark:bg-secondary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={determinanteIcon} alt="Determinante" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden sm:inline lg:inline text-sm lg:text-base'>Determinante</span>
            </Button>
            <Button
                onClick={calculateInverse}
                className='flex items-center justify-center lg:justify-start space-x-4 bg-primary dark:bg-secondary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md w-full'
            >
                <img src={inversaIcon} alt="Inversa" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden sm:inline lg:inline text-sm lg:text-base'>Inversa</span>
            </Button>
        </div>
    );
};

export default MethodButtons;
