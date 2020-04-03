import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
var escapeHtml = require("escape-html");
import SelectorTester from "./SelectorTester";

const FieldInfo = styled.div`
  z-index: 2147483647;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 200px;
  width: 100%;
  /*border: 1px solid gray;*/
  background-color: white;
  /*overflow: auto;*/
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.6);
`;
const SubPanel = styled.div`
  position: absolute;
  overflow: auto;
  top: 40px;
  bottom: 0;
  font-size: 80%;
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
  const bottomTabIndex = useSelector(
    state => state.PluginReducer.finderUi.bottomTabIndex
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

  function getHtmlPanel() {
    if (selectedElements.length > 0) {
      return (
        <div
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: escapeHtml(formatXml(selectedElements[0].html.trim()))
          }}
        ></div>
      );
    } else {
      return <div></div>;
    }
  }

  function formatXml(xml) {
    const PADDING = " ".repeat(2); // set desired indent size here
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;

    xml = xml.replace(reg, "$1\r\n$2$3");

    return xml
      .split("\r\n")
      .map((node, index) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/) && pad > 0) {
          pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        pad += indent;

        return PADDING.repeat(pad - indent) + node;
      })
      .join("\r\n");
  }

  return (
    <FieldInfo ref={panelRef}>
      {getMovePanel()}
      <Tabs
        selectedIndex={bottomTabIndex}
        onSelect={tabIndex =>
          dispatch({ type: "SET_BOTTOM_TAB_INDEX", payload: { tabIndex } })
        }
      >
        <TabList>
          <Tab>Info</Tab>
          <Tab>Selector</Tab>
          <Tab>HTML</Tab>
        </TabList>
        <TabPanel>
          <div>Placeholder for info view</div>
        </TabPanel>
        <TabPanel>
          <SubPanel>
            <SelectorTester></SelectorTester>
          </SubPanel>
        </TabPanel>
        <TabPanel>
          <SubPanel>{getHtmlPanel()}</SubPanel>
        </TabPanel>
      </Tabs>
    </FieldInfo>
  );
};

export default BottomPanel;
