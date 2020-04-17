import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const ListMain = styled.div`
  padding: 0px;
`;

const TopDiv = styled.div`
  display: flex;
`;

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

  ${(props) =>
    !props.enabled &&
    css`
      background-color: #999;
      pointer-events: none;
    `};
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

  ${(props) =>
    !props.enabled &&
    css`
      background-color: #999;
      pointer-events: none;
    `};
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
  width: 10rem;
  background-color: #fff;
  flex-grow: 1;

  ${(props) =>
    !props.enabled &&
    css`
      background-color: #999;
      pointer-events: none;
    `};
`;

const EntryList = ({ listState, onAddHandler, onDeleteHandler, enabled }) => {
  const [addValue, setAddValue] = useState("");
  const inputElem = useRef(null);

  function getListHtml() {
    console.log("LISTSTATE: ", listState);
    return listState.map((e, index) => {
      return (
        <div>
          <DeleteButton
            onClick={() => {
              deleteHandler(e);
            }}
          >
            X
          </DeleteButton>
          <ListEntry>{e}</ListEntry>
        </div>
      );
    });
  }

  function addHandler() {
    onAddHandler(addValue);
    setAddValue("");
  }

  function deleteHandler(value) {
    onDeleteHandler(value);
  }

  return (
    <ListMain>
      <TopDiv>
        <Value
          enabled={enabled}
          type="text"
          value={addValue}
          ref={inputElem}
          onChange={(e) => setAddValue(e.target.value)}
        ></Value>
        <AddButton
          enabled={enabled}
          onClick={() => {
            addHandler();
          }}
        >
          Add Filter
        </AddButton>
      </TopDiv>
      <ListDiv enabled={enabled}>{getListHtml()}</ListDiv>
    </ListMain>
  );
};

export default EntryList;
