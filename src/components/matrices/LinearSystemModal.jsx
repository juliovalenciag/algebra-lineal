import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const LinearSystemModal = ({ isOpen, onClose, onDimensionsSelect }) => {
    const [matrixASize, setMatrixASize] = useState(3);
    const [matrixBColumns, setMatrixBColumns] = useState(2);

    const handleMatrixASizeChange = (e) => {
        const size = parseInt(e.target.value, 10);
        setMatrixASize(size);
    };

    const handleMatrixBColumnsChange = (e) => {
        const columns = parseInt(e.target.value, 10);
        setMatrixBColumns(columns);
    };

    const handleAccept = () => {
        onDimensionsSelect(matrixASize, matrixBColumns);
        onClose();
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    Ajustar Dimensiones del Sistema Lineal
                                </Dialog.Title>
                                <div className="mt-4 flex flex-col space-y-4">
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-300">Dimensiones de A (cuadrada):</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={matrixASize}
                                            onChange={handleMatrixASizeChange}
                                            className="w-full mt-2 p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-300">Columnas de B:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={matrixBColumns}
                                            onChange={handleMatrixBColumnsChange}
                                            className="w-full mt-2 p-2 border rounded"
                                        />
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

export default LinearSystemModal;
