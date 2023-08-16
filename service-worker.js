"use strict";

// var myNotificationID = null;
let tabId = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === "trigger") {
    createNotification();
    console.log(message.message);
  }
});

function createNotification(){
    const options = {
      type: "basic",
      title: "Alert",
      message: "Unassigned tickets in!",
      iconUrl: "alert.png",
      buttons: [{
        title: "Snooze for 10m",
        iconUrl: "snooze1.png",
      },
    {
      title: "Snooze for 20m",
      iconUrl: "snooze2.png"
    }]
    };

    chrome.tabs.query({ url: 'https://goodman-sd.stefanini.com/CAisd/pdmweb.exe' }, function (tabs) {
      tabId = tabs[0].id;
    });
    
    chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
      // if (notifId === myNotificationID) {
        if (btnIdx === 0) {
          chrome.tabs.sendMessage(tabId, { message: "600000"});
        }
        else if (btnIdx === 1) {
          chrome.tabs.sendMessage(tabId, { message: "1200000"});
        }
      // }
    });

    chrome.notifications.create("unassignedAlert", options);

    //clears the notification after 7 seconds
    setTimeout(function(){chrome.notifications.clear("unassignedAlert");}, 7000);
}