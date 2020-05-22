import * as Actions from "../actions/FinderActions";
import * as SelectionActions from "../actions/SelectionActions";
import FinderReducer from "./FinderReducer";

const initialState = {
  settings: {
    isClassEnabled: true,
    isIdEnabled: true,
    isTagEnabled: true,
    isAttributeEnabled: false,
    classFilter: [],
    idFilter: [],
    tagFilter: [],
    attributeFilter: [],
    seedMinLength: 1,
    optimizedMinLength: 2,
    threshhold: 1000,
    maxNumberOfTries: 10000,
  },
  errorMessage: "",
};

describe("CSS Selector Finder reducer", () => {
  it("Test initial state", () => {
    expect(FinderReducer(undefined, {})).toEqual(initialState);
  });

  it("Test SET_FINDER_CLASS_ENABLED", () => {
    const nextState = FinderReducer(initialState, {
      type: Actions.SET_FINDER_CLASS_ENABLED,
      payload: { enabled: false },
    });
    expect(nextState.settings.isClassEnabled).toEqual(false);
  });

  it("Test ADD_FINDER_CLASS_FILTER", () => {
    const nextState = FinderReducer(initialState, {
      type: Actions.ADD_FINDER_CLASS_FILTER,
      payload: { value: "TestClass" },
    });
    expect(nextState.settings.classFilter).toEqual(["TestClass"]);
  });

  it("Test ADD_FINDER_CLASS_FILTER with existing filtered entries", () => {
    const testState = {
      ...initialState,
      settings: { ...initialState.settings, classFilter: ["AAA", "BBB"] },
    };
    const nextState = FinderReducer(testState, {
      type: Actions.ADD_FINDER_CLASS_FILTER,
      payload: { value: "TestClass" },
    });
    expect(nextState.settings.classFilter).toEqual(["AAA", "BBB", "TestClass"]);
  });

  it("Test DELETE_FINDER_CLASS_FILTER", () => {
    const testState = {
      ...initialState,
      settings: {
        ...initialState.settings,
        classFilter: ["AAA", "TestClass", "BBB"],
      },
    };
    const nextState = FinderReducer(testState, {
      type: Actions.DELETE_FINDER_CLASS_FILTER,
      payload: { value: "TestClass" },
    });
    expect(nextState.settings.classFilter).toEqual(["AAA", "BBB"]);
  });
});
