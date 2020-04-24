import { combineReducers } from "redux";
import PluginReducer from "./PluginReducer";
import FinderReducer from "./FinderReducer";
import SelectionReducer from "./SelectionReducer";
import UiReducer from "./UiReducer";
import * as GlobalReducer from "./GlobalReducer";
import reduceReducers from "reduce-reducers";

const combinedReducers = combineReducers({
  PluginReducer: PluginReducer,
  finder: FinderReducer,
  selection: SelectionReducer,
  ui: UiReducer,
  // state related to cross-cutting concerns are initialized here and
  // updated by GlobalReducer
  global: (state = GlobalReducer.initialState, action) => {
    return state;
  },
});

function rootReducer(state, action) {
  const intermediateState = combinedReducers(state, action);
  console.log("InterState: ", intermediateState);
  const finalState = GlobalReducer.globalReducer(intermediateState, action);
  console.log("FinalState: ", finalState);
  return finalState;
}

export default rootReducer;
