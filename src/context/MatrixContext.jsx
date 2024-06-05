import React, { createContext, useState, useContext, useEffect } from 'react';
import Fraction from 'fraction.js';

const MatrixContext = createContext();

export const useMatrix = () => useContext(MatrixContext);

export const MatrixProvider = ({ children }) => {
    const [matrixSize, setMatrixSize] = useState({ rows: 3, columns: 4 });
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(4).fill('')));
    const [resultMatrix, setResultMatrix] = useState(null);
    const [solution, setSolution] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setMatrix(prevMatrix => {
            // Solo restablecer la matriz si no tiene datos
            if (prevMatrix.every(row => row.every(cell => cell === ''))) {
                return Array.from({ length: matrixSize.rows }, () => Array(matrixSize.columns).fill(''));
            }
            return prevMatrix;
        });
    }, [matrixSize]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const updateMatrixSize = (rows, columns) => {
        setMatrixSize({ rows, columns });
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill('')));
        setResultMatrix(null);
        setSolution('');
    };

    const importMatrixFromFile = (matrixData) => {
        if (matrixData && matrixData.length > 0) {
            const rows = matrixData.length;
            const columns = matrixData[0].length;
            setMatrixSize({ rows, columns });
            setMatrix(matrixData);
            setResultMatrix(null);
            setSolution('');
        } else {
            console.error('Matrix data is invalid');
        }
    };

    const exportMatrixToFile = () => {
        const element = document.createElement("a");
        const fileContent = matrix.map(row => row.map(cell => cell === '' ? 0 : cell).join(' ')).join('\n');
        const file = new Blob([fileContent], { type: 'text/plain' });
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `matrizEntrada_${timestamp}.txt`;
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const exportResultMatrixToFile = () => {
        if (!resultMatrix) {
            alert('No hay matriz resultante para exportar.');
            return;
        }

        const element = document.createElement("a");
        const fileContent = resultMatrix.map(row => row.map(cell => {
            const fraction = new Fraction(cell);
            return fraction.toFraction(false);
        }).join(' ')).join('\n');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `matrizResultante_${timestamp}.txt`;
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const solveGaussJordan = () => {
        let m = matrix.map(row => row.map(entry => parseFloat(entry) || 0));
        const rows = m.length;
        const columns = m[0].length;

        for (let i = 0; i < Math.min(rows, columns); i++) {
            if (m[i][i] === 0) {
                for (let k = i + 1; k < rows; k++) {
                    if (m[k][i] !== 0) {
                        [m[i], m[k]] = [m[k], m[i]];
                        break;
                    }
                }
            }

            let pivot = m[i][i];
            if (pivot === 0) continue;

            for (let k = 0; k < columns; k++) {
                m[i][k] /= pivot;
            }

            for (let j = 0; j < rows; j++) {
                if (j !== i) {
                    let factor = m[j][i];
                    for (let k = 0; k < columns; k++) {
                        m[j][k] -= factor * m[i][k];
                    }
                }
            }
        }

        setResultMatrix(m);
        displaySolution(m);
    };

    const calculateDeterminant = () => {
        let m = matrix.map(row => row.map(entry => parseFloat(entry) || 0));
        const n = m.length;

        if (m.length !== m[0].length) {
            alert("La matriz debe ser cuadrada para calcular el determinante.");
            return;
        }

        let det = 1;
        for (let i = 0; i < n; i++) {
            if (m[i][i] === 0) {
                let swapRow = -1;
                for (let k = i + 1; k < n; k++) {
                    if (m[k][i] !== 0) {
                        swapRow = k;
                        break;
                    }
                }
                if (swapRow === -1) {
                    det = 0;
                    break;
                }
                [m[i], m[swapRow]] = [m[swapRow], m[i]];
                det *= -1;
            }
            det *= m[i][i];
            for (let j = i + 1; j < n; j++) {
                let factor = m[j][i] / m[i][i];
                for (let k = i; k < n; k++) {
                    m[j][k] -= factor * m[i][k];
                }
            }
        }

        setResultMatrix([[det]]);
        displaySolution([[det]]);
    };

    const calculateInverse = () => {
        let m = matrix.map(row => row.map(entry => parseFloat(entry) || 0));
        const n = m.length;

        if (m.length !== m[0].length) {
            alert("La matriz debe ser cuadrada para calcular la inversa.");
            return;
        }

        let augmentedMatrix = m.map((row, i) => [
            ...row,
            ...row.map((_, j) => (i === j ? 1 : 0))
        ]);

        for (let i = 0; i < n; i++) {
            if (augmentedMatrix[i][i] === 0) {
                let swapRow = -1;
                for (let k = i + 1; k < n; k++) {
                    if (augmentedMatrix[k][i] !== 0) {
                        swapRow = k;
                        break;
                    }
                }
                if (swapRow === -1) {
                    alert("La matriz es singular y no tiene inversa.");
                    return;
                }
                [augmentedMatrix[i], augmentedMatrix[swapRow]] = [augmentedMatrix[swapRow], augmentedMatrix[i]];
            }

            let pivot = augmentedMatrix[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmentedMatrix[i][j] /= pivot;
            }

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    let factor = augmentedMatrix[j][i];
                    for (let k = 0; k < 2 * n; k++) {
                        augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
                    }
                }
            }
        }

        let inverseMatrix = augmentedMatrix.map(row => row.slice(n));
        setResultMatrix(inverseMatrix);
        setSolution('');
    };

    const displaySolution = (matrix) => {
        const rows = matrix.length;
        const columns = matrix[0].length;
        const solution_texts = [];
        let error_message = "";

        const rank = matrix.reduce((acc, row) => acc + (row.slice(0, -1).some(val => val !== 0) ? 1 : 0), 0);
        if (rank < rows) {
            error_message = "El sistema tiene infinitas soluciones debido a las filas cero.\n";
        }

        for (let i = 0; i < rows; i++) {
            if (matrix[i].slice(0, -1).every(val => val === 0)) {
                if (matrix[i][columns - 1] !== 0) {
                    error_message = "Sistema inconsistente. No hay solución.\n";
                    break;
                } else {
                    continue;
                }
            } else {
                let constant = new Fraction(matrix[i][columns - 1]);
                let numerator = constant.s * constant.n;
                let denominator = constant.d;
                let equation;
                if (numerator === 0) {
                    equation = `x<sub>${i + 1}</sub> = 0`;
                } else if (denominator === 1) {
                    equation = `x<sub>${i + 1}</sub> = ${numerator}`;
                } else {
                    equation = `x<sub>${i + 1}</sub> = <span class="fraction"><span class="numerator">${numerator}</span><span class="denominator">${denominator}</span></span>`;
                }
                solution_texts.push(equation);
            }
        }

        if (error_message === "Sistema inconsistente. No hay solución.\n") {
            setSolution(error_message);
            return;
        }

        let solution_text = "{ ( " + Array.from({ length: columns - 1 }, (_, i) => `x<sub>${i + 1}</sub>`).join(", ") + " ) | " + solution_texts.join(", ") + " }";
        setSolution(solution_text);
    };

    const resetMatrix = () => {
        setMatrix(Array.from({ length: matrixSize.rows }, () => Array(matrixSize.columns).fill('')));
        setResultMatrix(null);
        setSolution('');
    };

    return (
        <MatrixContext.Provider value={{
            importMatrixFromFile,
            matrixSize,
            matrix,
            setMatrix,
            resultMatrix,
            solution,
            updateMatrixSize,
            solveGaussJordan,
            calculateDeterminant,
            calculateInverse,
            displaySolution,
            resetMatrix,
            isModalOpen,
            openModal,
            closeModal,
            setMatrixSize,
            exportMatrixToFile,
            exportResultMatrixToFile,
        }}>
            {children}
        </MatrixContext.Provider>
    );
};

export default MatrixProvider;
