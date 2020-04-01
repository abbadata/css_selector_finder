import React from "react";
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
  return (
    <div>
      <Header>Modify Selector</Header>
      <Entry>Select Parent Element</Entry>
      <Entry>Select First Child Element</Entry>
      <Entry>Select Next Sibling Element</Entry>
      <Entry>Select Previous Sibling Element</Entry>
    </div>
  );
};

export default FieldSelectionPicker;
