import React, { useEffect } from 'react';
import { useMatrix } from '../../context/MatrixContext';

const MatrixSolution = () => {
    const { matrix, solution, displaySolution } = useMatrix();

    useEffect(() => {
        displaySolution(matrix);
    }, [matrix, displaySolution]);

    return (
        <div className="bg-white p-4 shadow-md mt-4 w-full rounded-md">
            <h2 className="text-lg font-semibold mb-4">Conjunto Solución</h2>
            <div className="text-left">
                {solution.split('\n').map((line, index) => (
                    <div key={index}>
                        {line}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatrixSolution;
