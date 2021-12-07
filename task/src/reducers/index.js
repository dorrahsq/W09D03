import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();
