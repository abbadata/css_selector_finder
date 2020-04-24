function logErrorsToConsoleAction(clearAction) {
  return (dispatch, getState) => {
    const state = getState();
    const selectionErrors = state.selection.errorMessages;
    if (selectionErrors !== "") {
      dispatch({
        type: "LOG_ERRORS_TO_CONSOLE",
        payload: {
          selectionErrors,
        },
      });
      dispatch(clearAction);
    }
  };
}

function clearSelectionErrorsAction() {}

function onlySelectSelectedElement(element) {
  return function (dispatch, getState) {
    dispatch({ type: "ONLY_SELECT_SELECTED_ELEMENT", payload: { element } });
    dispatch(logErrorsToConsole);
  };
}
