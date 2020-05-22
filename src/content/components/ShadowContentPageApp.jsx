import React, { useState, useEffect } from "react";
import root from "react-shadow/styled-components";
import { useSelector, useDispatch } from "react-redux";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import * as SelectionActions from "../actions/SelectionActions";

window.savedClickHandler = null;
window.savedMouseoverHandler = null;
window.savedMouseoutHandler = null;

const ShadowContentPageApp = () => {
  const selectorFinderEnabled = useSelector(
    (state) => state.selection.selectorFinderEnabled
  );

  let custStyles = `
  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }
  
  .react-tabs__tab-list {
    border-bottom: 1px solid #aaa;
    margin: 0 0 10px;
    padding: 0;
  }
  
  .react-tabs__tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
  }
  
  .react-tabs__tab--selected {
    background: #fff;
    border-color: #aaa;
    color: black;
    border-radius: 5px 5px 0 0;
  }
  
  .react-tabs__tab--disabled {
    color: GrayText;
    cursor: default;
  }
  
  .react-tabs__tab:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;
  }
  
  .react-tabs__tab:focus:after {
    content: "";
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
  }
  
  .react-tabs__tab-panel {
    display: none;
  }
  
  .react-tabs__tab-panel--selected {
    display: block;
  }
  
  /* Default state */
  .rc-checkbox {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    position: relative;
    line-height: 1;
    vertical-align: middle;
  }
  .rc-checkbox:hover .rc-checkbox-inner,
  .rc-checkbox-input:focus + .rc-checkbox-inner {
    border-color: #7892c2;
  }
  .rc-checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    border-color: #d9d9d9;
    background-color: #ffffff;
    transition: border-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .rc-checkbox-inner:after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    left: 4px;
    top: 1px;
    display: table;
    width: 5px;
    height: 8px;
    border: 2px solid #ffffff;
    border-top: 0;
    border-left: 0;
    content: ' ';
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-duration: 0.3s;
    animation-name: amCheckboxOut;
  }
  .rc-checkbox-input {
    position: absolute;
    left: 0;
    z-index: 9999;
    cursor: pointer;
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  /* Checked state */
  .rc-checkbox-checked:hover .rc-checkbox-inner {
    border-color: #7892c2;
  }
  .rc-checkbox-checked .rc-checkbox-inner {
    border-color: #7892c2;
    background-color: #7892c2;
  }
  .rc-checkbox-checked .rc-checkbox-inner:after {
    transform: rotate(45deg);
    position: absolute;
    left: 4px;
    top: 1px;
    display: table;
    width: 5px;
    height: 8px;
    border: 2px solid #ffffff;
    border-top: 0;
    border-left: 0;
    content: ' ';
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-duration: 0.3s;
    animation-name: amCheckboxOut;
  }
  @media print {
    .rc-checkbox-checked .rc-checkbox-inner {
      box-shadow: inset 0 0 0 16px #7892c2;
    }
  }
  .rc-checkbox-disabled.rc-checkbox-checked:hover .rc-checkbox-inner {
    border-color: #d9d9d9;
  }
  .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner {
    background-color: #f3f3f3;
    border-color: #d9d9d9;
  }
  .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner:after {
    animation-name: none;
    border-color: #cccccc;
  }
  @media print {
    .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner {
      box-shadow: inset 0 0 0 16px #f3f3f3;
    }
  }
  .rc-checkbox-disabled:hover .rc-checkbox-inner {
    border-color: #d9d9d9;
  }
  .rc-checkbox-disabled .rc-checkbox-inner {
    border-color: #d9d9d9;
    background-color: #f3f3f3;
  }
  .rc-checkbox-disabled .rc-checkbox-inner:after {
    animation-name: none;
    border-color: #f3f3f3;
  }
  .rc-checkbox-disabled .rc-checkbox-inner-input {
    cursor: default;
  }
  @keyframes amCheckboxIn {
    0% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0) rotate(45deg);
    }
    100% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1) rotate(45deg);
    }
  }
  @keyframes amCheckboxOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  `;

  if (selectorFinderEnabled) {
    return (
      <root.div id="abba-rootdiv">
        <style type="text/css">{custStyles}</style>
        <ContentPageApp></ContentPageApp>
      </root.div>
    );
  } else {
    return <root.div id="abba-rootdiv"></root.div>;
  }
};

const ContentPageApp = () => {
  const finderSettings = useSelector((state) => state.finder.settings);
  const rootElement = useSelector(
    (state) => state.selection.selectionState.selectorRootElement
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // Need to save the handlers so we can remove them later.
    window.savedMouseoverHandler = handleDocumentMouseover;
    document.documentElement.addEventListener(
      "mouseover",
      handleDocumentMouseover,
      false
    );
    window.savedMouseoutHandler = handleDocumentMouseout;
    document.documentElement.addEventListener(
      "mouseout",
      handleDocumentMouseout,
      false
    );
    window.savedClickHandler = handleDocumentClick;
    document.documentElement.addEventListener(
      "click",
      handleDocumentClick,
      false
    );
  }, []);
  useEffect(() => {
    // Need to recreate onclick handler after state change, otherwise
    // the handler doesn't seem to pick up the updated state
    if (window.savedClickHandler) {
      document.documentElement.removeEventListener(
        "click",
        window.savedClickHandler
      );
    }

    window.savedClickHandler = handleDocumentClick;
    document.documentElement.addEventListener(
      "click",
      handleDocumentClick,
      false
    );
  }, [finderSettings, rootElement]);

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function handleDocumentMouseover(e) {
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      dispatch({
        type: SelectionActions.SET_MOUSEOVER_ELEMENT,
        payload: { element: targetElement },
      });
      e.preventDefault();
    }
  }
  function handleDocumentMouseout(e) {
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      dispatch({
        type: SelectionActions.SET_MOUSEOUT_ELEMENT,
        payload: { element: targetElement },
      });
      e.preventDefault();
    }
  }

  function handleDocumentClick(e) {
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      dispatch({
        type: SelectionActions.ONLY_SELECT_SELECTED_ELEMENT,
        payload: {
          element: targetElement,
          finderSettings: finderSettings,
          rootElement: rootElement,
        },
      });
      e.preventDefault();
    }
  }

  function handleExit() {
    document.documentElement.removeEventListener(
      "mouseover",
      window.savedMouseoverHandler
    );
    document.documentElement.removeEventListener(
      "mouseout",
      window.savedMouseoutHandler
    );
    document.documentElement.removeEventListener(
      "click",
      window.savedClickHandler
    );
    dispatch({ type: "EXIT_APPLICATION" });
  }

  return (
    <div>
      <SidePanel handleExit={handleExit} />
      <BottomPanel />
    </div>
  );
};

export default ShadowContentPageApp;
