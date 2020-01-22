import { combineReducers } from 'redux';
import homeReducer from './app/duck';

const rootReducer = combineReducers({
    home: homeReducer
});

export default rootReducer;