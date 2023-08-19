"use strict";
let unassignedTickets = null;

let isSnoozeOn = false;
let isUrgent = false;

let elapsedTime;
let currentNotificationSpeed;

let checkUnassigned_handle;
let checkUnassigned_handle_fast;
let timerInterval_handle;

function clickOnQueues() {
  setTimeout(function() {
    document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s2pm')?.click();
    
    setTimeout(function() {
      document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s6pm')?.click();
      
      setTimeout(function() {
        document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s10pm')?.click();
      }, 400);
      
    }, 400);
    
  }, 400);
};

function checkUnassignedTickets() {
  if (isSnoozeOn == false) {
    try {
      unassignedTickets = document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s1ct')?.innerHTML
      || document.documentElement.childNodes[2]?.childNodes[7]?.contentDocument.childNodes[1]?.childNodes[2]?.childNodes[24]?.childNodes[0]?.contentDocument.childNodes[1]?.childNodes[2]?.childNodes[3]?.contentDocument.childNodes[1]?.childNodes[2]?.childNodes[1]?.contentDocument.childNodes[1]?.childNodes[2]?.childNodes[19]?.childNodes[11]?.childNodes[1]?.childNodes[0]?.childNodes[2]?.innerHTML;
      
      if (+unassignedTickets != 0) {
        chrome.runtime.sendMessage({ message: "trigger" });
        theTimer();
      }
    } catch (e) {};
  };  
};

function setSnooze(time) {
  isSnoozeOn = true;
  setTimeout(function () {
    isSnoozeOn = false
  }, time);
};

function popupUnsnooze () {
  isSnoozeOn = false;
};

function theTimer() {
  let startTime = new Date().getTime();

  timerInterval_handle = setInterval(() => {
      let currentTime = new Date().getTime();
      elapsedTime = currentTime - startTime;
      
      if(Math.floor(elapsedTime / 1000) >= 300) {
          isUrgent = true;
      }
  }, 1000);
};

function driver() {
  if (isUrgent == false) {
      clearInterval(checkUnassigned_handle_fast);
      if (currentNotificationSpeed != 'normal') {
          checkUnassigned_handle = setInterval(checkUnassignedTickets, 20000);
      }
      currentNotificationSpeed = 'normal';
  }
  else if (isUrgent == true) {
    clearInterval(checkUnassigned_handle);
    if (currentNotificationSpeed != 'fast') {
        checkUnassigned_handle_fast = setInterval(checkUnassignedTickets, 3000);

    }
    currentNotificationSpeed = 'fast';
  };
};

function launch() {
  setInterval(driver, 1000);
};

// ////////////////////////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message) => {
  if (message.message == "button1Clicked") {
    setSnooze(600000);
    console.log(message.message);
  }
  else if (message.message == "button2Clicked") {
    setSnooze(1200000);
    console.log(message.message);
  }
  else if (message.message == "popupUnsnooze") {
    popupUnsnooze();
    console.log(message.message);
  }
  else if (message.message == "30mBreak") {
    setSnooze(1800000);
    console.log(message.message);
  }
  });

// Launches the driver
setTimeout(launch, 5000);
// Opens up EU/USA/APAC queues after the page loads
setTimeout(clickOnQueues, 5001);
// Resets timer and isUrgent state, if tickets are back to 0
setInterval(() => {
  if(+unassignedTickets == 0) {
    clearInterval(timerInterval_handle);
    elapsedTime = 0;
    isUrgent = false;
  }
  try {
    logout_all_windows = null;
    logout_all_windows_cb = null;
    setTimeoutWarning = null;
    timeoutWarningPopped = null;
    propTimeout = 99999;
    propTimeoutWarning = 0;
    timeoutWarningHandle = null;
  } catch (e) {};
}, 1000);

(() => {
  navigator.wakeLock.request('screen')
  .then((wakeLock) => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'visible') {
        navigator.wakeLock.request('screen')
      } else {
        wakeLock.release();
      }
    });
  })
  .catch(e => {});
})();