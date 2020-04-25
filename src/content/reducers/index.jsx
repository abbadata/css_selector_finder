import { combineReducers } from "redux";
import PluginReducer from "./PluginReducer";
import FinderReducer from "./FinderReducer";
import SelectionReducer from "./SelectionReducer";
import UiReducer from "./UiReducer";
import * as GlobalReducer from "./GlobalReducer";
import reduceReducers from "reduce-reducers";

const combinedReducers = combineReducers({
  finder: FinderReducer,
  selection: SelectionReducer,
  ui: UiReducer,
  // state related to global and cross-cutting concerns are initialized here
  global: (state = GlobalReducer.initialState, action) => {
    return state;
  },
});

function rootReducer(state, action) {
  const intermediateState = combinedReducers(state, action);
  const finalState = GlobalReducer.globalReducer(intermediateState, action);
  return finalState;
}

export default rootReducer;
