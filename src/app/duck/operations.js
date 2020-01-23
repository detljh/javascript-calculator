import Creators from './actions.js';

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

const checkWellFormedNumber = (expression) => {
    // cannot start with more than one 0, decimal must be preceded with number
    const form = new RegExp(/^(([1-9]+0*\.?|0\.)[0-9]*|0)$/);
    return form.test(expression);
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
        let expression = precedence.hasOwnProperty(formula[formula.length - 1]) ? 
            formula.slice(0, -1) :
            formula;

        // infix evaluation
        const opStack = [];
        const valueStack = [];
        for (var i = 0; i < outputQueue.length; i++) {
            let element = outputQueue[i]
            if (precedence.hasOwnProperty(element)) {
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

        // return expression if no precedence
        const ans = valueStack.length === 0 ? expression : valueStack.pop().toString();

        dispatch(Creators.evaluate(ans, expression.concat(ans)));
    };
}

const handleOperator = (value) => {
    return (dispatch, getState) => {
        const outputQueue = getState().home.outputQueue;
        const formula = getState().home.formulaDisplay;
        const display = getState().home.display;
        const isEvaluated = getState().home.evaluated;
        const isNegativeNumber = getState().home.isNegativeNumber;
        let newQueue = outputQueue;
        let newFormula = '';

        if (isEvaluated) {
            // if formula has been evaluated continue it with the prev answer and new operator
            newFormula = getState().home.prevAns + value;
        } else {
            // if prev input was number
            newQueue = !precedence.hasOwnProperty(display) ?
            isNegativeNumber ? [...outputQueue, "-".concat(display)] :
            [...outputQueue, display] :
            outputQueue;

            // allow negative numbers by adding negative sign after other precedence
            // double negation disallowed
            if (value === "-" && formula[formula.length - 1] !== "-") {
                newFormula = formula.concat(value);
            } else {
                newFormula = precedence.hasOwnProperty(formula[formula.length - 1]) ?
                precedence.hasOwnProperty(formula[formula.length - 2]) ?
                // if there were two operators previously remove both and replace with current
                formula.slice(0, -2).concat(value) :
                // else remove the one operator and replace with current
                formula.slice(0, -1).concat(value) :
                // if no operator previously, add current
                formula.concat(value);
            }
        }

        dispatch(Creators.handleOperator(value, newFormula, newQueue));
    };
}

const handleOperand = (value) => {
    return (dispatch, getState) => {
        const isEvaluated = getState().home.evaluated;
        const formula = isEvaluated ? "" : getState().home.formulaDisplay;
        const display = isEvaluated ? "" : getState().home.display;

        if (display.length > 15 || formula.length > 100) {
            return;
        }

        const outputQueue = getState().home.outputQueue;
        let newQueue = outputQueue;
        let isNegativeNumber = false;

        if (precedence.hasOwnProperty(formula[formula.length - 1])) {
            if (precedence.hasOwnProperty(formula[formula.length - 2])) {
            // ignore negative sign if there is one and add the prev operator to queue
               newQueue = [...outputQueue, formula[formula.length - 2]];
               isNegativeNumber = true;
            } else {
               newQueue = [...outputQueue, formula[formula.length - 1]];
            }
        }

        let newDisplay = precedence.hasOwnProperty(display) ? "" : display;
        let newFormula = formula;
        // to replace the zero as numbers cannot start with more than one zero
        if (display === "0") {
            newDisplay = ""
            newFormula = "";
        }

        // if prev value was operator or display is blank
        if (value === "." && (precedence.hasOwnProperty(display) || newDisplay === "")) {
            value = "0.";
        }

        const expression = newDisplay.concat(value);
        if (checkWellFormedNumber(expression)) {
            newFormula = newFormula.concat(value);
            dispatch(Creators.handleOperand(expression, newFormula, newQueue, isNegativeNumber));
        }
    };
}

export default {
    handleOperator,
    handleOperand,
    evaluate,
    clear
};