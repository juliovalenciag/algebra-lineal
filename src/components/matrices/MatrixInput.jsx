import React, { useEffect } from 'react';
import { useMatrix } from '../../context/MatrixContext';
import './MatrixInput.css';

const MatrixInput = () => {
    const { matrixSize, matrix, setMatrix } = useMatrix();
    const { rows, columns } = matrixSize;

    useEffect(() => {
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill(0)));
    }, [rows, columns, setMatrix]);

    const handleInputChange = (value, rowIndex, colIndex) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = parseFloat(value) || 0;
        setMatrix(newMatrix);
    };

    return (
        <div className='flex flex-col items-center p-4 shadow-lg rounded-md bg-white dark:bg-dark-foreground w-full'>
            <h2 className='text-2xl font-semibold mb-4 text-primary-dark dark:text-background-light'>Entrada de Matriz</h2>
            <div className="relative w-full overflow-auto">
                <div className="relative flex justify-center items-center matrix-wrapper">
                    <div className="matrix-bracket-left"></div>
                    <div className="grid gap-1 matrix-container" style={{ gridTemplateColumns: `repeat(${columns}, minmax(40px, 1fr))` }}>
                        {matrix.map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <input
                                        key={colIndex}
                                        className={`w-full h-10 text-center p-1 border-2 ${colIndex === columns - 1 ? 'constant-term' : 'border-primary-dark bg-background-light'
                                            } dark:border-gray-600 dark:bg-dark-background dark:text-background-light`}
                                        type="number"
                                        value={value}
                                        onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="matrix-bracket-right"></div>
                </div>
            </div>
        </div>
    );
};

export default MatrixInput;
