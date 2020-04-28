import * as Types from "../Types";
import * as Actions from "../actions/GlobalActions";

/*
 globalReducer is called with the top-level redux state, so is able
 to handle cross-cutting concerns.
 Currently handles logging to the console, and changing the bottom index in various scenarios,
 which are cross-cutting concerns.
*/

export const initialState = {
  consoleMessages: [],
  consoleMessageJustAdded: false,
  bottomTabIndex: Types.TAB_INDEX_INFO,
};

export function globalReducer(state = initialState, action) {
  if (state.selection.selectionState.errorMessage !== "") {
    return {
      ...state,
      selection: {
        ...state.selection,
        selectionState: {
          ...state.selection.selectionState,
          errorMessage: "",
        },
      },
      global: {
        ...state.global,
        consoleMessages: [
          ...state.global.consoleMessages,
          {
            time: new Date(),
            message: state.selection.selectionState.errorMessage,
            type: Types.CONSOLE_MSG_ERROR,
          },
        ],
        consoleMessageJustAdded: true,
        bottomTabIndex: Types.TAB_INDEX_CONSOLE,
      },
    };
  }

  switch (action.type) {
    case Actions.SET_BOTTOM_TAB_INDEX: {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessageJustAdded: false,
          bottomTabIndex: action.payload.tabIndex,
        },
      };
    }
    case Actions.CLEAR_CONSOLE: {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessageJustAdded: false,
          consoleMessages: [],
        },
      };
    }
    case Actions.EXIT_APPLICATION: {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessageJustAdded: false,
          consoleMessages: [],
        },
      };
    }
    case Actions.USE_AS_SELECTOR_ROOT: {
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
}
