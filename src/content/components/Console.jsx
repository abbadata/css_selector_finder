import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Console = () => {
  const consoleMessages = useSelector(
    (state) => state.PluginReducer.consoleMessages
  );

  let msgs = consoleMessages.map((item, key) => {
    return <li>{item.message}</li>;
  });

  return <ul>{msgs}</ul>;
};

export default Console;
