/*global chrome*/
import { getShortSelector, getLongSelector } from "../lib/SelectorUtils";
import { addElement, removeElement, formatXml } from "../lib/ReducerUtils";

const initialState = {
  selectorFinderEnabled: false,
  finderState: {
    enabled: false
  },
  selectionState: {
    lastClickedElement: null,
    lastMouseoverElement: null
  },
  finderUi: {
    vertPanelPosition: "right",
    horizPanelPosition: "bottom",
    vertPanelDiv: null,
    bottomTabIndex: 0
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
  initialDOMState: null,
  numEvents: 0
};

export default function(state = initialState, action) {
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
              lastMouseoverElement: element
            }
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
              lastMouseoverElement: null
            }
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
              lastClickedElement: null
            },
            selectedElements: selectedElements
          };
        } else {
          let newSE = addElement(element, state.selectedElements);
          element.classList.add("abba-selected-element");
          element.classList.remove("abba-mouseover-element");
          return {
            ...state,
            finderUi: {
              ...state.finderUi,
              bottomTabIndex: 2
            },
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element
            },
            selectedElements: newSE
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
            selectedElements: []
          };
        } else {
          element.classList.add("abba-selected-element");
          element.classList.remove("abba-mouseover-element");
          // Compute these
          let newSE = addElement(element, []);
          return {
            ...state,
            finderUi: {
              ...state.finderUi,
              bottomTabIndex: 2
            },
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element
            },
            selectedElements: newSE
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
          vertPanelDiv: action.payload.element
        }
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
          horizPanelPosition: action.payload.position
        }
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
          vertPanelPosition: action.payload.position
        }
      };
    case "CHANGE_SELECTION_TO_PARENT":
      {
        if (state.selectionState.lastClickedElement) {
          let element = state.selectionState.lastClickedElement;
          let newelement = element.parentElement;
          if (newelement) {
            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
            let { selectedElements, alreadyExists } = removeElement(
              element,
              state.selectedElements
            );
            let newSE = addElement(newelement, selectedElements);

            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                lastClickedElement: newelement
              },
              selectedElements: newSE
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
          if (newelement) {
            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
            let { selectedElements, alreadyExists } = removeElement(
              element,
              state.selectedElements
            );
            let newSE = addElement(newelement, selectedElements);

            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                lastClickedElement: newelement
              },
              selectedElements: newSE
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
          if (newelement) {
            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
            let { selectedElements, alreadyExists } = removeElement(
              element,
              state.selectedElements
            );
            let newSE = addElement(newelement, selectedElements);

            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                lastClickedElement: newelement
              },
              selectedElements: newSE
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
          if (newelement) {
            element.classList.remove("abba-selected-element");
            newelement.classList.add("abba-selected-element");
            let { selectedElements, alreadyExists } = removeElement(
              element,
              state.selectedElements
            );
            let newSE = addElement(newelement, selectedElements);

            return {
              ...state,
              selectionState: {
                ...state.selectionState,
                lastClickedElement: newelement
              },
              selectedElements: newSE
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
          bottomTabIndex: action.payload.tabIndex
        }
      };
      break;
    default:
      return state;
  }
}
