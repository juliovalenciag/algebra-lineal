export const gaussJordan = (matrix) => {
    const rows = matrix.length;
    const columns = matrix[0].length;

    for (let i = 0; i < Math.min(rows, columns); i++) {
        if (matrix[i][i] === 0) {
            for (let k = i + 1; k < rows; k++) {
                if (matrix[k][i] !== 0) {
                    [matrix[i], matrix[k]] = [matrix[k], matrix[i]];
                    break;
                }
            }
        }

        const pivot = matrix[i][i];
        if (pivot === 0) continue;

        for (let k = 0; k < columns; k++) {
            matrix[i][k] /= pivot;
        }

        for (let j = 0; j < rows; j++) {
            if (j !== i) {
                const factor = matrix[j][i];
                for (let k = 0; k < columns; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                }
            }
        }
    }

    return matrix;
};
