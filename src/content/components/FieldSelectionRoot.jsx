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
    state => state.PluginReducer.selectionState.selectorRoot
  );
  const selectedElements = useSelector(
    state => state.PluginReducer.selectedElements
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Header>Selector Root</Header>
      <input
        type="text"
        value={selectorRoot}
        onClick={e =>
          dispatch({
            type: "SET_SELECTOR_ROOT",
            payload: { value: e.target.value }
          })
        }
      ></input>
      <Header>Selectors</Header>
      <TextChooser
        text="Short Selector"
        value={selectedElements[0].shortselector}
        selectfunc={() => {}}
      ></TextChooser>
      <TextChooser
        text="Long Selector"
        value={selectedElements[0].longselector}
        selectfunc={() => {}}
      ></TextChooser>
    </div>
  );
};

export default FieldSelectionRoot;
