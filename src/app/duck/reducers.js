import types from './types.js';

const INITIAL_STATE = {
    display: '0',
    formulaDisplay: '',
    outputQueue: [],
    isNegativeNumber: false,
    evaluated: false,
    prevAns: ''
};

const homeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.OPERATOR:
            return Object.assign({}, state, {
                    display: action.operator,
                    formulaDisplay: action.formula,
                    outputQueue: action.outputQueue,
                    evaluated: false,
                    isNegativeNumber: false
                });
        case types.OPERAND:
            return Object.assign({}, state, {
                display: action.display,
                formulaDisplay: action.formula,
                evaluated: false,
                outputQueue: action.outputQueue,
                isNegativeNumber: action.isNegativeNumber
            });
        case types.EVALUATE:
            return Object.assign({}, state, {
                display: action.output,
                formulaDisplay: action.formula,
                evaluated: true,
                outputQueue: [action.output],
                prevAns: action.output,
                isNegativeNumber: false
            });
        case types.CLEAR:
            return INITIAL_STATE;
        default:       
            return state;
    };
};

export default homeReducer;