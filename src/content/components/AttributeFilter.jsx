import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const ListMain = styled.div`
  padding: 0px;
`;

const TopDiv = styled.div``;

const ListEntry = styled.div`
  display: inline;
  color: black;
  padding: 3px;
`;

const ListDiv = styled.div`
  border: 1px solid #000;
  overflow: auto;
  color: black;
  padding: 3px;
  width: 200px;
  height: 50px;
`;

const AddButton = styled.div`
  display: inline;
  color: white;
  border: 1px solid #ccc;
  background: #7892c2;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding-left: 2px;
  padding-right: 2px;
  text-align: left;
  flex-grow: 0;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  display: inline;
  color: white;
  border: 1px solid #ccc;
  background: #7892c2;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding: 2px;
  text-align: left;
  width: 10rem;
  cursor: pointer;
`;

const Value = styled.input`
  display: inline;
  padding-left: 2px;
  padding-right: 2px;
  text-align: left;
  width: 4rem;
  background-color: #fff;
`;

const AttributeFilter = ({ listState, onAddHandler, onDeleteHandler }) => {
  const [addName, setAddName] = useState("");
  const [addValue, setAddValue] = useState("");

  function getListHtml() {
    return listState.map((e, index) => {
      return (
        <div>
          <DeleteButton
            className="delete-button"
            onClick={() => {
              deleteHandler(e);
            }}
          >
            X
          </DeleteButton>
          <ListEntry className="list-entry" key={e}>
            {e}
          </ListEntry>
        </div>
      );
    });
  }

  function addHandler() {
    onAddHandler(addName, addValue);
    setAddName("");
    setAddValue("");
  }

  function deleteHandler(value) {
    onDeleteHandler(value);
  }

  return (
    <ListMain>
      <TopDiv>
        Name:
        <Value
          className="add-field"
          type="text"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        ></Value>
        =
        <Value
          className="add-field"
          type="text"
          value={addValue}
          onChange={(e) => setAddValue(e.target.value)}
        ></Value>
        <AddButton
          className="add-button"
          onClick={() => {
            addHandler();
          }}
        >
          Add
        </AddButton>
      </TopDiv>
      <ListDiv className="listdiv">{getListHtml()}</ListDiv>
    </ListMain>
  );
};

export default AttributeFilter;
