import { addElement, removeElement, formatXml } from "../lib/ReducerUtils";
import {
  getSelector,
  markSelectedElement,
  unmarkSelectedElement,
  markTempSelector,
  unmarkTempSelector,
  verifySelector,
  copyTextToClipboard,
  markRootSelector,
  unmarkRootSelector,
  isDescendant,
} from "../lib/SelectorUtils";
import * as Actions from "../actions/SelectionActions";
import * as Types from "../Types";

const initialState = {
  selectorFinderEnabled: true,
  selectionState: {
    lastClickedElement: null,
    lastMouseoverElement: null,
    selectorRoot: Types.DEFAULT_SELECTOR_ROOT,
    selectorRootElement: null,
    generatedSelector: "",
    /* These are used for the Selector Test ui */
    tempSelector: "",
    tempSelectedElements: null,
    tempSelectorRoot: "" /* Used for edit mode */,
    selectorRootEditMode: false,
    errorMessage: "",
  },
  selectedElements: [
    /*
  {
    element: "",
    link: "",
    text: "",
    html: "",
  },
  */
  ],
  errorMessage: "",
};

function selectorGenerationErrorState(state, element, errorMessage) {
  let newSE = state.selectedElements;
  if (element !== null) {
    newSE = addElement(element, [], state.selectionState.selectorRoot);
  }
  return {
    ...state,
    selectionState: {
      ...state.selectionState,
      lastClickedElement: element,
      generatedSelector: "",
      errorMessage: errorMessage,
    },
    selectedElements: newSE,
  };
}

function changeElementAndGenerateSelector(
  state,
  element,
  newelement,
  finderSettings,
  rootElement
) {
  let selector = "";
  unmarkSelectedElement(element);
  try {
    const options = {
      ...finderSettings,
      root: rootElement,
    };
    selector = getSelector(newelement, options);
  } catch (error) {
    let newstate = selectorGenerationErrorState(
      state,
      newelement,
      "Unable to generate selector. Error=" + error.message
    );
    return {
      ...newstate,
      selectionState: {
        ...newstate.selectionState,
        lastClickedElement: null,
      },
      selectedElements: [],
    };
  }

  markSelectedElement(newelement);
  let { selectedElements, alreadyExists } = removeElement(
    element,
    state.selectedElements
  );
  let newSE = addElement(
    newelement,
    selectedElements,
    state.selectionState.selectorRoot
  );
  return {
    ...state,
    selectionState: {
      ...state.selectionState,
      lastClickedElement: newelement,
      generatedSelector: selector,
    },
    selectedElements: newSE,
  };
}

