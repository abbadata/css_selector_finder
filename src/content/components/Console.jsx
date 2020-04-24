import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

const MsgUl = styled.ul`
  padding-inline-start: 5px;
`;

const Msg = styled.li`
  color: black;
`;

const ErrorMsgKeyframe = keyframes`
  0% {
    background-color: #EB7E91;
  }
  100% {
    background-color: #fff;
  }
`;

const ErrorMsg = styled.li`
  color: red;
  background-color: #fff;
  animation: ${ErrorMsgKeyframe} 2s ease-in-out 0s;
`;

const Console = ({ consoleDivRef }) => {
  const consoleMessages = useSelector((state) => state.global.consoleMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    consoleDivRef.current.scrollTop = consoleDivRef.current.scrollHeight;
  });

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
