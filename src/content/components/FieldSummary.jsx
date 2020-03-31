import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import TextChooser from "./TextChooser";

const Header = styled.div`
  width: 100%;
  background-color: lightgrey;
  color: black;
  margin-top: 5px;
  font-weight: bold;
`;

const FieldSummary = ({ selectedElements }) => {
  return (
    <div>
      <Header>Field Summary</Header>
      <TextChooser
        text="Field Type"
        value={selectedElements[0].elemtype}
        selectfunc={() => {}}
      ></TextChooser>
      <TextChooser
        text="HTML value"
        value={selectedElements[0].html}
        selectfunc={() => {}}
      ></TextChooser>
      <TextChooser
        text="Text value"
        value={selectedElements[0].text}
        selectfunc={() => {}}
      ></TextChooser>
    </div>
  );
};

export default FieldSummary;
