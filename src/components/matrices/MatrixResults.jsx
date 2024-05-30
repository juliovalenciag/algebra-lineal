import React from 'react';
import { useMatrix } from '../../context/MatrixContext';
import Fraction from 'fraction.js';
import './MatrixInput.css'; // Asegúrate de importar los mismos estilos que MatrixInput

const MatrixResults = () => {
    const { resultMatrix } = useMatrix();

    const formatAsFraction = (value) => {
        try {
            const fraction = new Fraction(value);
            const [numerator, denominator] = fraction.toFraction().split('/');
            return { numerator, denominator };
        } catch (e) {
            return { numerator: value, denominator: null };
        }
    };

    return (
        <div className='relative flex flex-col items-center shadow-lg rounded-md bg-gray-100 p-5 w-full h-full'>
            <h2 className="text-2xl font-semibold mb-4">Matriz Resultante</h2>
            {resultMatrix ? (
                <div className="relative w-full h-full overflow-auto">
                    <div className="flex justify-center items-center overflow-auto">
                        <div className="relative flex items-center matrix-wrapper">
                            <div className="absolute left-0 top-0 flex flex-col justify-between z-10"
                                style={{ width: '20px', height: `calc(${resultMatrix.length * 60 + (resultMatrix.length - 1) * 5}px + 10px)` }}>
                                <div className="border-black border-l-4 border-t-4" style={{ height: '10px' }}></div>
                                <div className="border-black border-l-4 flex-grow"></div>
                                <div className="border-black border-l-4 border-b-4" style={{ height: '10px' }}></div>
                            </div>
                            <div className="absolute right-0 top-0 flex flex-col justify-between z-10"
                                style={{ width: '20px', height: `calc(${resultMatrix.length * 60 + (resultMatrix.length - 1) * 5}px + 10px)` }}>
                                <div className="border-black border-r-4 border-t-4" style={{ height: '10px' }}></div>
                                <div className="border-black border-r-4 flex-grow"></div>
                                <div className="border-black border-r-4 border-b-4" style={{ height: '10px' }}></div>
                            </div>
                            <div className="grid matrix-grid" style={{
                                gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(40px, 1fr))`,
                                gap: '0px',
                            }}>
                                {resultMatrix.flatMap((row, rowIndex) =>
                                    row.map((value, colIndex) => {
                                        const { numerator, denominator } = formatAsFraction(value);
                                        return (
                                            <div key={`${rowIndex}-${colIndex}`} className="p-2 border rounded bg-white flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                                                {denominator ? (
                                                    <div className="fraction">
                                                        <span className="numerator">{numerator}</span>
                                                        <span className="denominator">{denominator}</span>
                                                    </div>
                                                ) : (
                                                    numerator
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No hay resultados.</p>
            )}
        </div>
    );
};

export default MatrixResults;
