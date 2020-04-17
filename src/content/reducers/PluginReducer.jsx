/*global chrome*/
import { addElement, removeElement, formatXml } from "../lib/ReducerUtils";
import {
  getSelector,
  markTempSelector,
  unmarkTempSelector,
  verifySelector,
  copyTextToClipboard,
  getSelectorGenerationOptions,
} from "../lib/SelectorUtils";
import * as Types from "../Types";

const initialState = {
  selectorFinderEnabled: true,
  finderState: {
    enabled: false,
  },
  consoleMessages: [],
  selectionState: {
    lastClickedElement: null,
    lastMouseoverElement: null,
    selectorRoot: ":root",
    generatedSelector: "",
    /* These are used for the Selector Test ui */
    tempSelector: "",
    tempSelectedElements: null,
    tempSelectorRoot: "" /* Used for edit mode */,
    selectorRootEditMode: false,
  },
  finderState: {
    isClassEnabled: true,
    isIdEnabled: true,
    isTagEnabled: true,
    classFilter: [],
    idFilter: [],
    tagFilter: [],
    seedMinLength: 1,
    optimizedMinLength: 4,
  },
  finderUi: {
    vertPanelPosition: "right",
    horizPanelPosition: "bottom",
    vertPanelDiv: null,
    bottomTabIndex: Types.TAB_INDEX_INFO,
  },
  selectedElements: [
    /*
  {
    element: "",
    link: "",
    text: "",
    html: "",
    shortselector: "",
  },
  */
  ],
};
function selectorGenerationErrorState(state, element, errorMessage) {
  let newSE = state.selectedElements;
  if (element !== null) {
    newSE = addElement(element, [], state.selectionState.selectorRoot);
  }
  return {
    ...state,
    consoleMessages: [
      ...state.consoleMessages,
      {
        time: new Date(),
        message: errorMessage,
        type: Types.CONSOLE_MSG_ERROR,
      },
    ],
    finderUi: {
      ...state.finderUi,
      bottomTabIndex: Types.TAB_INDEX_CONSOLE,
    },
    selectionState: {
      ...state.selectionState,
      lastClickedElement: element,
      generatedSelector: "",
    },
    selectedElements: newSE,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_MOUSEOVER_ELEMENT":
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
    case "SET_MOUSEOUT_ELEMENT":
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
    case "ADD_OR_REMOVE_SELECTED_ELEMENT":
      {
        // If the element is currently in the selection, remove it. If it's not, add
        // it to the current selection
        let element = action.payload.element;
        console.log("stateSE: ", state.selectedElements);
        let { selectedElements, alreadyExists } = removeElement(
          element,
          state.selectedElements
        );
        console.log("Already: ", alreadyExists);
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
            finderUi: {
              ...state.finderUi,
              bottomTabIndex: Types.TAB_INDEX_CUSTOM_SELECTORS,
            },
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element,
            },
            selectedElements: newSE,
          };
        }
      }
      break;
    case "ONLY_SELECT_SELECTED_ELEMENT":
      {
        // Only select the current element. Remove any other element from the selection.
        let element = action.payload.element;
        state.selectedElements.forEach((elem, i) => {
          let el = elem.element;
          el.classList.remove("abba-selected-element");
        });

        // We only toggle if a single element is selected and we click on it
        if (
          state.selectedElements.length === 1 &&
          state.selectedElements[0].element === element
        ) {
          return {
            ...state,
            selectedElements: [],
          };
        } else {
          element.classList.add("abba-selected-element");
          element.classList.remove("abba-mouseover-element");

          let selector = "";
          try {
            const options = getSelectorGenerationOptions(state);
            selector = getSelector(element, options);
          } catch (error) {
            return selectorGenerationErrorState(
              state,
              element,
              "Unable to find selector"
            );
          }

          let newSE = addElement(
            element,
            [],
            state.selectionState.selectorRoot
          );
          return {
            ...state,
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element,
              generatedSelector: selector,
            },
            selectedElements: newSE,
          };
        }
      }
      break;
    case "SET_VERT_PANEL_DIV": {
      let panelElement = action.payload.element;
      console.log("SET_VERT_PANEL_DIV: ", panelElement);
      return {
        ...state,
        finderUi: {
          ...state.finderUi,
          vertPanelDiv: action.payload.element,
        },
      };
    }
    case "SET_HORIZ_PANEL_POSITION":
      let panelElement = action.payload.element;
      if (action.payload.position === "top") {
        panelElement.style.top = 0;
        panelElement.style.setProperty("bottom", "initial");
        // Adjust position of vertical panel depending on whether
        // horizontal panel is above or below it
        state.finderUi.vertPanelDiv.style.top = "200px";
        state.finderUi.vertPanelDiv.style.bottom = "0px";
      } else {
        panelElement.style.bottom = 0;
        panelElement.style.setProperty("top", "initial");

        state.finderUi.vertPanelDiv.style.top = "0";
        state.finderUi.vertPanelDiv.style.bottom = "200px";
      }
      return {
        ...state,
        finderUi: {
          ...state.finderUi,
          horizPanelPosition: action.payload.position,
        },
      };
    case "SET_VERT_PANEL_POSITION":
      console.log("vertElement: ", action.payload.element);
      let vertPanelElement = action.payload.element;
      if (action.payload.position === "left") {
        vertPanelElement.style.left = 0;
        vertPanelElement.style.setProperty("right", "initial");
      } else {
        vertPanelElement.style.right = 0;
        vertPanelElement.style.setProperty("left", "initial");
      }
      return {
        ...state,
        finderUi: {
          ...state.finderUi,
          vertPanelPosition: action.payload.position,
        },
      };
    case "CHANGE_SELECTION_TO_PARENT":
      {
        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.parentElement;
          let selector = "";
          if (newelement) {
            try {
              const options = getSelectorGenerationOptions(state);
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
              finderUi: {
                ...state.finderUi,
                bottomTabIndex: Types.TAB_INDEX_CONSOLE,
              },
              consoleMessages: [
                ...state.consoleMessages,
                {
                  time: new Date(),
                  message: "Element has no parent",
                  type: Types.CONSOLE_MSG_ERROR,
                },
              ],
            };
          }
        }
      }
      return state;
      break;
    case "CHANGE_SELECTION_TO_FIRST_CHILD":
      {
        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.firstElementChild;
          let selector = "";
          if (newelement) {
            try {
              const options = getSelectorGenerationOptions(state);
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
              finderUi: {
                ...state.finderUi,
                bottomTabIndex: Types.TAB_INDEX_CONSOLE,
              },
              consoleMessages: [
                ...state.consoleMessages,
                { time: new Date(), message: "Element has no child", type: 1 },
              ],
            };
          }
        }
      }
      return state;
      break;
    case "CHANGE_SELECTION_TO_NEXT_SIBLING":
      {
        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.nextElementSibling;
          let selector = "";
          if (newelement) {
            try {
              const options = getSelectorGenerationOptions(state);
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
            // generate selector
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
              finderUi: {
                ...state.finderUi,
                bottomTabIndex: Types.TAB_INDEX_CONSOLE,
              },
              consoleMessages: [
                ...state.consoleMessages,
                {
                  time: new Date(),
                  message: "Element has no next sibling",
                  type: 1,
                },
              ],
            };
          }
        }
      }
      return state;
      break;
    case "CHANGE_SELECTION_TO_PREV_SIBLING":
      {
        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.previousElementSibling;
          let selector = "";
          if (newelement) {
            try {
              const options = getSelectorGenerationOptions(state);
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
              finderUi: {
                ...state.finderUi,
                bottomTabIndex: Types.TAB_INDEX_CONSOLE,
              },
              consoleMessages: [
                ...state.consoleMessages,
                {
                  time: new Date(),
                  message: "Element has no previous sibling",
                  type: 1,
                },
              ],
            };
          }
        }
      }
      return state;
      break;
    case "SET_BOTTOM_TAB_INDEX":
      return {
        ...state,
        finderUi: {
          ...state.finderUi,
          bottomTabIndex: action.payload.tabIndex,
        },
      };
      break;
    case "CHANGE_SELECTOR_ROOT":
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          tempSelectorRoot: action.payload.value,
        },
      };
      break;
    case "ENABLE_SELECTOR_ROOT_EDIT":
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: true,
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
      };
      break;
    case "SAVE_TEMP_SELECTOR_ROOT":
      {
        // should verify that the selector is valid before we save it
        let tempSelectorRoot = state.selectionState.tempSelectorRoot;
        let newConsoleMessages = JSON.parse(
          JSON.stringify(state.consoleMessages)
        );
        newConsoleMessages.push({
          time: new Date(),
          message: "Bad selector: " + tempSelectorRoot,
          type: 1,
        });
        if (!verifySelector(tempSelectorRoot)) {
          return {
            ...state,
            consoleMessages: newConsoleMessages,
            finderUi: {
              ...state.finderUi,
              bottomTabIndex: Types.TAB_INDEX_CONSOLE,
            },
          };
        }
        return {
          ...state,
          selectionState: {
            ...state.selectionState,
            selectorRoot: tempSelectorRoot,
            selectorRootEditMode: false,
          },
        };
      }
      break;
    case "CANCEL_TEMP_SELECTOR_ROOT":
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: false,
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
      };
      break;
    case "RESET_SELECTOR_ROOT":
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRootEditMode: false,
          selectorRoot: ":root",
          tempSelectorRoot: state.selectionState.selectorRoot,
        },
      };
      break;
    case "SET_TEMP_SELECTOR":
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          tempSelector: action.payload.value,
        },
      };
      break;
    case "DO_TEST_SELECTOR_HIGHLIGHT":
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
    case "STOP_TEST_SELECTOR_HIGHLIGHT":
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
    case "SET_FINDER_ID_ENABLED": {
      return {
        ...state,
        finderState: {
          ...state.finderState,
          isIdEnabled: action.payload.enabled,
        },
      };
    }
    case "SET_FINDER_CLASS_ENABLED": {
      return {
        ...state,
        finderState: {
          ...state.finderState,
          isClassEnabled: action.payload.enabled,
        },
      };
    }
    case "SET_FINDER_TAG_ENABLED": {
      return {
        ...state,
        finderState: {
          ...state.finderState,
          isTagEnabled: action.payload.enabled,
        },
      };
    }
    case "ADD_FINDER_ID_FILTER": {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.finderState.idFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.finderState.idFilter.slice();
        filter.push(value);
        return {
          ...state,
          finderState: {
            ...state.finderState,
            idFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case "DELETE_FINDER_ID_FILTER": {
      let filter = state.finderState.idFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        finderState: {
          ...state.finderState,
          idFilter: filter,
        },
      };
    }
    case "ADD_FINDER_CLASS_FILTER": {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.finderState.classFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.finderState.classFilter.slice();
        filter.push(value);
        return {
          ...state,
          finderState: {
            ...state.finderState,
            classFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case "DELETE_FINDER_CLASS_FILTER": {
      let filter = state.finderState.classFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        finderState: {
          ...state.finderState,
          classFilter: filter,
        },
      };
    }
    case "ADD_FINDER_TAG_FILTER": {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.finderState.tagFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.finderState.tagFilter.slice();
        filter.push(value);
        return {
          ...state,
          finderState: {
            ...state.finderState,
            tagFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case "DELETE_FINDER_TAG_FILTER": {
      let filter = state.finderState.tagFilter.filter((e) => {
        return e !== action.payload.value;
      });
      console.log("DELETE_FINDER: ", state.selectedElements);
      return {
        ...state,
        finderState: {
          ...state.finderState,
          tagFilter: filter,
        },
      };
    }
    case "SET_FINDER_SEED_MIN_LENGTH": {
      return {
        ...state,
        finderState: {
          ...state.finderState,
          seedMinLength: action.payload.value,
        },
      };
    }
    case "SET_FINDER_OPTIMIZED_MIN_LENGTH": {
      return {
        ...state,
        finderState: {
          ...state.finderState,
          optimizedMinLength: action.payload.value,
        },
      };
    }
    case "GENERATE_SELECTOR": {
      // Need to generate the selector based on the current settings
      const options = {
        root: state.selectionState.selectorRoot,
        isIdEnabled: state.finderState.isIdEnabled,
        isClassEnabled: state.finderState.isClassEnabled,
        isTagEnabled: state.finderState.isTagEnabled,
        idFilter: state.finderState.idFilter,
        classFilter: state.finderState.classFilter,
        tagFilter: state.finderState.tagFilter,
      };
      let selector = "";
      try {
        const options = getSelectorGenerationOptions(state);
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
        finderState: {
          ...state.finderState,
        },
        selectionState: {
          ...state.selectionState,
          generatedSelector: selector,
        },
      };
    }
    case "COPY_SELECTOR_TO_CLIPBOARD": {
      copyTextToClipboard(state.selectionState.generatedSelector);
      return state;
    }
    case "USE_AS_SELECTOR_ROOT": {
      return {
        ...state,
        selectionState: {
          ...state.selectionState,
          selectorRoot: state.selectionState.generatedSelector,
        },
      };
    }
    case "CLEAR_CONSOLE": {
      return {
        ...state,
        consoleMessages: [],
      };
    }
    case "EXIT_APPLICATION": {
      state.selectedElements.forEach((elem, i) => {
        let el = elem.element;
        el.classList.remove("abba-selected-element");
      });

      return {
        ...state,
        selectorFinderEnabled: false,
        consoleMessages: [],
        finderState: {
          ...state.finderState,
        },
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
    default:
      return state;
  }
}
