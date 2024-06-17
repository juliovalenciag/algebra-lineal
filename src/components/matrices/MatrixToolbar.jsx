import React from 'react';
import cambiarIcon from '../../assets/img/cambiar.png';
import importarIcon from '../../assets/img/importar.png';
import exportarIcon from '../../assets/img/exportar.png';
import reiniciarIcon from '../../assets/img/limpiar.png';
import exportarResultadoIcon from '../../assets/img/exportarSalida.png';
import matrizB from '../../assets/img/AXB.png';

const MatrixToolbar = ({ onSizeSelect, onImport, onExport, onReset, onExportResult, onSystemType }) => {
    return (
        <div className='flex flex-row justify-center lg:justify-start gap-2 p-4 shadow-md bg-white dark:bg-dark-foreground overflow-x-auto'>
            <button onClick={onImport} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={importarIcon} alt="Importar" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Importar</span>
            </button>

            <button onClick={onSizeSelect} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={cambiarIcon} alt="Seleccionar tamaño" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Seleccionar tamaño</span>
            </button>

            <button onClick={onExport} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={exportarIcon} alt="Exportar" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Exportar</span>
            </button>

            <button onClick={onReset} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={reiniciarIcon} alt="Reiniciar" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Reiniciar</span>
            </button>

            <button onClick={onExportResult} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={exportarResultadoIcon} alt="Exportar resultado" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Exportar resultado</span>
            </button>

            <button onClick={onSystemType} className='flex items-center justify-center bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={matrizB} alt="Sistema lineal" className='w-10 h-10 lg:w-12 lg:h-12' />
                <span className='hidden lg:inline text-sm lg:text-base ml-2'>Sistema lineal</span>
            </button>
        </div>
    );
};

export default MatrixToolbar;
