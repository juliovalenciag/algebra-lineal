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
import OnScreenKeyboard from '../components/matrices/OnScreenKeyboard';

const Matrices = () => {
    const {
        isModalOpen, openModal, closeModal, solveGaussJordan,
        calculateDeterminant, calculateInverse, resetMatrix,
        importMatrixFromFile, exportMatrixToFile, exportResultMatrixToFile,
        matrix, matrixSize, setMatrix
    } = useMatrix();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [activeCell, setActiveCell] = useState(null);

    const handleImport = (matrixData) => {
        resetMatrix();
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
            if (cell.includes('/')) {
                const [numerator, denominator] = cell.split('/');
                return parseFloat(numerator) / parseFloat(denominator);
            }
            return parseFloat(cell);
        }));
        importMatrixFromFile(matrix);
        toggleImportModal();
    };

    const handleKeyPress = (key) => {
        if (activeCell) {
            const { rowIndex, colIndex } = activeCell;
            let newValue = matrix[rowIndex][colIndex] + key;
            if (key === 'sin' || key === 'cos' || key === 'tan' || key === 'cot' || key === 'sec' || key === 'csc' || key === 'sinh' || key === 'cosh' || key === 'tanh' || key === 'coth' || key === 'sech' || key === 'csch') {
                newValue = `${key}(`;
            }
            const newMatrix = matrix.map((row, i) =>
                row.map((val, j) => (i === rowIndex && j === colIndex ? newValue : val))
            );
            setMatrix(newMatrix);
        }
    };

    const handleTab = () => {
        if (activeCell) {
            const { rowIndex, colIndex } = activeCell;
            const newColIndex = colIndex + 1 < matrixSize.columns ? colIndex + 1 : 0;
            const newRowIndex = newColIndex === 0 ? (rowIndex + 1) % matrixSize.rows : rowIndex;
            setActiveCell({ rowIndex: newRowIndex, colIndex: newColIndex });
            document.querySelector(`#matrix-cell-${newRowIndex}-${newColIndex}`).focus();
        }
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
                <div className='col-span-12 lg:col-span-5 flex flex-col items-center justify-center p-4'>
                    {showKeyboard && <OnScreenKeyboard onKeyPress={handleKeyPress} onClose={() => setShowKeyboard(false)} />}
                    <MatrixInput onShowKeyboard={() => setShowKeyboard(true)} setActiveCell={setActiveCell} activeCell={activeCell} onTab={handleTab} />
                </div>
                <div className="col-span-12 lg:col-span-2 flex flex-col items-center justify-center text-white p-4">
                    <MethodButtons
                        onGaussJordan={solveGaussJordan}
                        onDeterminante={calculateDeterminant}
                        onInversa={calculateInverse}
                    />
                </div>
                <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-start p-4 space-y-4">
                    <MatrixSolution />
                    <MatrixResults />
                </div>
            </div>
        </>
    );
};

export default Matrices;
