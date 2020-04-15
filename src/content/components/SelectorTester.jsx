import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Tester = styled.div`
  display: flex;
`;
const Label = styled.div`
  display: inline-block;
  color: white;
  border: 1px solid #7892c2;
  background: #7892c2;
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
  background-color: #fff;
`;
const TestButton = styled.div`
  display: inline;
  color: white;
  border: 1px solid #7892c2;
  background: #7892c2;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding: 2px;
  padding-right: 5px;
  margin-left: 2px;
  text-align: left;
  flex-grow: 0;
`;

const SelectorTester = () => {
  const tempSelector = useSelector(
    (state) => state.PluginReducer.selectionState.tempSelector
  );
  const tempSelectedElements = useSelector(
    (state) => state.PluginReducer.selectionState.tempSelectedElements
  );
  const dispatch = useDispatch();

  function getSelectorInfo() {
    if (tempSelectedElements !== null) {
      if (tempSelectedElements.length > 0) {
        return <div>{tempSelectedElements.length} elements selected.</div>;
      } else {
        return <div>No elements selected.</div>;
      }
    }
  }

  return (
    <div>
      <Tester>
        <Label>Enter Selector:</Label>
        <Value
          type="text"
          value={tempSelector}
          onChange={(e) =>
            dispatch({
              type: "SET_TEMP_SELECTOR",
              payload: { value: e.target.value },
            })
          }
        ></Value>
        <TestButton
          onClick={() =>
            dispatch({
              type: "DO_TEST_SELECTOR_HIGHLIGHT",
            })
          }
        >
          Test
        </TestButton>
        <TestButton
          onClick={() =>
            dispatch({
              type: "STOP_TEST_SELECTOR_HIGHLIGHT",
            })
          }
        >
          Deselect
        </TestButton>
      </Tester>
      <br></br>
      <div>{getSelectorInfo()}</div>
    </div>
  );
};

export default SelectorTester;
