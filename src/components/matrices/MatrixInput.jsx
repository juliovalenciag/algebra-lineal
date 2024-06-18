import React, { useEffect, useRef, useState } from 'react';
import { useMatrix } from '../../context/MatrixContext';
import { BiSolidZoomOut, BiSolidZoomIn } from "react-icons/bi";
import { MdKeyboardAlt } from "react-icons/md";
import './MatrixInput.css';

const MatrixInput = ({ onShowKeyboard, setActiveCell, activeCell, onTab }) => {
    const { matrixSize, matrix, setMatrix, matrixA, matrixB, setMatrixA, setMatrixB, showLinearSystem } = useMatrix();
    const { rows, columns } = matrixSize;
    const matrixRef = useRef(null);
    const containerRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!showLinearSystem) {
            setMatrix(Array.from({ length: rows }, () => Array(columns).fill('')));
        }
    }, [rows, columns, setMatrix, showLinearSystem]);

    const handleInputChange = (value, rowIndex, colIndex, matrixType = 'single') => {
        if (matrixType === 'single') {
            const newMatrix = matrix.map((row, i) =>
                row.map((val, j) => (i === rowIndex && j === colIndex ? value : val))
            );
            setMatrix(newMatrix);
        } else if (matrixType === 'A') {
            const newMatrixA = matrixA.map((row, i) =>
                row.map((val, j) => (i === rowIndex && j === colIndex ? value : val))
            );
            setMatrixA(newMatrixA);
        } else if (matrixType === 'B') {
            const newMatrixB = matrixB.map((row, i) =>
                row.map((val, j) => (i === rowIndex && j === colIndex ? value : val))
            );
            setMatrixB(newMatrixB);
        }
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    };

    const handleMouseDown = (e) => {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!isPanning) return;
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;
        containerRef.current.scrollLeft -= dx;
        containerRef.current.scrollTop -= dy;
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const entryWidth = Math.max(40, (600 / Math.max(columns, 10)) * zoom);
    const entryHeight = Math.max(40, (300 / Math.max(rows, 10)) * zoom);
    const padding = 5 * zoom;
    const margin = 5 * zoom;

    const getBracketHeight = (numRows) => `${numRows * entryHeight + (numRows - 1) * padding}px`;

    const isSquare = rows === columns;

    const bgColorDefault = 'bg-white';
    const bgColorConstant = 'bg-gray-300';
    const bracketColor = 'border-black';

    const renderMatrix = (matrixData, matrixType) => (
        <div className="grid matrix-grid" style={{
            gridTemplateColumns: `repeat(${matrixData[0].length}, minmax(${entryWidth}px, 1fr))`,
            gap: `${padding}px`,
        }}>
            {matrixData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((value, colIndex) => (
                        <input
                            key={colIndex}
                            id={`matrix-cell-${matrixType}-${rowIndex}-${colIndex}`}
                            className={`p-2 border rounded ${matrixType === 'single' && colIndex === row.length - 1 && !isSquare ? bgColorConstant : bgColorDefault}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex, matrixType)}
                            onFocus={() => setActiveCell({ rowIndex, colIndex, matrixType })}
                            style={{ width: `${entryWidth}px`, height: `${entryHeight}px` }}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );

    const handleTab = () => {
        if (activeCell) {
            const { rowIndex, colIndex, matrixType } = activeCell;
            let newColIndex, newRowIndex;

            if (matrixType === 'single') {
                newColIndex = colIndex + 1 < matrixSize.columns ? colIndex + 1 : 0;
                newRowIndex = newColIndex === 0 ? (rowIndex + 1) % matrixSize.rows : rowIndex;
            } else if (matrixType === 'A') {
                newColIndex = colIndex + 1 < matrixA[0].length ? colIndex + 1 : 0;
                newRowIndex = newColIndex === 0 ? (rowIndex + 1) % matrixA.length : rowIndex;
            } else if (matrixType === 'B') {
                newColIndex = colIndex + 1 < matrixB[0].length ? colIndex + 1 : 0;
                newRowIndex = newColIndex === 0 ? (rowIndex + 1) % matrixB.length : rowIndex;
            }

            setActiveCell({ rowIndex: newRowIndex, colIndex: newColIndex, matrixType });
            document.querySelector(`#matrix-cell-${matrixType}-${newRowIndex}-${newColIndex}`).focus();
        }
    };

    return (
        <div className='relative flex flex-col items-center shadow-lg rounded-md bg-gray-100 p-5 w-full h-full'>
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex space-x-1">
                    <button onClick={handleZoomOut} className="bg-primary text-white p-2 rounded">
                        <BiSolidZoomOut />
                    </button>
                    <button onClick={handleZoomIn} className="bg-primary text-white p-2 rounded">
                        <BiSolidZoomIn />
                    </button>
                    <button onClick={onShowKeyboard} className="bg-primary text-white p-2 rounded">
                        <MdKeyboardAlt />
                    </button>
                    <button onClick={onTab} className="bg-primary text-white p-2 rounded text-xs">Tab</button>
                </div>
            </div>

            <div
                className="relative w-full h-full overflow-auto"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            >
                <div className="flex justify-center items-center space-x-4 overflow-auto">
                    {!showLinearSystem ? (
                        <div
                            className="relative flex items-center matrix-wrapper"
                            style={{
                                padding: `${padding}px`,
                                margin: `0px`,
                                transform: `scale(${zoom})`,
                                transformOrigin: 'top left'
                            }}
                        >
                            <div className="absolute left-0 top-0 flex flex-col justify-between z-10"
                                style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(rows)} + ${padding * 2}px)` }}>
                                <div className={`${bracketColor} border-l-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                <div className={`${bracketColor} border-l-4 flex-grow`}></div>
                                <div className={`${bracketColor} border-l-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                            </div>
                            <div className="absolute right-0 top-0 flex flex-col justify-between z-10"
                                style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(rows)} + ${padding * 2}px)` }}>
                                <div className={`${bracketColor} border-r-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                <div className={`${bracketColor} border-r-4 flex-grow`}></div>
                                <div className={`${bracketColor} border-r-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                            </div>
                            {renderMatrix(matrix, 'single')}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <div
                                className="relative flex items-center matrix-wrapper"
                                style={{
                                    padding: `${padding}px`,
                                    margin: `0px`,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: 'top left'
                                }}
                            >
                                <div className="absolute left-0 top-0 flex flex-col justify-between z-10"
                                    style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(matrixA.length)} + ${padding * 2}px)` }}>
                                    <div className={`${bracketColor} border-l-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                    <div className={`${bracketColor} border-l-4 flex-grow`}></div>
                                    <div className={`${bracketColor} border-l-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                                </div>
                                <div className="absolute right-0 top-0 flex flex-col justify-between z-10"
                                    style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(matrixA.length)} + ${padding * 2}px)` }}>
                                    <div className={`${bracketColor} border-r-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                    <div className={`${bracketColor} border-r-4 flex-grow`}></div>
                                    <div className={`${bracketColor} border-r-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                                </div>
                                {renderMatrix(matrixA, 'A')}
                            </div>
                            <div className="text-2xl font-bold flex flex-col items-center justify-center"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                                <span>X</span>
                            </div>
                            <div className="text-2xl font-bold flex flex-col items-center justify-center"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                                <span>=</span>
                            </div>
                            <div
                                className="relative flex items-center matrix-wrapper"
                                style={{
                                    padding: `${padding}px`,
                                    margin: `0px`,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: 'top left'
                                }}
                            >
                                <div className="absolute left-0 top-0 flex flex-col justify-between z-10"
                                    style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(matrixB.length)} + ${padding * 2}px)` }}>
                                    <div className={`${bracketColor} border-l-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                    <div className={`${bracketColor} border-l-4 flex-grow`}></div>
                                    <div className={`${bracketColor} border-l-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                                </div>
                                <div className="absolute right-0 top-0 flex flex-col justify-between z-10"
                                    style={{ width: `${20 * zoom}px`, height: `calc(${getBracketHeight(matrixB.length)} + ${padding * 2}px)` }}>
                                    <div className={`${bracketColor} border-r-4 border-t-4`} style={{ height: `${10 * zoom}px` }}></div>
                                    <div className={`${bracketColor} border-r-4 flex-grow`}></div>
                                    <div className={`${bracketColor} border-r-4 border-b-4`} style={{ height: `${10 * zoom}px` }}></div>
                                </div>
                                {renderMatrix(matrixB, 'B')}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatrixInput;
