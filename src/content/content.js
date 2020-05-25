/*global chrome*/
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";

import ShadowContentPageApp from "./components/ShadowContentPageApp";
import "./content.css";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start_selector_finder") {
    createSelectorFinderApp(false);
    sendResponse({ isActive: true });
  } else if (request.message === "start_selector_finder_noeventhandlers") {
    createSelectorFinderApp(true);
    sendResponse({ isActive: true });
  } else if (request.message === "check_selector_finder") {
    if (document.getElementById("abba-content-page-app")) {
      sendResponse({ isActive: true });
    } else {
      sendResponse({ isActive: false });
    }
  }
});

function createSelectorFinderApp(noEventHandlers) {
  if (noEventHandlers) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
  if (!document.getElementById("abba-content-page-app")) {
    let app = document.createElement("div");
    app.id = "abba-content-page-app";
    app.className = "abba-content-page-app";
    document.body.appendChild(app);
    ReactDOM.render(
      <Provider store={store}>
        <ShadowContentPageApp />
      </Provider>,
      app
    );
  } else {
    let app = document.getElementById("abba-content-page-app");
    ReactDOM.render(
      <Provider store={store}>
        <ShadowContentPageApp />
      </Provider>,
      app
    );
  }
}
