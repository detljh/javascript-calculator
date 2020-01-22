import React from 'react';
import Calculator from './CalculatorContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faEquals, faMinus, faPlus, faWaveSquare,
   faSquareRootAlt, faLessThanEqual, faGreaterThan, 
   faNotEqual, faSubscript } from '@fortawesome/free-solid-svg-icons';
import './app.scss';

const App = () => {
  return (
    <div>
      <div className="icons">
        <FontAwesomeIcon id="minus-icon" icon={faMinus} />
        <FontAwesomeIcon id="plus-icon" icon={faPlus} />
        <FontAwesomeIcon id="divide-icon" icon={faDivide} />
        <FontAwesomeIcon id="equals-icon" icon={faEquals} />
        <FontAwesomeIcon id="wave-square-icon" icon={faWaveSquare} />
        <FontAwesomeIcon id="sqrt-icon" icon={faSquareRootAlt} />
        <FontAwesomeIcon id="gt-icon" icon={faGreaterThan} />
        <FontAwesomeIcon id="lt-icon" icon={faLessThanEqual} />
        <FontAwesomeIcon id="not-equals-icon" icon={faNotEqual} />
        <FontAwesomeIcon id="subscript-icon" icon={faSubscript} />
      </div>
      <Calculator />
    </div>
  );
}

export default App;
