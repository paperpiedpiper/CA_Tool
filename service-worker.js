"use strict";

chrome.runtime.onMessage.addListener((message) => {
  if (message.message == "trigger") {
    createNotification();
    console.log(message.message);
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
    title: "Snooze for 20 minutes",
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
}
