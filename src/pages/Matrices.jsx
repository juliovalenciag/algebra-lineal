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
    const { isModalOpen, openModal, closeModal, solveGaussJordan, calculateDeterminant, calculateInverse, resetMatrix, importMatrixFromFile, exportMatrixToFile, exportResultMatrixToFile } = useMatrix();

    const handleImport = (file) => {
        //Logica para importar el archivo en .txt
    };

    const handleSizeSelect = () => {
        openModal();
    };

    const handleExport = () => {
        exportMatrixToFile();
    };

    const handleReset = () => {
        resetMatrix();
    };

    const handleExportResult = () => {
        exportResultMatrixToFile();
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
            <div className='grid grid-cols-12 gap-4 p-4'>
                <div className='col-span-12 lg:col-span-5 flex items-center justify-center  p-4'>
                    <MatrixInput />
                </div>
                <div className="col-span-12 lg:col-span-2 flex flex-col items-center justify-center  text-white p-4">
                    <MethodButtons
                        onGaussJordan={solveGaussJordan}
                        onDeterminante={calculateDeterminant}
                        onInversa={calculateInverse}
                    />
                </div>
                <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-start  p-4 space-y-4">
                    <MatrixSolution />
                    <MatrixResults />
                </div>
            </div>
        </>
    );
};

export default Matrices;
