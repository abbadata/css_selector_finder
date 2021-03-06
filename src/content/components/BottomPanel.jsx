import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
var escapeHtml = require("escape-html");
import SelectorTester from "./SelectorTester";
import SelectorSettings from "./SelectorSettings";
import Console from "./Console";
import * as Types from "../Types";
import * as UiActions from "../actions/UiActions";
import * as GlobalActions from "../actions/GlobalActions";

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
  overflow-y: auto;
  top: 34px;
  bottom: 0;
  font-size: 80%;
  width: 100%;
`;
const MoveArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  margin: 0;
  padding: 2;
  cursor: pointer;
`;

const BottomPanel = () => {
  const vertPanelPosition = useSelector((state) => state.ui.vertPanelPosition);
  const horizPanelPosition = useSelector(
    (state) => state.ui.horizPanelPosition
  );
  const selectedElements = useSelector(
    (state) => state.selection.selectedElements
  );
  const bottomTabIndex = useSelector((state) => state.global.bottomTabIndex);
  const dispatch = useDispatch();
  const panelRef = useRef();
  const consoleRef = useRef();

  function getMovePanel() {
    if (horizPanelPosition === Types.HORIZPANEL_POS_BOTTOM) {
      return (
        <MoveArrow id="move-up-arrow" onClick={moveToTop}>
          {"\u25B2 "}
        </MoveArrow>
      );
    } else if (horizPanelPosition === Types.HORIZPANEL_POS_TOP) {
      return (
        <MoveArrow id="move-down-arrow" onClick={moveToBottom}>
          {"\u25BC "}
        </MoveArrow>
      );
    }
  }
  function moveToTop(e) {
    dispatch({
      type: UiActions.SET_HORIZ_PANEL_POSITION,
      payload: {
        element: panelRef.current,
        position: Types.HORIZPANEL_POS_TOP,
      },
    });
  }
  function moveToBottom(e) {
    dispatch({
      type: UiActions.SET_HORIZ_PANEL_POSITION,
      payload: {
        element: panelRef.current,
        position: Types.HORIZPANEL_POS_BOTTOM,
      },
    });
  }

  function getHtmlPanel() {
    if (selectedElements.length > 0) {
      let html = selectedElements[0].html
        .trim()
        .replace(/\s?(abba-selected-element|abba-mouseover-element)\s?/g, "");
      return (
        <div
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: escapeHtml(formatXml(html)),
          }}
        ></div>
      );
    } else {
      return <div>No element selected.</div>;
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
        onSelect={(tabIndex) =>
          dispatch({
            type: GlobalActions.SET_BOTTOM_TAB_INDEX,
            payload: { tabIndex },
          })
        }
      >
        <TabList>
          <Tab>Custom Selectors</Tab>
          <Tab>HTML</Tab>
          <Tab>Test Selector</Tab>
          <Tab>Console</Tab>
          <Tab>Usage Info</Tab>
        </TabList>
        <TabPanel>
          <SubPanel>
            <SelectorSettings></SelectorSettings>
          </SubPanel>
        </TabPanel>
        <TabPanel>
          <SubPanel>{getHtmlPanel()}</SubPanel>
        </TabPanel>
        <TabPanel>
          <SelectorTester></SelectorTester>
        </TabPanel>
        <TabPanel>
          <SubPanel ref={consoleRef}>
            <Console consoleDivRef={consoleRef}></Console>
          </SubPanel>
        </TabPanel>
        <TabPanel>
          <SubPanel>
            <ul>
              <li>
                Select an element on the page to generate the CSS selector for.
                The CSS Selector will be found and will be displayed on the
                right panel, as well as the "Custom Selectors" tab on the bottom
                panel.
              </li>
              <li>
                Generally, the default settings for finding CSS selectors should
                be fine. However, settings can be customized on the "Custom
                Selectors" tab. Specific names of classes, IDs, and/or tag names
                can be filtered out. A root selector can be specified and
                selectors will be generated relative to that root.
              </li>
              <li>
                Use the "Test Selector" tab to manually enter a selector and see
                what gets matched on the page. Note that matched elements may
                not always be visible, depending on the target page. However,
                the count will be accurate.
              </li>
              <li>
                Use "Modify Selection" area to change the selection to the
                parent, child, or sibling elements of the currently selected
                elements.
              </li>
              <li>
                The side and bottom panels will cover content on the page. Use
                the arrows on the upper right of the panels to move them to the
                opposite side of the page.
              </li>
            </ul>
          </SubPanel>
        </TabPanel>
      </Tabs>
    </FieldInfo>
  );
};

export default BottomPanel;
