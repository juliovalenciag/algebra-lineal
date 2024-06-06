import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixSizeModal = ({ isOpen, onClose }) => {
    const { matrixSize, updateMatrixSize } = useMatrix();
    const [tempSize, setTempSize] = useState(matrixSize);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setTempSize(matrixSize);
    }, [matrixSize]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        const cellSize = 50; // Tamaño de cada celda
        const newRows = Math.max(tempSize.rows + Math.round(dy / cellSize), 1);
        const newColumns = Math.max(tempSize.columns + Math.round(dx / cellSize), 1);
        setTempSize({ rows: newRows, columns: newColumns });
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleAccept = () => {
        updateMatrixSize(tempSize.rows, tempSize.columns);
        onClose();
    };

    const renderMatrix = () => {
        const { rows, columns } = tempSize;
        return (
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 50px)`,
                    gridTemplateRows: `repeat(${rows}, 50px)`,
                    gap: '5px',
                    position: 'relative'
                }}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {Array.from({ length: rows * columns }).map((_, index) => (
                    <div
                        key={index}
                        className="w-12 h-12 border border-gray-300 flex items-center justify-center bg-gray-100"
                    />
                ))}
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 cursor-se-resize"
                    onMouseDown={handleMouseDown}
                />
            </div>
        );
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    Ajustar Tamaño de la Matriz
                                </Dialog.Title>
                                <div className="mt-4 flex flex-col items-center space-y-4">
                                    <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-center items-center">
                                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                            <label className="text-gray-700 dark:text-gray-300 mr-2">Filas:</label>
                                            <input
                                                type="number"
                                                value={tempSize.rows}
                                                min="1"
                                                onChange={(e) => setTempSize(prevSize => ({ ...prevSize, rows: Math.max(Number(e.target.value), 1) }))}
                                                className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-2 rounded"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="text-gray-700 dark:text-gray-300 mr-2">Columnas:</label>
                                            <input
                                                type="number"
                                                value={tempSize.columns}
                                                min="1"
                                                onChange={(e) => setTempSize(prevSize => ({ ...prevSize, columns: Math.max(Number(e.target.value), 1) }))}
                                                className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-2 rounded"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="mt-4 flex justify-center items-center border border-gray-300 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 relative"
                                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                                    >
                                        {renderMatrix()}
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-600 px-4 py-2 text-sm font-medium text-blue-900 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleAccept}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MatrixSizeModal;
