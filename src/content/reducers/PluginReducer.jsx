/*global chrome*/

const initialState = {
  selectorFinderEnabled: false,
  finderState: {
    enabled: false
  },
  selectionState: {
    lastMouseoverElement: null
  },
  finderUi: {
    vertPanelPosition: "right",
    horizPanelPosition: "bottom",
    vertPanelDiv: null
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
    // Save the outline and backgroundColor for all elements in the DOM
    case "SAVE_INITIAL_DOM_SETTINGS": {
      let domInitialState = {};
      let treeWalker = document.createTreeWalker(
        document,
        NodeFilter.SHOW_ELEMENT
      );
      do {
        let n = treeWalker.currentNode;
        if (n.style) {
          domInitialState[n] = {
            outline: n.style.outline,
            bgcolor: n.style.backgroundColor
          };
        }
      } while (treeWalker.nextNode());
      return {
        ...state,
        initialDOMState: domInitialState
      };
    }
    case "SET_MOUSEOVER_ELEMENT": {
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
    case "SET_MOUSEOUT_ELEMENT": {
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
    case "ADD_OR_REMOVE_SELECTED_ELEMENT": {
      // If the element is currently in the selection, remove it. If it's not, add
      // it to the current selection
      let element = action.payload.element;
      let alreadyExists = state.selectedElements.some((elem, i) => {
        return elem.element === element;
      });
      if (alreadyExists) {
        let newSE = state.selectedElements.filter((elem, i) => {
          if (elem.element !== element) {
            return true;
          } else {
            return false;
          }
        });
        element.classList.remove("abba-selected-element");
        return {
          ...state,
          selectedElements: newSE
        };
      } else {
        // Compute these
        let link = "";
        let text = "";
        let html = "";
        let shortSelector = "";
        let newSE = state.selectedElements.map((se, i) => {
          return { ...se };
        });
        newSE.push({
          element: element,
          link: link,
          text: text,
          html: html,
          shortselector: shortSelector
        });
        element.classList.add("abba-selected-element");
        element.classList.remove("abba-mouseover-element");
        return {
          ...state,
          selectedElements: newSE
        };
      }
    }

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
          state.selectedElements[0].element === action.payload.element
        ) {
          return {
            ...state,
            selectedElements: []
          };
        } else {
          element.classList.add("abba-selected-element");
          element.classList.remove("abba-mouseover-element");
          // Compute these
          let link = "";
          let text = "";
          let html = "";
          let shortSelector = "";

          return {
            ...state,
            selectedElements: [
              {
                element: element,
                link: link,
                text: text,
                html: html,
                shortselector: shortSelector
              }
            ]
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
    default:
      return state;
  }
}
