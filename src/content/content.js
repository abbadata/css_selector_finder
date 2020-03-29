/*global chrome*/
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";

import ContentPageApp from "./components/ContentPageApp";
import "./content.css";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "start_selector_finder") {
    console.log("Received start_selector_finder");
    createSelectorFinderApp();
  } else if (request.message === "end_selector_finder") {
    console.log("Received end_selector_finder");
    createSelectorFinderApp();
  }
});

function createSelectorFinderApp() {
  if (!document.getElementById("content-page-app")) {
    let app = document.createElement("div");
    app.id = "content-page-app";
    app.className = "content-page-app";
    document.body.appendChild(app);
    ReactDOM.render(
      <Provider store={store}>
        <ContentPageApp />
      </Provider>,
      app
    );
  } else {
    let app = document.getElementById("content-page-app");
    ReactDOM.render(
      <Provider store={store}>
        <ContentPageApp />
      </Provider>,
      app
    );
  }
}
