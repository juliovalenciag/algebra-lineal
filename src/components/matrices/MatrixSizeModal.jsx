import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixSizeModal = ({ isOpen, onClose }) => {
    const { matrixSize, setMatrixSize } = useMatrix();
    const [tempSize, setTempSize] = useState(matrixSize);
    const canvasRef = useRef(null);

    useEffect(() => {
        setTempSize(matrixSize);
    }, [matrixSize]);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                drawMatrix(context, tempSize.rows, tempSize.columns);
            }
        }
    }, [tempSize]);

    useEffect(() => {
        if (isOpen && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                drawMatrix(context, tempSize.rows, tempSize.columns);
            }
        }
    }, [isOpen]);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        const cellSize = 50;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const newColumns = Math.max(Math.floor((width + deltaX) / cellSize), 1);
            const newRows = Math.max(Math.floor((height + deltaY) / cellSize), 1);
            setTempSize({ rows: newRows, columns: newColumns });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleAccept = () => {
        setMatrixSize(tempSize);
        onClose();
    };

    const drawMatrix = (context, rows, columns) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        const cellSize = 50;
        const padding = 5;
        const width = columns * cellSize + padding * (columns + 1);
        const height = rows * cellSize + padding * (rows + 1);

        context.canvas.width = width;
        context.canvas.height = height;

        context.strokeStyle = 'black';
        context.lineWidth = 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = col * cellSize + padding * (col + 1);
                const y = row * cellSize + padding * (row + 1);
                context.strokeRect(x, y, cellSize, cellSize);
            }
        }

        // Draw brackets
        context.beginPath();
        context.moveTo(padding / 2, padding / 2);
        context.lineTo(padding / 2, height - padding / 2);
        context.moveTo(width - padding / 2, padding / 2);
        context.lineTo(width - padding / 2, height - padding / 2);
        context.stroke();
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    Ajustar Tamaño de la Matriz
                                </Dialog.Title>
                                <div className="mt-4 flex justify-center">
                                    <canvas
                                        ref={canvasRef}
                                        className="border border-gray-300 dark:border-gray-700"
                                        onMouseDown={handleMouseDown}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <select
                                        className="select select-bordered"
                                        value={tempSize.rows}
                                        onChange={(e) => setTempSize({ ...tempSize, rows: parseInt(e.target.value) })}
                                    >
                                        {[...Array(10).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                    <select
                                        className="select select-bordered"
                                        value={tempSize.columns}
                                        onChange={(e) => setTempSize({ ...tempSize, columns: parseInt(e.target.value) })}
                                    >
                                        {[...Array(10).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-600 px-4 py-2 text-sm font-medium text-blue-900 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
