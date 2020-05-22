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
const Property = styled.div`
  display: flex;
`;
const PropertyText = styled.div`
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
const PropertyValue = styled.input`
  display: inline;
  flex-grow: 0;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  background-color: #ddd;
`;

const FieldSummary = ({ selectedElements }) => {
  return (
    <div>
      <Header>Element Summary</Header>
      <Property>
        <PropertyText>Tag Type</PropertyText>
        <PropertyValue
          type="text"
          value={selectedElements[0] ? selectedElements[0].elemtype : ""}
          readOnly
        ></PropertyValue>
      </Property>
      <Property>
        <PropertyText>HTML value</PropertyText>
        <PropertyValue
          type="text"
          value={selectedElements[0] ? selectedElements[0].html : ""}
          readOnly
        ></PropertyValue>
      </Property>
      <Property>
        <PropertyText>Text value</PropertyText>
        <PropertyValue
          type="text"
          value={selectedElements[0] ? selectedElements[0].text : ""}
          readOnly
        ></PropertyValue>
      </Property>
      <Property>
        <PropertyText>HREF</PropertyText>
        <PropertyValue
          type="text"
          value={selectedElements[0] ? selectedElements[0].href ?? "" : ""}
          readOnly
        ></PropertyValue>
      </Property>
    </div>
  );
};

export default FieldSummary;
