import React from 'react';
import { BiX } from "react-icons/bi";
import './OnScreenKeyboard.css';

const keys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '/',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc',
    'sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch',
    '√', '^', 'π', 'e', 'log', 'ln'
];

const OnScreenKeyboard = ({ onKeyPress, onClose }) => {
    return (
        <div className="onscreen-keyboard bg-white dark:bg-dark-foreground p-2 rounded-md shadow-md w-full max-w-lg mx-auto mb-4">
            <div className="flex justify-end">
                <button onClick={onClose} className="text-red-500 p-2">
                    <BiX size={24} />
                </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
                {keys.map(key => (
                    <button
                        key={key}
                        onClick={() => onKeyPress(key)}
                        className="bg-primary text-white p-2 rounded"
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OnScreenKeyboard;

