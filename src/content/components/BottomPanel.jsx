import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";

const FieldInfo = styled.div`
  z-index: 2147483647;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 200px;
  width: 100%;
  /*border: 1px solid gray;*/
  background-color: white;
  overflow: auto;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.6);
`;

const BottomPanel = () => {
  const vertPanelPosition = useSelector(
    state => state.PluginReducer.finderUi.vertPanelPosition
  );
  const horizPanelPosition = useSelector(
    state => state.PluginReducer.finderUi.horizPanelPosition
  );
  const selectedElements = useSelector(
    state => state.PluginReducer.selectedElements
  );
  const dispatch = useDispatch();
  const panelRef = useRef();

  function getMovePanel() {
    if (horizPanelPosition === "bottom") {
      return <div onClick={moveToTop} className="move-up-arrow"></div>;
    } else if (horizPanelPosition === "top") {
      return <div onClick={moveToBottom} className="move-down-arrow"></div>;
    } else {
      console.log("Unknown value for horizPanelPosition");
    }
  }
  function moveToTop(e) {
    dispatch({
      type: "SET_HORIZ_PANEL_POSITION",
      payload: { element: panelRef.current, position: "top" }
    });
  }
  function moveToBottom(e) {
    dispatch({
      type: "SET_HORIZ_PANEL_POSITION",
      payload: { element: panelRef.current, position: "bottom" }
    });
  }

  return (
    <FieldInfo ref={panelRef}>
      {getMovePanel()}
      <Tabs>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Selector</Tab>
        </TabList>
        <TabPanel>
          <div>Placeholder for info view</div>
        </TabPanel>
        <TabPanel>
          <div>Placeholder for selector view</div>
        </TabPanel>
      </Tabs>
      <div className="sidepanel">Test 321</div>
      <div onClick={moveToTop}>Top</div>
      <div onClick={moveToBottom}>Bottom</div>
    </FieldInfo>
  );
};

export default BottomPanel;
