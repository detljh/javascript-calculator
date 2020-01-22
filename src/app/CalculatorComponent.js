import React from 'react';
import CalculatorButton from './CalculatorButtonComponent';
import './calculator.scss';

const CalculatorComponent = (props) => {
    return (
        <div id="calc-container">
            <div id="display-container">
                <p id="formula">{props.formulaDisplay}</p>
                <p id="display">{props.display}</p>
            </div>
            <CalculatorButton id="equals" text="=" handleClick={props.evaluate} />
            <CalculatorButton id="zero" text="0" handleClick={props.handleZero}/>
            <CalculatorButton id="one" text="1" handleClick={props.handleOperand}/>
            <CalculatorButton id="two" text="2" handleClick={props.handleOperand}/>
            <CalculatorButton id="three" text="3" handleClick={props.handleOperand}/>
            <CalculatorButton id="four" text="4" handleClick={props.handleOperand}/>
            <CalculatorButton id="five" text="5" handleClick={props.handleOperand}/>
            <CalculatorButton id="six" text="6" handleClick={props.handleOperand}/>
            <CalculatorButton id="seven" text="7" handleClick={props.handleOperand}/>
            <CalculatorButton id="eight" text="8" handleClick={props.handleOperand}/>
            <CalculatorButton id="nine" text="9" handleClick={props.handleOperand}/>
            <CalculatorButton id="add" text="+" handleClick={props.handleOperator}/>
            <CalculatorButton id="subtract" text="-" handleClick={props.handleOperator}/>
            <CalculatorButton id="multiply" text="*" handleClick={props.handleOperator}/>
            <CalculatorButton id="divide" text="/" handleClick={props.handleOperator}/>
            <CalculatorButton id="decimal" text="." handleClick={props.handleDecimal}/>
            <CalculatorButton id="clear" text="AC" handleClick={props.clear}/>
        </div>
    );
}

export default CalculatorComponent;