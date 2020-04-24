/*global chrome*/

import * as Types from "../Types";

const initialState = {
  selectorFinderEnabled: true,
  vertPanelPosition: "right",
  horizPanelPosition: "bottom",
  vertPanelDiv: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_VERT_PANEL_DIV": {
      let panelElement = action.payload.element;
      console.log("SET_VERT_PANEL_DIV: ", panelElement);
      return {
        ...state,
        vertPanelDiv: action.payload.element,
      };
    }
    case "SET_HORIZ_PANEL_POSITION": {
      let panelElement = action.payload.element;
      if (action.payload.position === "top") {
        panelElement.style.top = 0;
        panelElement.style.setProperty("bottom", "initial");
        // Adjust position of vertical panel depending on whether
        // horizontal panel is above or below it
        state.vertPanelDiv.style.top = "200px";
        state.vertPanelDiv.style.bottom = "0px";
      } else {
        panelElement.style.bottom = 0;
        panelElement.style.setProperty("top", "initial");

        state.vertPanelDiv.style.top = "0";
        state.vertPanelDiv.style.bottom = "200px";
      }
      return {
        ...state,
        horizPanelPosition: action.payload.position,
      };
    }
    case "SET_VERT_PANEL_POSITION": {
      console.log("vertElement: ", action.payload.element);
      let vertPanelElement = action.payload.element;
      if (action.payload.position === "left") {
        vertPanelElement.style.left = 0;
        vertPanelElement.style.setProperty("right", "initial");
      } else {
        vertPanelElement.style.right = 0;
        vertPanelElement.style.setProperty("left", "initial");
      }
      return {
        ...state,
        vertPanelPosition: action.payload.position,
      };
    }
  }
  return state;
}
