/*global chrome*/

const initialState = {
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
  errorMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ASET_MOUSEOVER_ELEMENT":
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

    case "ASET_MOUSEOUT_ELEMENT":
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

    case "AADD_OR_REMOVE_SELECTED_ELEMENT":
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
            selectionState: {
              ...state.selectionState,
              lastClickedElement: element,
            },
            selectedElements: newSE,
          };
        }
      }
      break;
  }
  return state;
}
