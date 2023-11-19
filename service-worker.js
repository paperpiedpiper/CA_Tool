"use strict";

chrome.runtime.onMessage.addListener((message) => {
  switch (message.message) {
    case "ticketAlert":
      createNotification();
      break;
    case "closeLatestTab":
      closeLatestTab();
      break;
    default:
      // Handle any other cases or provide a default action
      break;
  }
});

function createNotification(){
  const options = {
    type: "basic",
    title: "Alert",
    message: "Unassigned tickets in!",
    iconUrl: "images/alert.png",
    buttons: [{
      title: "Snooze for 10 minutes",
      iconUrl: "images/snooze1.png",
    },
  {
    title: "Snooze for 5 minutes",
    iconUrl: "images/snooze2.png"
  }]
  };

  let tabId_handle;
  chrome.tabs.query({ url: 'https://goodman-sd.stefanini.com/CAisd/pdmweb.exe' }, function (tabs) {
    tabId_handle = tabs[0].id;
  });
  
  chrome.notifications.create("unassignedAlert", options);

  chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId == "unassignedAlert") {
      if (btnIdx == 0) {
        chrome.tabs.sendMessage(tabId_handle, { message: "button1Clicked"});
      }
      else if (btnIdx == 1) {
        chrome.tabs.sendMessage(tabId_handle, { message: "button2Clicked"});
      }
    }
  });

  setTimeout(function(){
    chrome.notifications.clear("unassignedAlert");
  }, 7000);
};

function closeLatestTab() {
  let targetTab;
  let targetWindowId;

  // Create a Promise to query tabs
  const queryTabsPromise = new Promise((resolve, reject) => {
    chrome.tabs.query({}, (tabs) => {
      if (tabs && tabs.length > 0) {
        // Get the latest tab
        targetTab = tabs[tabs.length - 1];
        resolve(targetTab);
      } else {
        reject("No tabs found");
      }
    });
  });

  queryTabsPromise
    .then((tab) => {
      targetTab = tab;
      return new Promise((resolve, reject) => {
        // Get the window information for the targetTab
        chrome.tabs.get(targetTab.id, (tabInfo) => {
          if (tabInfo) {
            targetWindowId = tabInfo.windowId;
            resolve(targetWindowId, targetTab);
          } else {
            reject("Error getting tab information");
          }
        });
      });
    })
    .then((windowId) => {
      chrome.windows.update(windowId, { state: "minimized" });
      return new Promise((resolve, reject) => {
        function closeTarget() {
          if (!targetTab.title.includes("123 Request Detail")) {
            console.log("tabloading");
            chrome.tabs.get(targetTab.id, (tab) => {
              targetTab = tab;
            });
            setTimeout(closeTarget, 300);
          } else {
            console.log("tabloaded");
            chrome.tabs.remove(targetTab.id);
            resolve();
          }
        }
        closeTarget();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};