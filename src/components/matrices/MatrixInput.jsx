import React, { useEffect, useRef, useState } from 'react';
import { useMatrix } from '../../context/MatrixContext';
import { BiSolidZoomOut, BiSolidZoomIn } from "react-icons/bi";
import { MdKeyboardAlt } from "react-icons/md";
import './MatrixInput.css';

const MatrixInput = ({ onShowKeyboard, setActiveCell, activeCell, onTab }) => {
    const { matrixSize, matrix, setMatrix } = useMatrix();
    const { rows, columns } = matrixSize;
    const matrixRef = useRef(null);
    const containerRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMatrix(Array.from({ length: rows }, () => Array(columns).fill('')));
    }, [rows, columns, setMatrix]);

    const handleInputChange = (value, rowIndex, colIndex) => {
        const newMatrix = matrix.map((row, i) =>
            row.map((val, j) => (i === rowIndex && j === colIndex ? value : val))
        );
        setMatrix(newMatrix);
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
    const bracketWidth = 20 * zoom;
    const bracketDepth = 10 * zoom;
    const bracketHeight = `${rows * entryHeight + (rows - 1) * padding}px`;

    const isSquare = rows === columns;
    const constantTermColumn = !isSquare ? columns - 1 : null;

    const bgColorDefault = 'bg-white';
    const bgColorConstant = !isSquare ? 'bg-gray-300' : 'bg-white';
    const bracketColor = 'border-black';

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
                    <button onClick={onTab} className="bg-primary text-white p-2 rounded text-xs ">Tab</button>
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
                <div className="flex justify-center items-center overflow-auto">
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
                        <div className="grid matrix-grid" style={{
                            gridTemplateColumns: `repeat(${columns}, minmax(${entryWidth}px, 1fr))`,
                            gap: `${padding}px`,
                        }}>
                            {matrix.map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    {row.map((value, colIndex) => (
                                        <input
                                            key={colIndex}
                                            className={`p-2 border rounded ${colIndex === constantTermColumn ? bgColorConstant : bgColorDefault}`}
                                            id={`matrix-cell-${rowIndex}-${colIndex}`}
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
                                            onFocus={() => setActiveCell({ rowIndex, colIndex })}
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
