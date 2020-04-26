import { addElement, removeElement, formatXml } from "../lib/ReducerUtils";
import {
  getSelector,
  markTempSelector,
  unmarkTempSelector,
  verifySelector,
  copyTextToClipboard,
  markRootSelector,
  unmarkRootSelector,
} from "../lib/SelectorUtils";
import * as Actions from "../actions/SelectionActions";

const initialState = {
  selectorFinderEnabled: true,
  selectionState: {
    lastClickedElement: null,
    lastMouseoverElement: null,
    selectorRoot: ":root",
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

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_MOUSEOVER_ELEMENT:
      {
        let element = action.payload.element;
        if (element && element !== state.selectionState.lastMouseoverElement) {
          element.classList.add("abba-mouseover-element");
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
        if (element) {
          element.classList.remove("abba-mouseover-element");
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

    case Actions.ADD_OR_REMOVE_SELECTED_ELEMENT:
      {
        // If the element is currently in the selection, remove it. If it's not, add
        // it to the current selection
        let element = action.payload.element;
        let { selectedElements, alreadyExists } = removeElement(
          element,
          state.selectedElements
        );
        if (alreadyExists) {
          element.classList.remove("abba-selected-element");
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              lastClickedElement: null,
            },
            selectedElements: selectedElements,
          };
        } else {
          let newSE = addElement(
            element,
            state.selectedElements,
            state.selectionState.selectorRoot
          );
          element.classList.add("abba-selected-element");
          element.classList.remove("abba-mouseover-element");

          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element,
            },
            selectedElements: newSE,
          };
        }
      }
      break;
    case Actions.CHANGE_SELECTION_TO_PARENT:
      {
        let finderSettings = action.payload.finderSettings;
        let rootElement = action.payload.rootElement;

        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.parentElement;
          let selector = "";
          if (newelement) {
            try {
              const options = {
                ...finderSettings,
                root: rootElement,
              };
              selector = getSelector(newelement, options);
            } catch (error) {
              return selectorGenerationErrorState(
                state,
                newelement,
                "Unable to generate selector."
              );
            }

            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
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
          let selector = "";
          if (newelement) {
            try {
              const options = {
                ...finderSettings,
                root: rootElement,
              };
              selector = getSelector(newelement, options);
            } catch (error) {
              return selectorGenerationErrorState(
                state,
                newelement,
                "Unable to generate selector."
              );
            }

            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
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
          let selector = "";
          if (newelement) {
            try {
              const options = {
                ...finderSettings,
                root: rootElement,
              };
              selector = getSelector(newelement, options);
            } catch (error) {
              return selectorGenerationErrorState(
                state,
                newelement,
                "Unable to generate selector."
              );
            }

            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
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
          let selector = "";
          if (newelement) {
            try {
              const options = {
                ...finderSettings,
                root: rootElement,
              };
              selector = getSelector(newelement, options);
            } catch (error) {
              return selectorGenerationErrorState(
                state,
                newelement,
                "Unable to generate selector."
              );
            }

            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
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
          unmarkRootSelector(state.selectionState.selectorRootElement);
          markRootSelector(tempSelectorRoot);
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              selectorRoot: tempSelectorRoot,
              selectorRootElement: document.querySelector(tempSelectorRoot),
              selectorRootEditMode: false,
            },
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
      unmarkRootSelector(state.selectionState.selectorRootElement);
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: false,
          selectorRoot: ":root",
          selectorRootElement: null,
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
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
        let selectedList = state.selectionState.tempSelectedElements;
        let tempSelector = state.selectionState.tempSelector;
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
      unmarkRootSelector(state.selectionState.selectorRootElement);
      markRootSelector(state.selectionState.generatedSelector);
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRoot: state.selectionState.generatedSelector,
          selectorRootElement: document.querySelector(
            state.selectionState.generatedSelector
          ),
        },
      };
    }
    case Actions.EXIT_APPLICATION: {
      state.selectedElements.forEach((elem, i) => {
        let el = elem.element;
        el.classList.remove("abba-selected-element");
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
  }
  return state;
}
