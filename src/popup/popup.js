import popup from "./popup.css";

document.addEventListener("DOMContentLoaded", function () {
  checkCurrentPageStatus(
    () => {
      document.querySelector("#initial_state").style.display = "none";
    },
    () => {
      document.querySelector("#started_state").style.display = "none";
    }
  );
  document
    .querySelector("#normal_start")
    .addEventListener("click", launchNormal);
  document
    .querySelector("#remove_handler_start")
    .addEventListener("click", launchNoEventHandlers);
  document.querySelector("#exit_app").addEventListener("click", exitApp);
});

function checkCurrentPageStatus(active, inactive) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        message: "check_selector_finder",
      },
      function (response) {
        if (response && response.isActive) {
          active();
        } else {
          if (chrome.runtime.lastError) {
          }
          inactive();
        }
      }
    );
  });
}
function launchNormal(element) {
  chrome.tabs.insertCSS(null, { file: "/static/js/content.css" }, function () {
    chrome.tabs.executeScript(
      null,
      { file: "/static/js/content.js" },
      function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(
            activeTab.id,
            {
              message: "start_selector_finder",
            },
            function (response) {
              if (response.isActive) {
                window.close();
              }
            }
          );
        });
      }
    );
  });
}

function launchNoEventHandlers() {
  chrome.tabs.insertCSS(null, { file: "/static/js/content.css" }, function () {
    chrome.tabs.executeScript(
      null,
      { file: "/static/js/content.js" },
      function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(
            activeTab.id,
            {
              message: "start_selector_finder_noeventhandlers",
            },
            function (response) {
              if (response.isActive) {
                window.close();
              }
            }
          );
        });
      }
    );
  });
}

function exitApp(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        message: "exit_selector_finder",
      },
      function (response) {
        window.close();
      }
    );
  });
}
