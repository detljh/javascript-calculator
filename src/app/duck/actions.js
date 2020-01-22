import types from './types.js';

const handleOperator = (value, formula, outputQueue) => {
    return {
        type: types.OPERATOR,
        operator: value,
        formula: formula,
        outputQueue: outputQueue
    };
}

const handleOperand = (display, formula, opStack) => {
    return {
        type: types.OPERAND,
        display: display,
        formula: formula,
        opStack: opStack
    };
}

const handleZero = (display, formula, opStack) => {
    return {
        type: types.ZERO,
        formula: formula,
        display: display,
        opStack: opStack
    };
}

const evaluate = (output, formula) => {
    return {
        type: types.EVALUATE,
        output: output,
        formula: formula
    };
}

const handleDecimal = (formula, display, opStack) => {
    return {
        type: types.DECIMAL,
        formula: formula,
        display: display,
        opStack: opStack
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