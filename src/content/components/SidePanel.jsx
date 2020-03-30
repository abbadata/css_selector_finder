/*global chrome*/
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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

const SidePanel = () => {
  const vertPanelPosition = useSelector(
    state => state.PluginReducer.finderUi.vertPanelPosition
  );
  const horizPanelPosition = useSelector(
    state => state.PluginReducer.finderUi.horizPanelPosition
  );
  const selectedElements = useSelector(
    state => state.PluginReducer.selectedElements
  );
  const vertPanelDiv = useSelector(
    state => state.PluginReducer.finderUi.vertPanelDiv
  );

  const dispatch = useDispatch();
  const panelRef = useRef();

  useEffect(() => {
    dispatch({
      type: "SET_VERT_PANEL_DIV",
      payload: { element: panelRef.current }
    });
  }, [vertPanelDiv]);

  function getMovePanel() {
    if (vertPanelPosition === "right") {
      // Doesn't seem to work as a styled component since reference to chrome extension via
      // chrome-extension://__MSG_@@extension_id__/images/arrow_right.jpg
      // does not get resolved properly
      //return <LeftArrow onClick={moveToLeft}></LeftArrow>;
      return <div onClick={moveToLeft} className="move-left-arrow"></div>;
    } else if (vertPanelPosition === "left") {
      return <div onClick={moveToRight} className="move-right-arrow"></div>;
    } else {
      console.log("Unknown value for vertPanelPosition");
    }
  }
  function moveToRight(e) {
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: { element: panelRef.current, position: "right" }
    });
  }
  function moveToLeft(e) {
    console.log("moveToLeft: ", panelRef);
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: { element: panelRef.current, position: "left" }
    });
  }

  return (
    <FieldOptions ref={panelRef}>
      {getMovePanel()}
      <div className="bottompanel">Test 321</div>
      <div onClick={moveToLeft}>Left</div>
      <div onClick={moveToRight}>Right</div>
    </FieldOptions>
  );
};

export default SidePanel;
