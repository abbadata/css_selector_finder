import * as Actions from "../actions/SelectionActions";
import * as Types from "../Types";
import SelectionReducer from "./SelectionReducer";

const initialState = {
  selectorFinderEnabled: true,
  selectionState: {
    lastClickedElement: null,
    lastMouseoverElement: null,
    selectorRoot: Types.DEFAULT_SELECTOR_ROOT,
    selectorRootElement: null,
    generatedSelector: "",
    tempSelector: "",
    tempSelectedElements: null,
    tempSelectorRoot: "",
    selectorRootEditMode: false,
    errorMessage: "",
  },
  selectedElements: [],
  errorMessage: "",
};

const finderSettings = {
  isClassEnabled: true,
  isIdEnabled: true,
  isTagEnabled: true,
  isAttributeEnabled: false,
  classFilter: [],
  idFilter: [],
  tagFilter: [],
  attributeFilter: [],
  seedMinLength: 1,
  optimizedMinLength: 10,
  threshhold: 1000,
};

let divWithClass = null;
let pWithId = null;
let spanWithNothing = null;
let divUnderSpan = null;

beforeEach(() => {
  document.write(`
  <div class='test-class'>
    <p id='test-id'>
      <span custom='customvalue'>
        <div></div>
      </span>
    </p>
  </div>
  `);
  // setup a few DOM elements for basic selector finding tests
  divWithClass = document.querySelector(".test-class");
  pWithId = document.querySelector("#test-id");
  spanWithNothing = document.querySelector("span");
  divUnderSpan = document.querySelector("span > div");
  /*
  divWithClass = document.createElement("div");
  divWithClass.className = "test-class";
  pWithId = document.createElement("p");
  pWithId.setAttribute("id", "test-id");
  spanWithNothing = document.createElement("span");
  divUnderSpan = document.createElement("div");

  document.body.appendChild(divWithClass);
  divWithClass.appendChild(pWithId);
  pWithId.appendChild(spanWithNothing);
  spanWithNothing.appendChild(divUnderSpan);
  */
});

afterEach(() => {
  document.clear();
  /*
  spanWithNothing.removeChild(divUnderSpan);
  pWithId.removeChild(spanWithNothing);
  divWithClass.removeChild(pWithId);
  document.body.removeChild(divWithClass);
  */
});

describe("CSS Selector Selection reducer", () => {
  it("Test initial state", () => {
    expect(SelectionReducer(undefined, {})).toEqual(initialState);
  });

  it("Test SET_MOUSEOVER_ELEMENT and SET_MOUSEOUT_ELEMENT", () => {
    const testElement = document.documentElement;
    let nextState = SelectionReducer(initialState, {
      type: Actions.SET_MOUSEOVER_ELEMENT,
      payload: { element: testElement },
    });
    expect(nextState.selectionState.lastMouseoverElement).toBe(testElement);
    nextState = SelectionReducer(initialState, {
      type: Actions.SET_MOUSEOUT_ELEMENT,
      payload: { element: testElement },
    });
    expect(nextState.selectionState.lastMouseoverElement).toBe(null);
  });

  it("Test ONLY_SELECT_SELECTED_ELEMENT", () => {
    const testElement = document.documentElement;
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: testElement,
        finderSettings: finderSettings,
        rootElement: null,
      },
    });
    expect(nextState.selectionState.lastClickedElement).toBe(testElement);
    expect(nextState.selectionState.generatedSelector).toEqual("html");
    expect(nextState.selectedElements.length).toEqual(1);
    expect(nextState.selectedElements[0].element).toBe(testElement);
  });

  it("Test CHANGE_SELECTOR_ROOT", () => {
    const testElement = document.documentElement;
    const nextState = SelectionReducer(initialState, {
      type: Actions.CHANGE_SELECTOR_ROOT,
      payload: { value: testElement },
    });
    expect(nextState.selectionState.tempSelectorRoot).toBe(testElement);
  });

  it("Test DO_TEST_SELECTOR_HIGHLIGHT", () => {
    let nextState = SelectionReducer(
      {
        ...initialState,
        selectionState: {
          ...initialState.selectionState,
          tempSelector: "div",
          tempSelectedElements: [],
        },
      },
      {
        type: Actions.DO_TEST_SELECTOR_HIGHLIGHT,
      }
    );
    expect(nextState.selectionState.tempSelectedElements.length).toBe(2);
    expect(
      nextState.selectionState.tempSelectedElements[0].element.tagName
    ).toEqual("DIV");
    expect(
      nextState.selectionState.tempSelectedElements[1].element.tagName
    ).toEqual("DIV");
  });

  it("Test selector generation by varying isClassEnabled/classFilter setting", () => {
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: finderSettings,
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(".test-class");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: { ...finderSettings, isClassEnabled: false },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      "div:nth-child(1)"
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: { ...finderSettings, classFilter: ["test-class"] },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      "div:nth-child(1)"
    );
  });

  it("Test selector generation by varying isIdEnabled/idFilter setting", () => {
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: pWithId,
        finderSettings: finderSettings,
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("#test-id");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: pWithId,
        finderSettings: { ...finderSettings, isIdEnabled: false },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      "p:nth-child(1)"
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: pWithId,
        finderSettings: { ...finderSettings, idFilter: ["test-id"] },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      "p:nth-child(1)"
    );
  });

  it("Test selector generation by varying isTagEnabled/tagFilter setting", () => {
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: finderSettings,
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("span");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: { ...finderSettings, isTagEnabled: false },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("#test-id > *");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: {
          ...finderSettings,
          isIdEnabled: false,
          isTagEnabled: false,
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      ".test-class > * > *"
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: {
          ...finderSettings,
          tagFilter: ["span"],
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("#test-id > *");
  });

  it("Test selector generation by varying isAttributeEnabled/attributeFilter setting", () => {
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: { ...finderSettings, isAttributeEnabled: true },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("span");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: {
          ...finderSettings,
          isAttributeEnabled: true,
          attributeFilter: ['"custom" = "*"'],
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      '[custom="customvalue"]'
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: {
          ...finderSettings,
          isAttributeEnabled: true,
          attributeFilter: ['"custom" = "customvalue"'],
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      '[custom="customvalue"]'
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: spanWithNothing,
        finderSettings: {
          ...finderSettings,
          isAttributeEnabled: true,
          attributeFilter: ['"custom" = "randomrandom"'],
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("span");
  });

  it("Test selector generation after setting a selector root", () => {
    let nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: finderSettings,
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(".test-class");

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: {
          ...finderSettings,
          isClassEnabled: false,
          isIdEnabled: false,
        },
        rootElement: null,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual(
      "div:nth-child(1)"
    );

    nextState = SelectionReducer(initialState, {
      type: Actions.ONLY_SELECT_SELECTED_ELEMENT,
      payload: {
        element: divWithClass,
        finderSettings: {
          ...finderSettings,
          isClassEnabled: false,
          isIdEnabled: false,
        },
        rootElement: divWithClass,
      },
    });
    expect(nextState.selectionState.generatedSelector).toEqual("div");
  });
});
