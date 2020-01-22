import Creators from './actions.js';

const OPERATORS = ['+', '-', '*', '/'];
const precedence = {
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1
};

const clear = Creators.clear;

const evaluateOperator = (op, a, b) => {
    switch (op) {
        case "-":
            return b - a;
        case "+":
            return b + a;
        case "*":
            return b * a;
        case "/":
            return b / a;
        default: return;
    }
}

const handleDecimal = () => {
    return (dispatch, getState) => {
        const hasDecimal = getState().home.hasDecimal;
        const outputQueue = getState().home.outputQueue;

        if (!hasDecimal) {
            const isEvaluated = getState().home.evaluated;
            const display = getState().home.display;
            const formula = getState().home.formulaDisplay;

            const newFormula = (isEvaluated || formula.length === 0) ? "0." : 
            // if decimal is preceded by operator 
                OPERATORS.includes(formula[formula.length - 1]) ?
                formula.concat("0.") :
                formula.concat(".");

            const newDisplay = isEvaluated ? "0." : 
            // if prev input was operator remove operator from display and replace else join with number
                OPERATORS.includes(display) ?
                display.slice(0, -1).concat("0.") :
                display.concat(".");

            // if prev input was operator add it to the queue
            const newQueue = OPERATORS.includes(display) ? 
                [...outputQueue, display] :
                outputQueue;
            
            dispatch(Creators.handleDecimal(newFormula, newDisplay, newQueue));
        }
    };
}

const evaluate = () => {
    return (dispatch, getState) => {
        const isEvaluated = getState().home.evaluated;
        if (isEvaluated) {
            return;
        }

        // dispatch this to add last number to queue
        dispatch(handleOperator("="));

        const formula = getState().home.formulaDisplay;
        const outputQueue = getState().home.outputQueue;

        // if prev input was operator ignore it
        let expression = OPERATORS.includes(formula[formula.length - 1]) ? 
            formula.slice(0, -1) :
            formula;

        // infix evaluation
        const opStack = [];
        const valueStack = [];
        
        for (var i = 0; i < outputQueue.length; i++) {
            let element = outputQueue[i]
            if (OPERATORS.includes(element)) {
                if (opStack.length > 0 && precedence[opStack[opStack.length - 1]] >= precedence[element]) {
                    let a = valueStack.pop();
                    let b = valueStack.pop();
                    let op = opStack.pop();

                    valueStack.push(evaluateOperator(op, a, b));
                }
                opStack.push(element);
            } else {
                valueStack.push(Number(element));
            }
        }

        while (opStack.length > 0) {
            let op = opStack.pop();
            let a = valueStack.pop();
            let b = valueStack.pop();
            valueStack.push(evaluateOperator(op, a, b));
        }

        // return expression if no operators
        const ans = valueStack.length === 0 ? expression : valueStack.pop().toString();

        dispatch(Creators.evaluate(ans, expression.concat(ans)));
    };
}

const handleZero = () => {
    return (dispatch, getState) => {
        const display = getState().home.display;
        const formula = getState().home.formulaDisplay;
        const outputQueue = getState().home.outputQueue;
        const isEvaluated = getState().home.evaluated;
        
        if (display !== "0" || formula !== "0") {
            const newFormula = (isEvaluated || formula.length === 0) ? "0" : formula.concat("0");
            // if display already starts with 0 leave it else add 0 to end 
            const newDisplay = (isEvaluated || display === "0" || OPERATORS.includes(display)) ?
             "0" : 
             display.concat("0");

            // if prev input was operator, add to queue
            const newQueue = OPERATORS.includes(display) ? 
            [...outputQueue, display] :
            outputQueue;

            dispatch(Creators.handleZero(newDisplay, newFormula, newQueue));
        }
    };
}

const handleOperator = (value) => {
    return (dispatch, getState) => {
        const outputQueue = getState().home.outputQueue;
        const formula = getState().home.formulaDisplay;
        const display = getState().home.display;
        const isEvaluated = getState().home.evaluated;

        // if prev input was number
        const newQueue = !OPERATORS.includes(display) ?
            // if its not the first number and there are two operands before it
            formula.length > 1 && formula[formula.length - display.length - 1] === "-" && 
            OPERATORS.includes(formula[formula.length - display.length - 2]) ?
            // add negative number to queue
            [...outputQueue, "-".concat(display)] :
            [...outputQueue, display] :
            outputQueue;

        let newFormula = '';

        if (isEvaluated) {
            // if formula has been evaluated continue it with the prev answer and new operator
            newFormula = getState().home.prevAns + value;
        } else {
            // allow negative numbers by adding negative sign after other operators
            // double negation disallowed
            if (value === "-" && formula[formula.length - 1] !== "-") {
                newFormula = formula.concat(value);
            } else {
                newFormula = OPERATORS.includes(formula[formula.length - 1]) ?
                OPERATORS.includes(formula[formula.length - 2]) ?
                // if there were two operators previously remove both and replace with current
                formula.slice(0, -2).concat(value) :
                // else remove the one operator and replace with current
                formula.slice(0, -1).concat(value) :
                // if no operators previously, add current
                formula.concat(value);
            }
        }
        
        dispatch(Creators.handleOperator(value, newFormula, newQueue));
    };
}

const handleOperand = (value) => {
    return (dispatch, getState) => {
        const isEvaluated = getState().home.evaluated;
        const formula = getState().home.formulaDisplay;
        const display = getState().home.display;
        const outputQueue = getState().home.outputQueue;

        if (display.length > 15) {
            return;
        }

        // if previous evaluated start new display
        const newDisplay = isEvaluated ? value : 
            // if prev input was 0 or an operator, replace with current number
            (display === "0" || OPERATORS.includes(display)) ? 
            value : 
            // else concat number to display
            display.concat(value);

        // previous evaluated or formula is 0 replace start new formula
        const newFormula = isEvaluated || formula === "0" ? value : 
        // if initially performing operation with 0, replace with new value
        OPERATORS.includes(formula[formula.length - 2]) && formula[formula.length - 1] === "0" ?
        formula.slice(0, -1).concat(value) :
        formula.concat(value);


        const newQueue = OPERATORS.includes(formula[formula.length - 1]) ?
            OPERATORS.includes(formula[formula.length - 2]) ?
            // ignore negative sign if there is one and add the prev operator to queue
            [...outputQueue, formula[formula.length - 2]] :
            [...outputQueue, formula[formula.length - 1]] :
            outputQueue;

        dispatch(Creators.handleOperand(newDisplay, newFormula, newQueue));
    };
}

export default {
    handleZero,
    handleOperator,
    handleOperand,
    handleDecimal,
    evaluate,
    clear
};