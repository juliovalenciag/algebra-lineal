import React, { useEffect, useRef } from 'react';
import { useMatrix } from '../../context/MatrixContext';
import './MatrixInput.css';

const MatrixInput = () => {
    const { matrixSize, matrix, setMatrix } = useMatrix();
    const { rows, columns } = matrixSize;
    const matrixRef = useRef(null);

    useEffect(() => {
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill(0)));
    }, [rows, columns, setMatrix]);

    const handleInputChange = (value, rowIndex, colIndex) => {
        const newMatrix = matrix.map((row, i) =>
            row.map((val, j) => (i === rowIndex && j === colIndex ? parseFloat(value) || 0 : val))
        );
        setMatrix(newMatrix);
    };

    const entryWidth = Math.max(60, 600 / Math.max(columns, 10));
    const entryHeight = Math.max(60, 300 / Math.max(rows, 10));
    const padding = 5;
    const bracketWidth = 20;
    const bracketDepth = 10;
    const bracketHeight = `${rows * entryHeight + (rows - 1) * padding}px`;

    const isSquare = rows === columns;
    const constantTermColumn = !isSquare ? columns - 1 : null;

    const bgColorDefault = 'bg-white';
    const bgColorConstant = !isSquare ? 'bg-gray-300' : 'bg-white';
    const bracketColor = 'border-black';

    return (
        <div className='flex flex-col items-center shadow-lg rounded-md bg-gray-100 p-5 w-full h-full'>
            <h2 className='text-2xl font-semibold mb-4'>Entrada de Matriz</h2>

            <div className="relative w-full h-full overflow-auto" ref={matrixRef}>
                <div className="flex justify-center items-center">
                    <div className="relative flex items-center matrix-wrapper" style={{ padding: `5px` }}>
                        <div className="absolute left-0 top-0 flex flex-col justify-between z-10"
                            style={{ width: bracketWidth, height: `calc(${bracketHeight} + ${padding * 2}px)` }}>
                            <div className={`${bracketColor} border-l-4 border-t-4`} style={{ height: `${bracketDepth}px` }}></div>
                            <div className={`${bracketColor} border-l-4 flex-grow`}></div>
                            <div className={`${bracketColor} border-l-4 border-b-4`} style={{ height: `${bracketDepth}px` }}></div>
                        </div>
                        <div className="absolute right-0 top-0 flex flex-col justify-between z-10"
                            style={{ width: bracketWidth, height: `calc(${bracketHeight} + ${padding * 2}px)` }}>
                            <div className={`${bracketColor} border-r-4 border-t-4`} style={{ height: `${bracketDepth}px` }}></div>
                            <div className={`${bracketColor} border-r-4 flex-grow`}></div>
                            <div className={`${bracketColor} border-r-4 border-b-4`} style={{ height: `${bracketDepth}px` }}></div>
                        </div>
                        <div className="grid" style={{
                            gridTemplateColumns: `repeat(${columns}, minmax(${entryWidth}px, 1fr))`,
                            gap: `${padding}px`,
                        }}>
                            {matrix.map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    {row.map((value, colIndex) => (
                                        <input
                                            key={colIndex}
                                            className={`p-2 border rounded ${colIndex === constantTermColumn ? bgColorConstant : bgColorDefault}`}
                                            type="number"
                                            value={value}
                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
                                            style={{ width: `${entryWidth}px`, height: `${entryHeight}px` }}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatrixInput;
