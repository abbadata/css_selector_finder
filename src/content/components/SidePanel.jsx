/*global chrome*/
import React, { useRef } from "react";
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
  const dispatch = useDispatch();
  const panelRef = useRef();

  return (
    <FieldOptions ref={panelRef}>
      <div className="bottompanel">Test 321</div>
    </FieldOptions>
  );
};

export default SidePanel;