export default function (state = initialState, action, finderState) {
  switch (action.type) {
    case Actions.SET_MOUSEOVER_ELEMENT:
      {
        let element = action.payload.element;
        if (state.selectionState.selectorRootElement) {
          if (
            !isDescendant(state.selectionState.selectorRootElement, element)
          ) {
            return state;
          }
        }
        if (element && element !== state.selectionState.lastMouseoverElement) {
          element.classList.add(Types.CLASS_MOUSEOVER_ELEMENT);
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              lastMouseoverElement: element,
            },
          };
        } else {
          return state;
        }
      }
      break;

    case Actions.SET_MOUSEOUT_ELEMENT:
      {
        let element = action.payload.element;
        if (state.selectionState.selectorRootElement) {
          if (
            !isDescendant(state.selectionState.selectorRootElement, element)
          ) {
            return state;
          }
        }
        if (element) {
          element.classList.remove(Types.CLASS_MOUSEOVER_ELEMENT);
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              lastMouseoverElement: null,
            },
          };
        }
      }
      break;

    case Actions.ONLY_SELECT_SELECTED_ELEMENT: {
      const newelement = action.payload.element;
      let finderSettings = action.payload.finderSettings;
      let rootElement = action.payload.rootElement;

      const element = state.selectionState.lastClickedElement;

      if (state.selectionState.selectorRootElement) {
        if (
          !isDescendant(state.selectionState.selectorRootElement, newelement)
        ) {
          return state;
        }
      }
      // If user clicks on the last clicked element, just deselect it
      if (element == newelement) {
        unmarkSelectedElement(element);
        return {
          ...state,
          selectionState: {
            ...state.selectionState,
            lastClickedElement: null,
          },
          selectedElements: [],
        };
      } else {
        return changeElementAndGenerateSelector(
          state,
          element,
          newelement,
          finderSettings,
          rootElement
        );
      }
    }

    case Actions.CHANGE_SELECTION_TO_PARENT:
      {
        let finderSettings = action.payload.finderSettings;
        let rootElement = action.payload.rootElement;

        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.parentElement;
          if (newelement) {
            return changeElementAndGenerateSelector(
              state,
              element,
              newelement,
              finderSettings,
              rootElement
            );
          } else {
            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                errorMessage: "Element has no parent",
              },
            };
          }
        }
      }
      return state;
      break;
    case Actions.CHANGE_SELECTION_TO_FIRST_CHILD:
      {
        let finderSettings = action.payload.finderSettings;
        let rootElement = action.payload.rootElement;

        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.firstElementChild;
          if (newelement) {
            return changeElementAndGenerateSelector(
              state,
              element,
              newelement,
              finderSettings,
              rootElement
            );
          } else {
            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                errorMessage: "Element has no child",
              },
            };
          }
        }
      }
      return state;
      break;
    case Actions.CHANGE_SELECTION_TO_NEXT_SIBLING:
      {
        let finderSettings = action.payload.finderSettings;
        let rootElement = action.payload.rootElement;

        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.nextElementSibling;
          if (newelement) {
            return changeElementAndGenerateSelector(
              state,
              element,
              newelement,
              finderSettings,
              rootElement
            );
          } else {
            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                errorMessage: "Element has no next sibling",
              },
            };
          }
        }
      }
      return state;
      break;
    case Actions.CHANGE_SELECTION_TO_PREV_SIBLING:
      {
        let finderSettings = action.payload.finderSettings;
        let rootElement = action.payload.rootElement;

        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.previousElementSibling;
          if (newelement) {
            return changeElementAndGenerateSelector(
              state,
              element,
              newelement,
              finderSettings,
              rootElement
            );
          } else {
            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                errorMessage: "Element has no previous sibling",
              },
            };
          }
        }
      }
      return state;
      break;
    case Actions.CHANGE_SELECTOR_ROOT:
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          tempSelectorRoot: action.payload.value,
        },
      };
      break;
    case Actions.ENABLE_SELECTOR_ROOT_EDIT:
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: true,
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
      };
      break;
    case Actions.SAVE_TEMP_SELECTOR_ROOT:
      {
        let tempSelectorRoot = state.selectionState.tempSelectorRoot;
        if (!verifySelector(tempSelectorRoot)) {
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              errorMessage: "Bad selector: " + tempSelectorRoot,
            },
          };
        } else {
          state.selectedElements.forEach((elem, i) => {
            unmarkSelectedElement(elem.element);
          });
          unmarkRootSelector(state.selectionState.selectorRootElement);
          markRootSelector(tempSelectorRoot);
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              selectorRoot: tempSelectorRoot,
              selectorRootElement: document.querySelector(tempSelectorRoot),
              selectorRootEditMode: false,
              lastClickedElement: null,
            },
            selectedElements: [],
          };
        }
      }
      break;
    case Actions.CANCEL_TEMP_SELECTOR_ROOT:
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: false,
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
      };
      break;
    case Actions.RESET_SELECTOR_ROOT:
      state.selectedElements.forEach((elem, i) => {
        unmarkSelectedElement(elem.element);
      });
      unmarkRootSelector(state.selectionState.selectorRootElement);
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: false,
          selectorRoot: Types.DEFAULT_SELECTOR_ROOT,
          selectorRootElement: null,
          tempSelectorRoot: state.selectionState.selectorRoot,
          lastClickedElement: null,
        },
        selectedElements: [],
      };
      break;
    case Actions.SET_TEMP_SELECTOR:
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          tempSelector: action.payload.value,
        },
      };
      break;
    case Actions.DO_TEST_SELECTOR_HIGHLIGHT:
      {
        const selectedList = state.selectionState.tempSelectedElements;
        const tempSelector = state.selectionState.tempSelector;
        unmarkTempSelector(selectedList);
        let selectors = markTempSelector(tempSelector);
        return {
          ...state,
          selectionState: {
            ...state.selectionState,
            tempSelectedElements: selectors,
          },
        };
      }
      break;
    case Actions.STOP_TEST_SELECTOR_HIGHLIGHT:
      {
        let selectedList = state.selectionState.tempSelectedElements;
        unmarkTempSelector(selectedList);
        return {
          ...state,
          selectionState: {
            ...state.selectionState,
            tempSelectedElements: null,
          },
        };
      }
      break;
    case Actions.COPY_SELECTOR_TO_CLIPBOARD: {
      copyTextToClipboard(state.selectionState.generatedSelector);
      return state;
    }
    case Actions.USE_AS_SELECTOR_ROOT: {
      state.selectedElements.forEach((elem, i) => {
        unmarkSelectedElement(elem.element);
      });
      unmarkRootSelector(state.selectionState.selectorRootElement);
      markRootSelector(state.selectionState.generatedSelector);
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          generatedSelector: "",
          selectorRoot: state.selectionState.generatedSelector,
          selectorRootElement: document.querySelector(
            state.selectionState.generatedSelector
          ),
          lastClickedElement: null,
        },
        selectedElements: [],
      };
    }
    case Actions.EXIT_APPLICATION: {
      state.selectedElements.forEach((elem, i) => {
        unmarkSelectedElement(elem.element);
      });
      unmarkRootSelector(state.selectionState.selectorRootElement);
      unmarkTempSelector(state.selectionState.tempSelectedElements);

      return {
        ...state,
        selectorFinderEnabled: false,
        selectionState: {
          ...state.selectionState,
          lastClickedElement: null,
          lastMouseoverElement: null,
          generatedSelector: "",
          tempSelectedElements: [],
        },
        selectedElements: [],
      };
    }
    case Actions.GENERATE_SELECTOR: {
      let selector = "";
      let finderSettings = action.payload.finderSettings;
      let rootElement = action.payload.rootElement;
      try {
        const options = {
          ...finderSettings,
          root: rootElement,
        };
        selector = getSelector(
          state.selectionState.lastClickedElement,
          options
        );
      } catch (error) {
        return selectorGenerationErrorState(
          state,
          null,
          "Unable to find selector."
        );
      }

      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          generatedSelector: selector,
        },
      };
    }

    case Actions.SET_BOTTOM_TAB_INDEX: {
      if (action.payload.tabIndex !== Types.TAB_INDEX_TEST_SELECTORS) {
        if (state.selectionState.tempSelectedElements) {
          let selectedList = state.selectionState.tempSelectedElements;
          unmarkTempSelector(selectedList);
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              tempSelectedElements: null,
            },
          };
        }
      }
    }
  }
  return state;
}
