import * as Types from "../Types";
import { addElement, removeElement, formatXml } from "../lib/ReducerUtils";
import * as Actions from "../actions/GlobalActions";
import SelectionReducer from "./SelectionReducer";
import FinderReducer from "./FinderReducer";
import UiReducer from "./UiReducer";

/*
 Handles logging to the console, and changing the bottom index,
 which are cross-cutting concerns.
*/

export const initialState = {
  consoleMessages: [],
  bottomTabIndex: Types.TAB_INDEX_INFO,
};

function selectorGenerationErrorState(state, element, errorMessage) {
  let newSE = state.selection.selectedElements;
  if (element !== null) {
    newSE = addElement(
      element,
      [],
      state.selection.selectionState.selectorRoot
    );
  }
  return {
    ...state,
    selection: {
      ...state.selection,
      selectionState: {
        ...state.selectionState,
        lastClickedElement: element,
        generatedSelector: "",
      },
      selectedElements: newSE,
    },
    global: {
      ...state.global,
      consoleMessages: [
        ...state.global.consoleMessages,
        {
          time: new Date(),
          message: errorMessage,
          type: Types.CONSOLE_MSG_ERROR,
        },
      ],
      bottomTabIndex: Types.TAB_INDEX_CONSOLE,
    },
  };
}

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
          bottomTabIndex: action.payload.tabIndex,
        },
      };
    }
    case Actions.CLEAR_CONSOLE: {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessages: [],
        },
      };
    }
    case Actions.EXIT_APPLICATION: {
      return {
        ...state,
        global: {
          ...state.global,
          consoleMessages: [],
        },
      };
    }
    // Couldn't put this in SelectionReducer since we don't have a good way
    // to pass in the

    /*
    case Actions.ONLY_SELECT_SELECTED_ELEMENT:
      return {
        selection: SelectionReducer(state.selection, action, state.finder),
        finder: FinderReducer(state.finder, action),
        ui: UiReducer(state.ui, action),
        global: state.global,
      };
      */

    /*
    case Actions.ONLY_SELECT_SELECTED_ELEMENT:
      {
        // Only select the current element. Remove any other element from the selection.
        let element = action.payload.element;

        let finderSettings = state.finder.settings;
        let rootElement = state.selection.selectionState.selectorRoot;

        state.selection.selectedElements.forEach((elem, i) => {
          let el = elem.element;
          el.classList.remove(Types.CLASS_SELECTED_ELEMENT);
        });

        // We only toggle if a single element is selected and we click on it
        if (
          state.selection.selectedElements.length === 1 &&
          state.selection.selectedElements[0].element === element
        ) {
          return {
            ...state,
            selection: {
              ...state.selection,
              selectedElements: [],
            },
          };
        } else {
          element.classList.add(Types.CLASS_SELECTED_ELEMENT);
          element.classList.remove(Types.CLASS_MOUSEOVER_ELEMENT);

          let selector = "";
          try {
            const options = {
              ...finderSettings,
              root: rootElement,
            };
            selector = getSelector(element, options);
          } catch (error) {
            return selectorGenerationErrorState(
              state.selection,
              element,
              "Unable to find selector"
            );
          }

          let newSE = addElement(
            element,
            [],
            state.selection.selectionState.selectorRoot
          );
          return {
            ...state,
            selection: {
              ...state.selection,
              selectionState: {
                ...state.selection.selectionState,
                lastClickedElement: element,
                generatedSelector: selector,
                errorMessage: "",
              },
              selectedElements: newSE,
            },
          };
        }
      }
      break;
      */
    default:
      return state;
  }
  return state;
}