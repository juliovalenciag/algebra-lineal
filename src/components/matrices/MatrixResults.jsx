import React from 'react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixResults = () => {
    const { resultMatrix } = useMatrix();

    return (
        <div className='p-4 shadow-md w-full rounded-md'>
            <h2 className="text-lg font-semibold mb-4">Matriz Resultante</h2>
            {resultMatrix ? (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${resultMatrix[0]?.length || 1}, minmax(40px, 1fr))` }}>
                    {resultMatrix.flatMap((row, rowIndex) =>
                        row.map((value, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="flex items-center justify-center w-16 h-16 bg-gray-100 border border-gray-200">
                                {value}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <p>No hay resultados.</p>
            )}
        </div>
    );
};

export default MatrixResults;
