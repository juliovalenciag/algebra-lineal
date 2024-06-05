import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MatrixToolbar from '../components/matrices/MatrixToolbar';
import MatrixInput from '../components/matrices/MatrixInput';
import { useMatrix } from '../context/MatrixContext';
import MethodButtons from '../components/matrices/MethodButtons';
import MatrixSizeModal from '../components/matrices/MatrixSizeModal';
import MatrixResults from '../components/matrices/MatrixResults';
import MatrixSolution from '../components/matrices/MatrixSolution';
import ImportFileModal from '../components/matrices/ImportFileModal';

const Matrices = () => {
    const { isModalOpen, openModal, closeModal, solveGaussJordan, calculateDeterminant, calculateInverse, resetMatrix, importMatrixFromFile, exportMatrixToFile, exportResultMatrixToFile } = useMatrix();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const handleImport = (matrixData) => {
        importMatrixFromFile(matrixData);
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

    const toggleImportModal = () => {
        setIsImportModalOpen(!isImportModalOpen);
    };

    const handleFileSelect = (content) => {
        const rows = content.trim().split('\n');
        const matrix = rows.map(row => row.split(' ').map(cell => {
            // Convert fraction string to float if needed
            if (cell.includes('/')) {
                const [numerator, denominator] = cell.split('/');
                return parseFloat(numerator) / parseFloat(denominator);
            }
            return parseFloat(cell);
        }));
        handleImport(matrix);
        toggleImportModal();
    };

    return (
        <>
            <Navbar />
            <MatrixToolbar
                onSizeSelect={handleSizeSelect}
                onImport={toggleImportModal}
                onExport={handleExport}
                onReset={handleReset}
                onExportResult={handleExportResult}
            />
            <MatrixSizeModal isOpen={isModalOpen} onClose={closeModal} />
            <ImportFileModal isOpen={isImportModalOpen} onClose={toggleImportModal} onFileSelect={handleFileSelect} />
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
