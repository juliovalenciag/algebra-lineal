import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixSizeModal = ({ isOpen, onClose }) => {
    const { matrixSize, updateMatrixSize } = useMatrix();
    const [tempSize, setTempSize] = useState(matrixSize);
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
        setTempSize(matrixSize);
    }, [matrixSize]);

    const handleAccept = () => {
        updateMatrixSize(tempSize.rows, tempSize.columns);
        onClose();
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setTempSize((prevSize) => ({
            ...prevSize,
            [name]: Number(value),
        }));
    };

    const handleCellMouseDown = (row, col) => {
        setIsSelecting(true);
        setTempSize({ rows: row + 1, columns: col + 1 });
    };

    const handleCellMouseOver = (row, col) => {
        if (isSelecting) {
            setTempSize({ rows: row + 1, columns: col + 1 });
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    const renderMatrix = () => {
        const totalRows = 12;
        const totalCols = 12;
        const { rows, columns } = tempSize;
        return (
            <div
                className="grid grid-cols-12 gap-1"
                onMouseUp={handleMouseUp}
            >
                {Array.from({ length: totalRows }).map((_, row) => (
                    Array.from({ length: totalCols }).map((_, col) => (
                        <div
                            key={`${row}-${col}`}
                            className={`w-8 h-8 flex items-center justify-center cursor-pointer
                                ${row < rows && col < columns ? 'bg-blue-500' : 'bg-gray-200'}`}
                            onMouseDown={() => handleCellMouseDown(row, col)}
                            onMouseOver={() => handleCellMouseOver(row, col)}
                        />
                    ))
                ))}
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center mt-10">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    Ajustar Tamaño de la Matriz
                                </Dialog.Title>
                                <div className="mt-4 flex flex-col items-center space-y-2">
                                    <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-center items-center">
                                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                            <label className="text-gray-700 dark:text-gray-300 mr-2">Filas:</label>
                                            <select
                                                name="rows"
                                                value={tempSize.rows}
                                                onChange={handleSelectChange}
                                                className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-2 rounded"
                                            >
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="text-gray-700 dark:text-gray-300 mr-2">Columnas:</label>
                                            <select
                                                name="columns"
                                                value={tempSize.columns}
                                                onChange={handleSelectChange}
                                                className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-2 rounded"
                                            >
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300 mb-4">
                                        Filas: {tempSize.rows}, Columnas: {tempSize.columns}
                                    </div>
                                    <div className="border border-gray-300 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 relative overflow-x-auto">
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
