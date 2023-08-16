"use strict";

let isSnoozeOn = false;

function checkUnassignedTickets() {
  if (isSnoozeOn === false) {
    try {
    let numberUnassignedTickets = +document.documentElement.childNodes[2].childNodes[7].contentDocument.childNodes[1].childNodes[2].childNodes[24].childNodes[0].contentDocument.childNodes[1].childNodes[2].childNodes[3].contentDocument.childNodes[1].childNodes[2].childNodes[1].contentDocument.childNodes[1].childNodes[2].childNodes[19].childNodes[11].childNodes[1].childNodes[0].childNodes[2].innerHTML
     || +document.documentElement.childNodes[2].childNodes[19].childNodes[11].childNodes[1].childNodes[0].childNodes[2].innerHTML;
    
    if (numberUnassignedTickets !== 0) {
      chrome.runtime.sendMessage({ message: "trigger" });
    }
    }
    // need to catch errors caused by unloaded nodes at the time of checkUnassignedTickets() first run(s)
    // can't use DOMContentLoaded listener, as the DOM never really loads completely
    catch (error) {
  }
  }
}

setTimeout(clickOnQueues, 5000);

function clickOnQueues() {
  setTimeout(function() {
    document.documentElement.childNodes[2].childNodes[7].contentDocument.childNodes[1].childNodes[2].childNodes[24].childNodes[0].contentDocument.childNodes[1].childNodes[2].childNodes[3].contentDocument.childNodes[1].childNodes[2].childNodes[1].contentDocument.childNodes[1].childNodes[2].childNodes[19].childNodes[11].childNodes[2].childNodes[0].childNodes[0].click();
    
    setTimeout(function() {
      document.documentElement.childNodes[2].childNodes[7].contentDocument.childNodes[1].childNodes[2].childNodes[24].childNodes[0].contentDocument.childNodes[1].childNodes[2].childNodes[3].contentDocument.childNodes[1].childNodes[2].childNodes[1].contentDocument.childNodes[1].childNodes[2].childNodes[19].childNodes[11].childNodes[3].childNodes[0].childNodes[0].click();
      
      setTimeout(function() {
        document.documentElement.childNodes[2].childNodes[7].contentDocument.childNodes[1].childNodes[2].childNodes[24].childNodes[0].contentDocument.childNodes[1].childNodes[2].childNodes[3].contentDocument.childNodes[1].childNodes[2].childNodes[1].contentDocument.childNodes[1].childNodes[2].childNodes[19].childNodes[11].childNodes[4].childNodes[0].childNodes[0].click();
      }, 500); // Delay for the third setTimeout
      
    }, 500); // Delay for the second setTimeout
    
  }, 500); // Delay for the first setTimeout
};

function popupUnSnooze () {
  isSnoozeOn = false;
}

function setSnooze(time) {
  isSnoozeOn = true;
  setTimeout(function () { isSnoozeOn = false }, time);
}

setInterval(checkUnassignedTickets, 15000); // run every 15 seconds

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (+message.message === 600000) {
    setSnooze(+message.message);
    console.log(message.message); // Log the message received from the content script
  }
  else if (+message.message === 1200000) {
    setSnooze(+message.message);
    console.log(message.message); // Log the message received from the content script
  }
  else if (message.message === "popupUnSnooze") {
    popupUnSnooze();
  }
  });