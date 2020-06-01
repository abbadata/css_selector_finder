import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isDescendant } from "../lib/SelectorUtils";
import * as SelectionActions from "../actions/SelectionActions";

const Header = styled.div`
  width: 100%;
  background-color: lightgrey;
  color: black;
  margin-top: 5px;
  font-weight: bold;
`;
const ChildHeader = styled.div`
  width: 100%;
  background-color: #c3ea84;
  color: black;
  text-align: center;
`;
const Centered = styled.div`
  width: 100%;
  text-align: center;
`;
const SelfLine = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  display: flex;
`;
const SelfDiv = styled.div`
  display: inline-block;
  text-align: center;
`;
const SiblingDiv = styled.div`
  display: inline-block;
  flex: 1;
  text-align: center;
  padding-top: 2px;
`;
const Inlined = styled.div`
  display: inline-block;
  text-align: center;
  background-color: #bfe8ec;
`;
const ClickableTag = styled.div`
  display: inline-block;
  color: #444;
  padding: 3px;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 70%;
  vertical-align: middle;
  text-align: center;
  background-color: #ddd;
`;
const SelfTag = styled.div`
  display: inline-block;
  color: #444;
  padding: 3px;
  border: 3px solid #000;
  font-size: 70%;
  vertical-align: middle;
  text-align: center;
  background-color: #ddd;
`;
const SelectorRootTag = styled.div`
  display: inline-block;
  color: #444;
  padding: 3px;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 70%;
  vertical-align: middle;
  text-align: center;
  background-color: rgb(139, 255, 168);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 15px,
    rgba(255, 255, 255, 0.5) 15px,
    rgba(255, 255, 255, 0.5) 30px
  );
`;

const FieldSelectionPicker = ({ selectedElements }) => {
  const finderSettings = useSelector((state) => state.finder.settings);
  const rootElement = useSelector(
    (state) => state.selection.selectionState.selectorRootElement
  );
  const lastClickedElement = useSelector(
    (state) => state.selection.selectionState.lastClickedElement
  );
  const dispatch = useDispatch();

  function handleMouseover(e, targetElement) {
    if (
      !isDescendant(
        document.getElementById("abba-content-page-app"),
        targetElement
      )
    ) {
      const navElement = e.target || e.srcElement;
      navElement.style.background = "yellow";
      dispatch({
        type: SelectionActions.SET_MOUSEOVER_ELEMENT,
        payload: { element: targetElement },
      });
    }
  }
  function handleMouseout(e, targetElement) {
    if (
      !isDescendant(
        document.getElementById("abba-content-page-app"),
        targetElement
      )
    ) {
      const navElement = e.target || e.srcElement;
      navElement.style.background = "#dddddd";
      dispatch({
        type: SelectionActions.SET_MOUSEOUT_ELEMENT,
        payload: { element: targetElement },
      });
    }
  }
  function handleClick(e, targetElement) {
    if (
      !isDescendant(
        document.getElementById("abba-content-page-app"),
        targetElement
      )
    ) {
      dispatch({
        type: SelectionActions.ONLY_SELECT_SELECTED_ELEMENT,
        payload: {
          element: targetElement,
          finderSettings: finderSettings,
          rootElement: rootElement,
        },
      });
    }
  }
  function getParentSection() {
    parent = selectedElements[0]
      ? selectedElements[0].element.parentElement
      : null;
    if (parent) {
      if (parent === rootElement) {
        return (
          <Centered>
            <SelectorRootTag>{parent.tagName} - Selector Root</SelectorRootTag>
          </Centered>
        );
      } else {
        return (
          <Centered>
            <ClickableTag
              onMouseOver={(e) => handleMouseover(e, parent)}
              onMouseOut={(e) => handleMouseout(e, parent)}
              onClick={(e) => handleClick(e, parent)}
            >
              {parent.tagName}
            </ClickableTag>
          </Centered>
        );
      }
    } else {
      return <Centered>NONE</Centered>;
    }
  }
  function getPrevSibling() {
    const sibling = selectedElements[0]
      ? selectedElements[0].element.previousElementSibling
      : null;
    if (sibling) {
      return (
        <ClickableTag
          onMouseOver={(e) => handleMouseover(e, sibling)}
          onMouseOut={(e) => handleMouseout(e, sibling)}
          onClick={(e) => handleClick(e, sibling)}
        >
          {sibling.tagName}
        </ClickableTag>
      );
    } else {
      return <div>NONE</div>;
    }
    return <div></div>;
  }
  function getNextSibling() {
    const sibling = selectedElements[0]
      ? selectedElements[0].element.nextElementSibling
      : null;
    if (sibling) {
      return (
        <ClickableTag
          onMouseOver={(e) => handleMouseover(e, sibling)}
          onMouseOut={(e) => handleMouseout(e, sibling)}
          onClick={(e) => handleClick(e, sibling)}
        >
          {sibling.tagName}
        </ClickableTag>
      );
    } else {
      return <div>NONE</div>;
    }
    return <div></div>;
  }
  function getSelfSection() {
    return (
      <SelfLine>
        <SiblingDiv>{getPrevSibling()}</SiblingDiv>
        <SelfDiv>
          <Inlined>{"\u25C0"}</Inlined>
          <SelfTag>
            {selectedElements[0] ? selectedElements[0].element.tagName : ""}
          </SelfTag>
          <Inlined>{"\u25B6"}</Inlined>
        </SelfDiv>
        <SiblingDiv>{getNextSibling()}</SiblingDiv>
      </SelfLine>
    );
  }
  function getChildSection() {
    let children = selectedElements[0]
      ? selectedElements[0].element.children
      : [];
    if (children.length === 0) {
      return <Centered>NONE</Centered>;
    }
    let tags = [];
    Array.from(children).forEach((node, index) => {
      tags.push(
        <ClickableTag
          onMouseOver={(e) => handleMouseover(e, node)}
          onMouseOut={(e) => handleMouseout(e, node)}
          onClick={(e) => handleClick(e, node)}
        >
          {node.tagName}
        </ClickableTag>
      );
    });
    return <Centered>{tags}</Centered>;
  }
  return (
    <div>
      <Header>Modify Selection</Header>
      {getParentSection()}
      <ChildHeader>
        {"\u25B2\u25B2"}&nbsp;Parent&nbsp;{"\u25B2\u25B2"}
      </ChildHeader>
      {getSelfSection()}
      <ChildHeader>
        {"\u25BC\u25BC"}&nbsp;Children&nbsp;{"\u25BC\u25BC"}
      </ChildHeader>
      {getChildSection()}
    </div>
  );
};

export default FieldSelectionPicker;
