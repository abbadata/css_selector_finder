import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const MsgUl = styled.ul`
  padding-inline-start: 5px;
`;

const Msg = styled.li`
  color: black;
`;

const ErrorMsg = styled.li`
  color: red;
`;

const Console = ({ consoleDivRef }) => {
  const consoleMessages = useSelector(
    (state) => state.PluginReducer.consoleMessages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    consoleDivRef.current.scrollTop = consoleDivRef.current.scrollHeight;
  });

  console.log("CONSOLE: ", consoleMessages);
  let msgs = consoleMessages.map((item, key) => {
    let dt = new Date(item.time);
    let dtString = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
    if (item.type === 0) {
      return (
        <Msg>
          {dtString}: {item.message}
        </Msg>
      );
    } else if (item.type === 1) {
      return (
        <ErrorMsg>
          {dtString}: {item.message}
        </ErrorMsg>
      );
    }
  });

  return (
    <div>
      <MsgUl>{msgs}</MsgUl>
      <input
        type="button"
        value="Clear Console"
        onClick={() => {
          dispatch({ type: "CLEAR_CONSOLE" });
        }}
      ></input>
    </div>
  );
};

export default Console;
