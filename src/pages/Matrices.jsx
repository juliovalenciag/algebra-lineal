import React from 'react';
import Navbar from '../components/Navbar';
import MatrixToolbar from '../components/matrices/MatrixToolbar';
import MatrixInput from '../components/matrices/MatrixInput';
import { useMatrix } from '../context/MatrixContext';
import MethodButtons from '../components/matrices/MethodButtons';
import MatrixSizeModal from '../components/matrices/MatrixSizeModal';
import MatrixResults from '../components/matrices/MatrixResults';
import MatrixSolution from '../components/matrices/MatrixSolution';

const Matrices = () => {
    const { isModalOpen, openModal, closeModal } = useMatrix();

    const handleImport = () => {
        // Lógica para importar la matriz
    };

    const handleSizeSelect = () => {
        openModal(); // Abrir el modal para seleccionar tamaño
    };

    const handleExport = () => {
        // Lógica para exportar la matriz
    };

    const handleReset = () => {
        // Lógica para reiniciar la matriz
    };

    const handleExportResult = () => {
        // Lógica para exportar el resultado
    };

    const handleGaussJordan = () => {
        solveGaussJordan(); // Resolver usando Gauss-Jordan
    };

    const handleDeterminante = () => {
        // Lógica para calcular el determinante
    };

    const handleInversa = () => {
        // Lógica para calcular la inversa
    };

    return (
        <>
            <Navbar />
            <MatrixToolbar
                onSizeSelect={handleSizeSelect}
                onImport={handleImport}
                onExport={handleExport}
                onReset={handleReset}
                onExportResult={handleExportResult}
            />
            <MatrixSizeModal isOpen={isModalOpen} onClose={closeModal} />
            <div className='container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className='col-span-1'>
                    <MatrixInput />
                </div>
                <div className="col-span-1 lg:col-span-1 flex flex-col items-center justify-start">
                    <MethodButtons
                        onGaussJordan={handleGaussJordan}
                        onDeterminante={handleDeterminante}
                        onInversa={handleInversa}
                    />
                </div>
                <div className="col-span-1 lg:col-span-1 flex flex-col items-center justify-start">
                    <MatrixResults />
                    <MatrixSolution />
                </div>
            </div>
        </>
    );
};

export default Matrices;
