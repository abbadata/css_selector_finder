import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Chooser = styled.div`
  display: flex;
`;
const ChooserText = styled.div`
  display: inline-block;
  color: blue;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 2px;
  padding-right: 5px;
  text-align: left;
  flex-grow: 0;
`;
const ChooserValue = styled.input`
  display: inline;
  flex-grow: 0;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  background-color: #ddd;
`;

const TextChooser = ({ text, value, selectfunc }) => {
  function getChooserTextHtml() {
    if (text) {
      return <ChooserText onClick={() => selectfunc()}>{text}</ChooserText>;
    } else {
      return "";
    }
  }

  return (
    <Chooser>
      {getChooserTextHtml()}
      <ChooserValue type="text" value={value} readOnly />
    </Chooser>
  );
};

export default TextChooser;
