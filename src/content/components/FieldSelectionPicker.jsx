import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  background-color: lightgrey;
  color: black;
  margin-top: 5px;
  font-weight: bold;
`;
const Entry = styled.div`
  color: blue;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 2px;
  text-align: left;
  width: 100%;
`;

const FieldSelectionPicker = () => {
  const finderSettings = useSelector((state) => state.finder.settings);
  const rootElement = useSelector(
    (state) => state.selection.selectionState.selectorRoot
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Header>Modify Selector</Header>
      <Entry
        onClick={() =>
          dispatch({
            type: "CHANGE_SELECTION_TO_PARENT",
            payload: {
              finderSettings: finderSettings,
              rootElement: rootElement,
            },
          })
        }
      >
        Select Parent Element
      </Entry>
      <Entry
        onClick={() =>
          dispatch({
            type: "CHANGE_SELECTION_TO_FIRST_CHILD",
            payload: {
              finderSettings: finderSettings,
              rootElement: rootElement,
            },
          })
        }
      >
        Select First Child Element
      </Entry>
      <Entry
        onClick={() =>
          dispatch({
            type: "CHANGE_SELECTION_TO_NEXT_SIBLING",
            payload: {
              finderSettings: finderSettings,
              rootElement: rootElement,
            },
          })
        }
      >
        Select Next Sibling Element
      </Entry>
      <Entry
        onClick={() =>
          dispatch({
            type: "CHANGE_SELECTION_TO_PREV_SIBLING",
            payload: {
              finderSettings: finderSettings,
              rootElement: rootElement,
            },
          })
        }
      >
        Select Previous Sibling Element
      </Entry>
    </div>
  );
};

export default FieldSelectionPicker;
