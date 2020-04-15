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

const FieldSelector = () => {
  const generatedSelector = useSelector(
    (state) => state.PluginReducer.selectionState.generatedSelector
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Header>Selector</Header>
      <TextChooser value={generatedSelector} onClick={() => {}}></TextChooser>
      <input
        type="button"
        value="Copy to Clipboard"
        onClick={() => {
          dispatch({ type: "COPY_SELECTOR_TO_CLIPBOARD" });
        }}
      ></input>
      <input
        type="button"
        value="Use as Selector Root"
        onClick={() => {
          dispatch({ type: "USE_AS_SELECTOR_ROOT" });
        }}
      ></input>
    </div>
  );
};

export default FieldSelector;
