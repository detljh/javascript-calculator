import React from 'react';
import './calc-button.scss';

const CalculatorButtonComponent = (props) => {
    return (
        <div className="calc-button" id={props.id} onClick={() => {props.handleClick(props.text)}}>
            <p>{props.text}</p>
        </div>
    )
}

export default CalculatorButtonComponent;