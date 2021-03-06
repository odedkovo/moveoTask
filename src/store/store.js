import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { audioReducer } from './audio.reducer.js';

const rootReducer = combineReducers({
  audioModule: audioReducer,
});
export default createStore(rootReducer, applyMiddleware(thunk));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
