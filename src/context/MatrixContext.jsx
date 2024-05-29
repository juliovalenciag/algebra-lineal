import React, { createContext, useContext, useState } from 'react';
import { gaussJordan } from '../utils/gaussJordan';

const MatrixContext = createContext();

export const useMatrix = () => useContext(MatrixContext);

export const MatrixProvider = ({ children }) => {
    const [matrixSize, setMatrixSize] = useState({ rows: 3, columns: 4 });
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
    const [resultMatrix, setResultMatrix] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const solveGaussJordan = () => {
        const result = gaussJordan(matrix);
        setResultMatrix(result);
    };

    return (
        <MatrixContext.Provider value={{ matrixSize, setMatrixSize, matrix, setMatrix, resultMatrix, solveGaussJordan, isModalOpen, openModal, closeModal }}>
            {children}
        </MatrixContext.Provider>
    );
};
