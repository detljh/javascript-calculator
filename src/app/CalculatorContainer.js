import { connect } from 'react-redux';
import CalculatorComponent from './CalculatorComponent';
import { homeOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        display:  state.home.display,
        formulaDisplay: state.home.formulaDisplay
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleOperand: (value) => {
            dispatch(homeOperations.handleOperand(value));
        },
        handleOperator: (value) => {
            dispatch(homeOperations.handleOperator(value));
        },
        evaluate: () => {
            dispatch(homeOperations.evaluate());
        },
        clear: () => {
            dispatch(homeOperations.clear());
        },
        handleZero: () => {
            dispatch(homeOperations.handleZero());
        },
        handleDecimal: () => {
            dispatch(homeOperations.handleDecimal());
        }
    };
}

const CalculatorContainer = connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent);
export default CalculatorContainer;