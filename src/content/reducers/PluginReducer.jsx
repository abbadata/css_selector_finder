/*global chrome*/

const initialState = {
  selectorFinderEnabled: false,
  finderState: {
    enabled: false
  },
  finderUi: {
    vertPanelPosition: "right",
    horizPanelPosition: "bottom"
  },
  selectedElements: [
    /*
  {
    element: "",
    link: "",
    text: "",
    html: "",
    shortselector: "",
    image: "",
    oldOutline: ""
  },
  */
  ],
  numEvents: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
