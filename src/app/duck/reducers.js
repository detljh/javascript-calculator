import types from './types.js';

const INITIAL_STATE = {
    display: '0',
    formulaDisplay: '',
    outputQueue: [],
    opStack: [],
    hasDecimal: false,
    evaluated: false,
    prevAns: ''
};

const homeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ZERO:
            return Object.assign({}, state, {
                display: action.display,
                formulaDisplay: action.formula,
                evaluated: false,
                outputQueue: action.outputQueue
            })
        case types.OPERATOR:
            return Object.assign({}, state, {
                    display: action.operator,
                    formulaDisplay: action.formula,
                    outputQueue: action.outputQueue,
                    evaluated: false,
                    hasDecimal: false
                });
        case types.OPERAND:
            return Object.assign({}, state, {
                display: action.display,
                formulaDisplay: action.formula,
                evaluated: false,
                outputQueue: action.outputQueue
            });
        case types.EVALUATE:
            return Object.assign({}, state, {
                display: action.output,
                formulaDisplay: action.formula,
                evaluated: true,
                hasDecimal: false,
                outputQueue: [action.output],
                opStack: [],
                prevAns: action.output
            });
        case types.DECIMAL:
            return Object.assign({}, state, {
                hasDecimal: true,
                display: action.display,
                formulaDisplay: action.formula,
                evaluated: false,
                outputQueue: action.outputQueue
            });
        case types.CLEAR:
            return INITIAL_STATE;
        default:       
            return state;
    };
};

export default homeReducer;