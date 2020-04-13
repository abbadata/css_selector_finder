console.log("background.js started");
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.insertCSS(null, { file: "/static/js/content.css" }, function () {
    chrome.tabs.executeScript(
      null,
      { file: "/static/js/content.js" },
      function () {
        // Send a message to the active tab to have it start "selector finding"
        chrome.tabs.query(
          { active: true, currentWindow: true },

          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              message: "start_selector_finder",
            });
          }
        );
      }
    );
  });
});
