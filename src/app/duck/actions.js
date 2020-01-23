import types from './types.js';

const handleOperator = (value, formula, outputQueue) => {
    return {
        type: types.OPERATOR,
        operator: value,
        formula: formula,
        outputQueue: outputQueue
    };
}

const handleOperand = (display, formula, outputQueue, isNegativeNumber) => {
    return {
        type: types.OPERAND,
        display: display,
        formula: formula,
        outputQueue: outputQueue,
        isNegativeNumber: isNegativeNumber
    };
}

const evaluate = (output, formula) => {
    return {
        type: types.EVALUATE,
        output: output,
        formula: formula
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
    evaluate,
    clear
};