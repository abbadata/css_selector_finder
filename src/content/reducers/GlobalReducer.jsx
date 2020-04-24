import * as Types from "../Types";
/*
 Handles logging to the console, and changing the bottom index,
 which are cross-cutting concerns.
*/

export const initialState = {
  consoleMessages: [],
  bottomTabIndex: Types.TAB_INDEX_INFO,
};

export function globalReducer(state = initialState, action) {
  if (state.PluginReducer.selectionState.errorMessage !== "") {
    return {
      ...state,
      PluginReducer: {
        ...state.PluginReducer,
        selectionState: {
          ...state.PluginReducer.selectionState,
          errorMessage: "",
        },
      },
      global: {
        ...state.global,
        consoleMessages: [
          ...state.global.consoleMessages,
          {
            time: new Date(),
            message: state.PluginReducer.selectionState.errorMessage,
            type: Types.CONSOLE_MSG_ERROR,
          },
        ],
        bottomTabIndex: Types.TAB_INDEX_CONSOLE,
      },
    };
  }

  switch (action.type) {
    case "SET_BOTTOM_TAB_INDEX": {
      return {
        ...state,
        global: {
          ...state.global,
          bottomTabIndex: action.payload.tabIndex,
        },
      };
    }
    case "CLEAR_CONSOLE": {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessages: [],
        },
      };
    }
    case "EXIT_APPLICATION": {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessages: [],
        },
      };
    }
    case "ADD_OR_REMOVE_SELECTED_ELEMENT": {
      return {
        ...state,
        global: {
          ...state.global,
          bottomTabIndex: Types.TAB_INDEX_CUSTOM_SELECTORS,
        },
      };
    }
    default:
      return state;
  }
  return state;
}
