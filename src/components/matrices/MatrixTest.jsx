import React from 'react';

const Matrix = ({ rows, columns }) => {
    const entryWidth = Math.max(60, 600 / Math.max(columns, 10));
    const entryHeight = Math.max(60, 300 / Math.max(rows, 10));
    const padding = 5;
    const bracketWidth = 20;
    const bracketDepth = 10;

    const isSquare = rows === columns;
    const constantTermColumn = !isSquare ? columns - 1 : null;

    const bgColorDefault = 'bg-white';
    const bgColorConstant = !isSquare ? 'bg-gray-300' : 'bg-white';
    const bracketColor = 'border-black';

    return (
        <div className="flex justify-center items-center bg-gray-200 p-5">
            <div className="relative">
                {/* Brackets - Left */}
                <div
                    className="absolute left-0 top-0 h-full flex flex-col justify-between"
                    style={{ width: bracketWidth }}
                >
                    <div className={`${bracketColor} border-l-4 border-t-4`} style={{ height: `${bracketDepth}px` }}></div>
                    <div className={`${bracketColor} border-l-4`} style={{ flexGrow: 1 }}></div>
                    <div className={`${bracketColor} border-l-4 border-b-4`} style={{ height: `${bracketDepth}px` }}></div>
                </div>
                {/* Brackets - Right */}
                <div
                    className="absolute right-0 top-0 h-full flex flex-col justify-between"
                    style={{ width: bracketWidth }}
                >
                    <div className={`${bracketColor} border-r-4 border-t-4`} style={{ height: `${bracketDepth}px` }}></div>
                    <div className={`${bracketColor} border-r-4`} style={{ flexGrow: 1 }}></div>
                    <div className={`${bracketColor} border-r-4 border-b-4`} style={{ height: `${bracketDepth}px` }}></div>
                </div>
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(${entryWidth}px, 1fr))`,
                        gap: `${padding}px`,
                        padding: `${padding}px`,
                    }}
                >
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <input
                                    key={colIndex}
                                    className={`p-2 border rounded ${colIndex === constantTermColumn ? bgColorConstant : bgColorDefault
                                        }`}
                                    style={{
                                        width: `${entryWidth}px`,
                                        height: `${entryHeight}px`,
                                    }}
                                    type="text"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Matrix;
