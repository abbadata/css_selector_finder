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

  return (
    <FieldInfo ref={panelRef}>
      <div className="sidepanel">Test 321</div>
    </FieldInfo>
  );
};

export default BottomPanel;
