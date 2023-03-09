import { combineReducers } from 'redux';

import characterReducer from 'redux/reducers/character.reducer';

const rootReducer = combineReducers({
    character: characterReducer
})

export default rootReducer;