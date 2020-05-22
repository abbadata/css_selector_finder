import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TextChooser from "./TextChooser";
import * as Types from "../Types";

const RootHeader = styled.div`
  width: 100%;
  background-color: lightgrey;
  color: black;
  margin-top: 5px;
  font-weight: bold;
`;

const RootHeaderNonDefault = styled.div`
  width: 100%;
  color: black;
  margin-top: 5px;
  font-weight: bold;
  background-color: rgb(139, 255, 168);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 15px,
    rgba(255, 255, 255, 0.5) 15px,
    rgba(255, 255, 255, 0.5) 30px
  );
`;

const FieldSelectionRoot = () => {
  const selectorRoot = useSelector(
    (state) => state.selection.selectionState.selectorRoot
  );
  const tempSelectorRoot = useSelector(
    (state) => state.selection.selectionState.tempSelectorRoot
  );
  const selectorRootEditMode = useSelector(
    (state) => state.selection.selectionState.selectorRootEditMode
  );

  const dispatch = useDispatch();

  function getRootSelectorLabel() {
    if (selectorRoot == Types.DEFAULT_SELECTOR_ROOT) {
      return <RootHeader>Selector Root</RootHeader>;
    } else {
      return <RootHeaderNonDefault>Selector Root:</RootHeaderNonDefault>;
    }
  }

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
      {getRootSelectorLabel()}
      {getSelectorRootHtml()}
    </div>
  );
};

export default FieldSelectionRoot;
