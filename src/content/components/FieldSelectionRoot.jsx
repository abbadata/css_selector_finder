import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TextChooser from "./TextChooser";

const Header = styled.div`
  width: 100%;
  background-color: lightgrey;
  color: black;
  margin-top: 5px;
  font-weight: bold;
`;

const FieldSelectionRoot = () => {
  const selectorRoot = useSelector(
    (state) => state.PluginReducer.selectionState.selectorRoot
  );
  const tempSelectorRoot = useSelector(
    (state) => state.PluginReducer.selectionState.tempSelectorRoot
  );
  const selectorRootEditMode = useSelector(
    (state) => state.PluginReducer.selectionState.selectorRootEditMode
  );

  const dispatch = useDispatch();

  function getSelectorRootHtml() {
    if (selectorRootEditMode) {
      return (
        <div>
          <input
            type="text"
            value={tempSelectorRoot}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_SELECTOR_ROOT",
                payload: { value: e.target.value },
              })
            }
          ></input>
          <input
            type="button"
            value="Save"
            onClick={() => {
              dispatch({ type: "SAVE_TEMP_SELECTOR_ROOT" });
            }}
          ></input>
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              dispatch({ type: "CANCEL_TEMP_SELECTOR_ROOT" });
            }}
          ></input>
        </div>
      );
    } else {
      return (
        <div>
          <input type="text" value={selectorRoot} disabled={true}></input>
          <input
            type="button"
            value="Edit"
            onClick={() => {
              dispatch({ type: "ENABLE_SELECTOR_ROOT_EDIT" });
            }}
          ></input>
          <input
            type="button"
            value="Reset"
            onClick={() => {
              dispatch({ type: "RESET_SELECTOR_ROOT" });
            }}
          ></input>
        </div>
      );
    }
  }

  return (
    <div>
      <Header>Selector Root</Header>
      {getSelectorRootHtml()}
    </div>
  );
};

export default FieldSelectionRoot;
