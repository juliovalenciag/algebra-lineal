import React from 'react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixSolution = () => {
    const { solution } = useMatrix();

    return (
        <div className="bg-white p-4 shadow-md mt-4 w-full rounded-md">
            <h2 className="text-lg font-semibold mb-4">Conjunto Solución</h2>
            <div className="text-center">
                {solution || 'El sistema tiene infinitas soluciones (sistema indeterminado).'}
            </div>
        </div>
    );
};

export default MatrixSolution;
