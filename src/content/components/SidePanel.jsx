/*global chrome*/
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FieldSummary from "./FieldSummary";
import FieldSelectionPicker from "./FieldSelectionPicker";
import FieldSelectionRoot from "./FieldSelectionRoot";
import FieldSelector from "./FieldSelector";

const FieldOptions = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2147483647;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 200px;
  width: 300px;
  background-color: white;
  overflow: auto;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.6);
`;

const Header = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 150%;
`;

const MoveRightArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB0SURBVChTY6A5YIbSuEAFEMsC8RUwDwiYoDQuwA7Ey4A4AMwDAkYo7QPExhAmCnCAYhDwBOIdMA0/gZgNwsQLrAg5CRl8BxEwGwKBWA/CRAEwJ4FcEA7EG4EYL6gH4t9AHAXmAQEhJ4FMzgRiUEjRBTAwAADoWQ1/0c/llAAAAABJRU5ErkJggg==)
    top left no-repeat;
  )margin: 0;
  padding: 0;
`;

const MoveLeftArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABxSURBVChTY6A7SAHiCggTO2CC0iAQBcTTgZgdzMMBGKG0PxCvBGKQ4gNQjA4uAfF6EMMSiL8B8X8C+CcQw53ECaUJApiTPIB4O4SJ00lngXgLhAkBAUAMsroezMMBmKE0CNwA4ltAzAPER0ACAwEYGAB01RhX98zElQAAAABJRU5ErkJggg==)
    top left no-repeat;
  )margin: 0;
  padding: 0;
`;

const CenteredDiv = styled.div`
  margin-top: 50px;
  text-align: center;
  width: 100%;
`;

const ExitButton = styled.a`
  box-shadow: 0px 0px 0px 2px #9fb4f2;
  background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color: #7892c2;
  border-radius: 10px;
  border: 1px solid #4e6096;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 19px;
  padding: 12px 37px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #283966;

  &:hover {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const SidePanel = ({ handleExit }) => {
  const vertPanelPosition = useSelector((state) => state.ui.vertPanelPosition);
  const horizPanelPosition = useSelector(
    (state) => state.ui.horizPanelPosition
  );
  const selectedElements = useSelector(
    (state) => state.PluginReducer.selectedElements
  );
  const vertPanelDiv = useSelector((state) => state.ui.vertPanelDiv);

  const dispatch = useDispatch();
  const panelRef = useRef();

  useEffect(() => {
    dispatch({
      type: "SET_VERT_PANEL_DIV",
      payload: { element: panelRef.current },
    });
  }, [vertPanelDiv]);

  function getMovePanel() {
    if (vertPanelPosition === "right") {
      return <MoveLeftArrow onClick={moveToLeft}></MoveLeftArrow>;
    } else if (vertPanelPosition === "left") {
      return <MoveRightArrow onClick={moveToRight}></MoveRightArrow>;
    } else {
      console.log("Unknown value for vertPanelPosition");
    }
  }
  function moveToRight(e) {
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: { element: panelRef.current, position: "right" },
    });
  }
  function moveToLeft(e) {
    console.log("moveToLeft: ", panelRef);
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: { element: panelRef.current, position: "left" },
    });
  }
  function getFieldOptionsHtml() {
    if (selectedElements.length === 0) {
      return <div>Select at least one element.</div>;
    } else if (selectedElements.length === 1) {
      console.log("SelectedElements: ", selectedElements);
      return (
        <div>
          <FieldSelector></FieldSelector>
          <FieldSummary selectedElements={selectedElements}></FieldSummary>
          <FieldSelectionRoot></FieldSelectionRoot>
          <FieldSelectionPicker></FieldSelectionPicker>
        </div>
      );
    } else {
      return <div>Selected More Than One Element</div>;
    }
  }

  return (
    <FieldOptions ref={panelRef}>
      {getMovePanel()}
      <Header>ABBAdata Selector Spy</Header>
      {getFieldOptionsHtml()}
      <CenteredDiv>
        <ExitButton
          onClick={() => {
            handleExit();
          }}
        >
          Exit
        </ExitButton>
      </CenteredDiv>
    </FieldOptions>
  );
};

export default SidePanel;
