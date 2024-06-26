import React, { createContext, useState, useContext } from 'react';
import Fraction from 'fraction.js';
import { evaluate, parse } from 'mathjs';

const MatrixContext = createContext();

export const useMatrix = () => useContext(MatrixContext);

export const MatrixProvider = ({ children }) => {
    const [matrixSize, setMatrixSize] = useState({ rows: 3, columns: 4 });
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(4).fill('')));
    const [resultMatrix, setResultMatrix] = useState(null);
    const [solution, setSolution] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [matrixA, setMatrixA] = useState([]);
    const [matrixB, setMatrixB] = useState([]);
    const [showLinearSystem, setShowLinearSystem] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const updateMatrixSize = (rows, columns) => {
        setMatrixSize({ rows, columns });
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill('')));
        setResultMatrix(null);
        setSolution('');
        setShowLinearSystem(false);
    };

    const updateLinearSystemDimensions = (rowsA, columnsA, columnsB) => {
        const matrixA = Array.from({ length: rowsA }, () => Array(columnsA).fill(''));
        const matrixB = Array.from({ length: rowsA }, () => Array(columnsB).fill(''));
        setMatrixA(matrixA);
        setMatrixB(matrixB);
        setShowLinearSystem(true);
    };

    const solveLinearSystem = () => {
        try {
            const n = matrixA.length;
            const m = matrixB[0].length;

            let augmentedMatrix = matrixA.map((row, i) => [
                ...row.map(entry => new Fraction(entry || 0)),
                ...matrixB[i].map(entry => new Fraction(entry || 0))
            ]);

            for (let i = 0; i < n; i++) {
                if (augmentedMatrix[i][i].valueOf() === 0) {
                    let swapRow = -1;
                    for (let k = i + 1; k < n; k++) {
                        if (augmentedMatrix[k][i].valueOf() !== 0) {
                            swapRow = k;
                            break;
                        }
                    }
                    if (swapRow === -1) {
                        throw new Error("El sistema no tiene solución única.");
                    }
                    [augmentedMatrix[i], augmentedMatrix[swapRow]] = [augmentedMatrix[swapRow], augmentedMatrix[i]];
                }

                let pivot = augmentedMatrix[i][i];
                for (let j = 0; j < n + m; j++) {
                    augmentedMatrix[i][j] = augmentedMatrix[i][j].div(pivot);
                }

                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        let factor = augmentedMatrix[j][i];
                        for (let k = 0; k < n + m; k++) {
                            augmentedMatrix[j][k] = augmentedMatrix[j][k].sub(factor.mul(augmentedMatrix[i][k]));
                        }
                    }
                }
            }

            const resultMatrix = augmentedMatrix.map(row => row.slice(n));
            setResultMatrix(resultMatrix);

            const solutionText = resultMatrix.map(row => row.map(entry => entry.toFraction(true)).join(' ')).join('\n');
            setSolution(solutionText);
        } catch (error) {
            setSolution(`Error en la resolución del sistema: ${error.message}`);
        }
    };


    const resetMatrix = () => {
        if (showLinearSystem) {
            setMatrixA(matrixA.map(row => row.map(() => '')));
            setMatrixB(matrixB.map(row => row.map(() => '')));
        } else {
            setMatrix(Array.from({ length: matrixSize.rows }, () => Array(matrixSize.columns).fill('')));
        }
        setResultMatrix(null);
        setSolution('');
    };

    const importMatrixFromFile = (matrixData) => {
        if (matrixData && matrixData.length > 0) {
            const rows = matrixData.length;
            const columns = matrixData[0].length;
            setMatrixSize({ rows, columns });
            setTimeout(() => {
                const processedMatrix = matrixData.map(row => row.map(cell => {
                    return cell
                        .replace(/pi/g, 'π')
                        .replace(/exp\(1\)/g, 'e');
                }));
                setMatrix(processedMatrix);
                setResultMatrix(null);
                setSolution('');
            }, 0);
        } else {
            console.error('Datos de matriz invalidos');
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

    const parseAndEvaluateMatrix = (matrix) => {
        return matrix.map(row => row.map(cell => {
            try {
                const processedCell = cell.replace(/π/g, 'pi').replace(/e/g, 'exp(1)');
                return evaluate(processedCell);
            } catch (error) {
                console.error(`Error evaluando el valor de la celda "${cell}": ${error.message}`);
                return 0;
            }
        }));
    };

    const solveGaussJordan = () => {
        try {
            let m = parseAndEvaluateMatrix(matrix).map(row => row.map(entry => new Fraction(entry || 0)));
            const rows = m.length;
            const columns = m[0].length;

            for (let i = 0; i < Math.min(rows, columns); i++) {
                if (m[i][i].valueOf() === 0) {
                    for (let k = i + 1; k < rows; k++) {
                        if (m[k][i].valueOf() !== 0) {
                            [m[i], m[k]] = [m[k], m[i]];
                            break;
                        }
                    }
                }

                let pivot = m[i][i];
                if (pivot.valueOf() === 0) continue;

                for (let k = 0; k < columns; k++) {
                    m[i][k] = m[i][k].div(pivot);
                }

                for (let j = 0; j < rows; j++) {
                    if (j !== i) {
                        let factor = m[j][i];
                        for (let k = 0; k < columns; k++) {
                            m[j][k] = m[j][k].sub(factor.mul(m[i][k]));
                        }
                    }
                }
            }

            setResultMatrix(m);
            displaySolution(m);
        } catch (error) {
            setSolution(`Error en el cálculo de Gauss-Jordan: ${error.message}`);
        }
    };

    const calculateDeterminant = () => {
        try {
            let m = parseAndEvaluateMatrix(matrix);
            const n = m.length;

            if (m.length !== m[0].length) {
                throw new Error("La matriz debe ser cuadrada para calcular el determinante.");
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

            const determinantText = `Determinante = ${det}`;
            setSolution(determinantText);
        } catch (error) {
            alert(`Error en el cálculo del determinante: ${error.message}`);
        }
    };

    const calculateInverse = () => {
        try {
            let m = parseAndEvaluateMatrix(matrix).map(row => row.map(entry => new Fraction(entry || 0)));
            const n = m.length;

            if (m.length !== m[0].length) {
                throw new Error("La matriz debe ser cuadrada para calcular la inversa.");
            }

            let augmentedMatrix = m.map((row, i) => [
                ...row,
                ...row.map((_, j) => (i === j ? new Fraction(1) : new Fraction(0)))
            ]);

            for (let i = 0; i < n; i++) {
                if (augmentedMatrix[i][i].valueOf() === 0) {
                    let swapRow = -1;
                    for (let k = i + 1; k < n; k++) {
                        if (augmentedMatrix[k][i].valueOf() !== 0) {
                            swapRow = k;
                            break;
                        }
                    }
                    if (swapRow === -1) {
                        throw new Error("La matriz es singular y no tiene inversa.");
                    }
                    [augmentedMatrix[i], augmentedMatrix[swapRow]] = [augmentedMatrix[swapRow], augmentedMatrix[i]];
                }

                let pivot = augmentedMatrix[i][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmentedMatrix[i][j] = augmentedMatrix[i][j].div(pivot);
                }

                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        let factor = augmentedMatrix[j][i];
                        for (let k = 0; k < 2 * n; k++) {
                            augmentedMatrix[j][k] = augmentedMatrix[j][k].sub(factor.mul(augmentedMatrix[i][k]));
                        }
                    }
                }
            }

            let inverseMatrix = augmentedMatrix.map(row => row.slice(n));
            setResultMatrix(inverseMatrix);
            setSolution('');
        } catch (error) {
            alert(`Error en el cálculo de la inversa: ${error.message}`);
        }
    };

    const displaySolution = (matrix) => {
        if (typeof matrix === 'string') {
            setSolution(matrix);
            return;
        }

        const rows = matrix.length;
        const columns = matrix[0].length;
        const solution_texts = [];
        let error_message = "";

        const rank = matrix.reduce((acc, row) => acc + (row.slice(0, -1).some(val => val.valueOf() !== 0) ? 1 : 0), 0);
        if (rank < rows) {
            error_message = "El sistema tiene infinitas soluciones debido a las filas cero.\n";
        }

        const terminos_sin = [];
        for (let i = 0; i < rows; i++) {
            if (matrix[i].slice(0, -1).every(val => val.valueOf() === 0)) {
                if (matrix[i][columns - 1].valueOf() !== 0) {
                    error_message = "Sistema inconsistente. No hay solución.\n";
                    break;
                } else {
                    continue;
                }
            } else {
                if (terminos_sin.length <= i) {
                    terminos_sin.push([]);
                }
                const terms = [];
                for (let j = 0; j < columns - 1; j++) {
                    if (matrix[i][j].valueOf() !== 0) {
                        const coefficient = matrix[i][j].toFraction(false); // false to ensure improper fractions
                        if (coefficient === "1") {
                            terms.push(`x<sub>${j + 1}</sub>`);
                            terminos_sin[i].push(`x<sub>${j + 1}</sub>`);
                        } else if (coefficient === "-1") {
                            terms.push(`-x<sub>${j + 1}</sub>`);
                            terminos_sin[i].push(`-x<sub>${j + 1}</sub>`);
                        } else {
                            terms.push(`${coefficient}x<sub>${j + 1}</sub>`);
                        }
                    }
                }
                const constant = matrix[i][columns - 1].toFraction(false); // false to ensure improper fractions
                const formattedTerms = terms.slice(1).map(term => term.startsWith('-') ? ` - ${term.slice(1)}` : ` + ${term}`).join('');
                const equation = terms[0] + " = " + formattedTerms + (constant !== "0" ? (formattedTerms ? ` + ${constant}` : constant) : '');
                solution_texts.push(equation.replace(' + -', ' - '));
            }
        }

        for (let i = 0; i < solution_texts.length; i++) {
            if (solution_texts[i].includes(" = ")) {
                const parts = solution_texts[i].split(" = ");
                if (parts[1].trim() === "") {
                    solution_texts[i] = parts[0] + " = 0";
                }
            }
        }

        if (error_message === "Sistema inconsistente. No hay solución.\n") {
            setSolution(error_message);
            return;
        }

        const { soluciones_infinitas, variables } = verificador_de_variables(terminos_sin);
        let solution_text = error_message;
        variables.sort();
        solution_text += `{ ( ${variables.join(',')} ) | ${solution_texts.join(', ')} }`;

        if (!solution_texts.length) {
            solution_text = "El sistema tiene infinitas soluciones (sistema indeterminado).";
        }

        if (soluciones_infinitas.length) {
            if (soluciones_infinitas.length === 1) {
                solution_text += `\n & ${soluciones_infinitas[0]} }`;
            } else if (soluciones_infinitas.length === 2) {
                solution_text += `,\n ${soluciones_infinitas[0]} & ${soluciones_infinitas[1]} }`;
            } else {
                solution_text += `,\n ${soluciones_infinitas.slice(0, -1).join(', ')} & ${soluciones_infinitas.slice(-1)[0]} }`;
            }
        } else {
            solution_text += " }\n";
        }

        setSolution(solution_text);
    }

    const verificador_de_variables = (terminos_sin) => {
        const variables_libres = [];
        const variables = new Set();

        terminos_sin.forEach((termino) => {
            termino.forEach((variable) => {
                if (!variables.has(variable)) {
                    variables.add(variable);
                    variables_libres.push(variable);
                }
            });
        });

        const soluciones_infinitas = variables_libres.map((variable, index) => {
            return `${variable} = k<sub>${index + 1}</sub>`;
        });

        return { soluciones_infinitas, variables: Array.from(variables) };
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
            updateLinearSystemDimensions,
            solveGaussJordan,
            calculateDeterminant,
            calculateInverse,
            solveLinearSystem,
            displaySolution,
            resetMatrix,
            isModalOpen,
            openModal,
            closeModal,
            setMatrixSize,
            exportMatrixToFile,
            exportResultMatrixToFile,
            matrixA,
            setMatrixA,
            matrixB,
            setMatrixB,
            showLinearSystem,
        }}>
            {children}
        </MatrixContext.Provider>
    );
};

export default MatrixProvider;
