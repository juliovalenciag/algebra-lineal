import React from 'react';
import cambiarIcon from '../../assets/img/cambiar.png';
import importarIcon from '../../assets/img/importar.png';
import exportarIcon from '../../assets/img/exportar.png';
import reiniciarIcon from '../../assets/img/limpiar.png';
import exportarResultadoIcon from '../../assets/img/exportarSalida.png';

const MatrixToolbar = ({ onSizeSelect, onImport, onExport, onReset, onExportResult }) => {
    return (
        <div className='flex flex-wrap justify-center lg:justify-start space-x-2 space-y-2 lg:space-y-0 p-4 shadow-md bg-white dark:bg-dark-foreground '>

            <button onClick={onImport} className='flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-2 bg-primary  hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={importarIcon} alt="Importar" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden lg:inline text-sm lg:text-base'>Importar</span>
            </button>
            <button onClick={onSizeSelect} className='flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-2 bg-primary  hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={cambiarIcon} alt="Seleccionar tamaño" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden lg:inline text-sm lg:text-base'>Seleccionar tamaño</span>
            </button>
            <button onClick={onExport} className='flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-2 bg-primary  hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={exportarIcon} alt="Exportar" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden lg:inline text-sm lg:text-base'>Exportar</span>
            </button>
            <button onClick={onReset} className='flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-2 bg-primary hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={reiniciarIcon} alt="Reiniciar" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden lg:inline text-sm lg:text-base'>Reiniciar</span>
            </button>
            <button onClick={onExportResult} className='flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-2 bg-primary  hover:bg-primary-dark dark:hover:bg-secondary-dark text-white p-2 lg:p-4 rounded-md'>
                <img src={exportarResultadoIcon} alt="Exportar resultado" className='w-10 h-10 lg:w-12 lg:h-12' style={{ minWidth: '40px', minHeight: '40px' }} />
                <span className='hidden lg:inline text-sm lg:text-base'>Exportar resultado</span>
            </button>
        </div>
    );
};

export default MatrixToolbar;
