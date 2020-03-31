import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";

const ContentPageApp = () => {
  const selectorFinderEnabled = useSelector(
    state => state.PluginReducer.selectorFinderEnabled
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SAVE_INITIAL_DOM_SETTINGS" });
    nodeAddHandlers(document, "mouseover", handleDocumentMouseover);
    nodeAddHandlers(document, "mouseout", handleDocumentMouseout);
    nodeAddHandlers(document, "click", handleDocumentClick);
  }, []);

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
  function nodeAddHandlers(node, eventtype, handler) {
    node.addEventListener(eventtype, handler, false);
    return node;
  }
  function handleDocumentMouseover(e) {
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      dispatch({
        type: "SET_MOUSEOVER_ELEMENT",
        payload: { element: targetElement }
      });
      //props.setMouseoverElement(targetElement);
      e.preventDefault();
    }
  }
  function handleDocumentMouseout(e) {
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      dispatch({
        type: "SET_MOUSEOUT_ELEMENT",
        payload: { element: targetElement }
      });
      //props.setMouseoverElement(targetElement);
      e.preventDefault();
    }
  }

  function handleDocumentClick(e) {
    //console.log("CLICKED: ", element);
    let targetElement = e.target || e.srcElement;
    if (
      !isDescendant(document.getElementById("content-page-app"), targetElement)
    ) {
      if (window.event.ctrlKey) {
        // If CTRL key is held down, just add or remove from the current selection
        dispatch({
          type: "ADD_OR_REMOVE_SELECTED_ELEMENT",
          payload: { element: targetElement }
        });
      } else {
        // If no CTRL key, current element is selected, everything else is deselected
        dispatch({
          type: "ONLY_SELECT_SELECTED_ELEMENT",
          payload: { element: targetElement }
        });
      }
      e.preventDefault();
    }
  }
  return (
    <div>
      <SidePanel />
      <BottomPanel />
    </div>
  );
};

export default ContentPageApp;
