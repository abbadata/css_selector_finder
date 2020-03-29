/*global chrome*/
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Button = styled.div`
  display: inline-block;
  color: #444;
  border: 1px solid #ccc;
  background: #ddd;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  vertical-align: middle;
  max-width: 100px;
  padding: 5px;
  margin: 5px;
  text-align: center;
`;

const MainPopup = () => {
  const [cssSelectorFinderState, setCssSelectorFinder] = useState(0);

  function handleEnableSelectorFinderClick(e) {
    console.log("handleEnableSelectorFinderClick");
    // We should inject the js and css into the content page. Then start the data extraction.
    chrome.tabs.insertCSS(null, { file: "/static/js/content.css" }, function() {
      chrome.tabs.executeScript(
        null,
        { file: "/static/js/content.js" },
        function() {
          // Send a message to the active tab to have it start "selector finding"
          chrome.tabs.query(
            { active: true, currentWindow: true },

            function(tabs) {
              var activeTab = tabs[0];
              chrome.tabs.sendMessage(activeTab.id, {
                message: "start_selector_finder"
              });
            }
          );
        }
      );
    });
  }

  function handleDisableSelectorFinderClick(e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        message: "end_selector_finder"
      });
    });
  }

  return (
    <div>
      <Button onClick={handleEnableSelectorFinderClick}>On</Button>
      <Button onClick={handleDisableSelectorFinderClick}>Off</Button>
    </div>
  );
};

export default MainPopup;
