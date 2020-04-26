import * as Types from "../Types";
import * as Actions from "../actions/UiActions";

const initialState = {
  selectorFinderEnabled: true,
  vertPanelPosition: Types.VERTPANEL_POS_RIGHT,
  horizPanelPosition: Types.HORIZPANEL_POS_BOTTOM,
  vertPanelDiv: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_VERT_PANEL_DIV: {
      let panelElement = action.payload.element;
      return {
        ...state,
        vertPanelDiv: action.payload.element,
      };
    }
    case Actions.SET_HORIZ_PANEL_POSITION: {
      let panelElement = action.payload.element;
      if (action.payload.position === Types.HORIZPANEL_POS_TOP) {
        panelElement.style.top = 0;
        panelElement.style.setProperty(Types.HORIZPANEL_POS_BOTTOM, "initial");
        // Adjust position of vertical panel depending on whether
        // horizontal panel is above or below it
        state.vertPanelDiv.style.top = "200px";
        state.vertPanelDiv.style.bottom = "0px";
      } else {
        panelElement.style.bottom = 0;
        panelElement.style.setProperty(Types.HORIZPANEL_POS_TOP, "initial");

        state.vertPanelDiv.style.top = "0";
        state.vertPanelDiv.style.bottom = "200px";
      }
      return {
        ...state,
        horizPanelPosition: action.payload.position,
      };
    }
    case Actions.SET_VERT_PANEL_POSITION: {
      let vertPanelElement = action.payload.element;
      if (action.payload.position === Types.VERTPANEL_POS_LEFT) {
        vertPanelElement.style.left = 0;
        vertPanelElement.style.setProperty(
          Types.VERTPANEL_POS_RIGHT,
          "initial"
        );
      } else {
        vertPanelElement.style.right = 0;
        vertPanelElement.style.setProperty(Types.VERTPANEL_POS_LEFT, "initial");
      }
      return {
        ...state,
        vertPanelPosition: action.payload.position,
      };
    }
  }
  return state;
}
