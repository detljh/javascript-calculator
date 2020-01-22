import types from './types.js';

const handleOperator = (value, formula, outputQueue) => {
    return {
        type: types.OPERATOR,
        operator: value,
        formula: formula,
        outputQueue: outputQueue
    };
}

const handleOperand = (display, formula, outputQueue) => {
    return {
        type: types.OPERAND,
        display: display,
        formula: formula,
        outputQueue: outputQueue
    };
}

const handleZero = (display, formula, outputQueue) => {
    return {
        type: types.ZERO,
        formula: formula,
        display: display,
        outputQueue: outputQueue
    };
}

const evaluate = (output, formula) => {
    return {
        type: types.EVALUATE,
        output: output,
        formula: formula
    };
}

const handleDecimal = (formula, display, outputQueue) => {
    return {
        type: types.DECIMAL,
        formula: formula,
        display: display,
        outputQueue: outputQueue
    };
}

const clear = () => {
    return {
        type: types.CLEAR
    };
}

export default { 
    handleOperator,
    handleOperand,
    handleZero,
    handleDecimal,
    evaluate,
    clear
};