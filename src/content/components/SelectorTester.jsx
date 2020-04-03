import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Tester = styled.div`
  display: flex;
`;
const Label = styled.div`
  display: inline-block;
  color: black;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding: 2px;
  padding-right: 5px;
  text-align: left;
  flex-grow: 0;
`;
const Value = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 400px;
  background-color: #ddd;
`;
const TestButton = styled.div`
  display: inline;
  color: black;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding: 2px;
  padding-right: 5px;
  text-align: left;
  flex-grow: 0;
`;

const SelectorTester = () => {
  const tempSelector = useSelector(
    state => state.PluginReducer.selectionState.tempSelector
  );
  const dispatch = useDispatch();
  return (
    <Tester>
      <Label>Enter Selector to Test:</Label>
      <Value
        type="text"
        value={tempSelector}
        onChange={e =>
          dispatch({
            type: "SET_TEMP_SELECTOR",
            payload: { value: e.target.value }
          })
        }
      ></Value>
      <TestButton
        onClick={() =>
          dispatch({
            type: "DO_TEST_SELECTOR_HIGHLIGHT"
          })
        }
      >
        Test
      </TestButton>
      <TestButton
        onClick={() =>
          dispatch({
            type: "STOP_TEST_SELECTOR_HIGHLIGHT"
          })
        }
      >
        Deselect
      </TestButton>
    </Tester>
  );
};

export default SelectorTester;
