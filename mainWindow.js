"use strict";
let unassignedTickets = null;
let startTime,
    currentTime;

let isSnoozeOn = false,
    isUrgent = false;

let elapsedTime,
    currentNotificationSpeed;

let checkUnassigned_handle,
    checkUnassigned_handle_fast,
    timerInterval_handle;

function clickOnQueues() {
  setTimeout(() => {
    document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('button#s1ds.navbar_btnright')?.click();

    setTimeout(() => {
      document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s2pm')?.click();
      
      setTimeout(() => {
        document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s6pm')?.click();

        setTimeout(() => {
          document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s10pm')?.click();

        }, 300);
      }, 400);
    }, 400);
  }, 400);
};

function checkUnassignedTickets() {
  if (!isSnoozeOn) {
  if (!isSnoozeOn) {
    try {
      unassignedTickets = document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s1ct')
       || document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s1ct')
       || document.querySelector('[name="role_main"]')?.contentWindow?.document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s1ct')
       || document.querySelector('[name="scoreboard"]')?.contentWindow?.document.querySelector('#s1ct')
       || document.querySelector('#s1ct');

      if (+unassignedTickets?.innerHTML != 0) {
        chrome.runtime.sendMessage({ message: "trigger" });
        theTimer();
      }
    } catch (e){console.error('Error:', e)};
  };  
};

function setSnooze(time) {
  isSnoozeOn = true;
  setTimeout(() => {
    isSnoozeOn = false
  }, time);
};

function popupUnsnooze () {
  isSnoozeOn = false;
};

function theTimer() {
  startTime = new Date().getTime();

  timerInterval_handle = setInterval(() => {
      currentTime = new Date().getTime();
      elapsedTime = currentTime - startTime;
      
      if(Math.floor(elapsedTime / 1000) >= 1300) {
          isUrgent = true;
      }
  }, 1000);
};

function openTickets(inputArr) {
  const goField = document.querySelector('[name="gobtn"]')?.contentWindow?.document.querySelector('[name="searchKey"]') || document.querySelector('[name="searchKey"]');
  const goButton = document.querySelector('[name="gobtn"]')?.contentWindow?.document.querySelector("a#imgBtn0.button.enabledattr.buttonEnabled")|| document.querySelector("a#imgBtn0.button.enabledattr.buttonEnabled");

  function openTicketWindow(inputArr, currentIndex = 0) {
      if (currentIndex >= inputArr.length) return;

      let ticketNumber = inputArr[currentIndex];
      goField.value = ticketNumber;
      goButton.click();

      setTimeout(() => {
          openTicketWindow(inputArr, ++currentIndex);
      }, 500);
  };
  openTicketWindow(inputArr);
};

function driver() {
  if (!isUrgent) {
      clearInterval(checkUnassigned_handle_fast);
      if (currentNotificationSpeed != 'normal') {
          checkUnassigned_handle = setInterval(checkUnassignedTickets, 20000);
      }
      currentNotificationSpeed = 'normal';
  }
  else if (isUrgent) {
    clearInterval(checkUnassigned_handle);
    if (currentNotificationSpeed != 'fast') {
        checkUnassigned_handle_fast = setInterval(checkUnassignedTickets, 3000);

    }
    currentNotificationSpeed = 'fast';
  };
};

// ////////////////////////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message) => {
  switch (message.message) {
    case "button1Clicked":
      setSnooze(300000);
      break;
    case "button2Clicked":
      setSnooze(600000);
      break;
    case "popupUnsnooze":
      popupUnsnooze();
      break;
    case "30mBreak":
      setSnooze(1800000);
      break;
    case "ticketsInputted":
      openTickets(message.input);
      break;
  }
});

document.querySelector('[name="product"]')?.addEventListener('load', () => {
  document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.addEventListener('load', () => {
    document.querySelector('[name="product"]')?.contentWindow?.document.querySelector('[name="tab_2000"]')?.contentWindow?.document.querySelector('[name="role_main"]')?.addEventListener('load', () => {
      // Opens up EU/USA/APAC queues after the page loads
      setTimeout(clickOnQueues, 1000);
      // Launches the driver
      setTimeout(driver, 2000);
      // Anti-AFK
      setInterval(() => {
        openTickets(['fake']);
      }, 2000000);
    })
  })
});

// Resets timer and isUrgent state, if  tickets are back to 0
const resetTimerAndUrgentState = () => {
  try {
    if(!+unassignedTickets?.innerHTML) {
      clearInterval(timerInterval_handle);
      startTime = new Date().getTime();
      currentTime = new Date().getTime();
      isUrgent = false;
    }
  } catch (e) {console.error('Error:', e)};
};
setInterval(resetTimerAndUrgentState, 6000);

// Prevents computer sleep while CA tab is open and focused
setTimeout(() => {
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
}, 5000);