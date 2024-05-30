import React, { createContext, useState, useContext } from 'react';

const MatrixContext = createContext();

export const useMatrix = () => useContext(MatrixContext);

export const MatrixProvider = ({ children }) => {
    const [matrixSize, setMatrixSize] = useState({ rows: 3, columns: 4 });
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(4).fill(0)));
    const [resultMatrix, setResultMatrix] = useState(null);
    const [solution, setSolution] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const updateMatrixSize = (rows, columns) => {
        setMatrixSize({ rows, columns });
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill(0)));
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
        setSolution('');
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
        setSolution('');
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
        let rows = matrix.length;
        let columns = matrix[0].length;
        let solution_texts = [];
        let error_message = "";

        let rank = matrix.reduce((acc, row) => acc + (row.slice(0, -1).some(val => val !== 0) ? 1 : 0), 0);
        if (rank < rows) {
            error_message = "El sistema tiene infinitas soluciones debido a las filas cero.\n";
        }

        let terminos_sin = [];
        for (let i = 0; i < rows; i++) {
            if (matrix[i].slice(0, -1).every(val => val === 0)) {
                if (matrix[i][columns - 1] !== 0) {
                    error_message = "Sistema inconsistente. No hay solución.\n";
                    break;
                } else {
                    continue;
                }
            } else {
                if (terminos_sin.length <= i) {
                    terminos_sin.push([]);
                }
                let terms = [];
                for (let j = 0; j < columns - 1; j++) {
                    if (matrix[i][j] !== 0) {
                        let coefficient = String(matrix[i][j]);
                        if (coefficient === "1") {
                            terms.push(`x${j + 1}`);
                            terminos_sin[i].push(`x${j + 1}`);
                            continue;
                        }
                        terms.push(`${coefficient}x${j + 1}`);
                    }
                }
                let constant = matrix[i][columns - 1];
                let equation = `x${i + 1} = ` + (terms.length > 0 ? terms.join(" + ") : '') + (constant !== 0 ? (constant > 0 ? ` + ${constant}` : ` - ${Math.abs(constant)}`) : '');
                solution_texts.push(equation);
            }
        }

        if (error_message === "Sistema inconsistente. No hay solución.\n") {
            setSolution(error_message);
            return;
        }

        let soluciones_infinitas = []; // Placeholder for infinite solutions logic
        let variables = Array.from({ length: columns - 1 }, (_, i) => `x${i + 1}`);

        let solution_text = error_message;
        solution_text += "{ (" + variables.join(",") + ") |\n";
        solution_text += solution_texts.join("\n");

        if (solution_texts.length === 0) {
            solution_text = "El sistema tiene infinitas soluciones (sistema indeterminado).";
        } else {
            solution_text += "\n}";
        }

        setSolution(solution_text);
    };

    return (
        <MatrixContext.Provider value={{
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
            isModalOpen,
            openModal,
            closeModal,
            setMatrixSize
        }}>
            {children}
        </MatrixContext.Provider>
    );
};
