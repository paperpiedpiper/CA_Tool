"use strict";

document.querySelector("button#unsnooze").addEventListener("click", function () {

    chrome.tabs.query({ url: 'https://goodman-sd.stefanini.com/CAisd/pdmweb.exe' }, function (tabs) {
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { message: "popupUnSnooze" });
});
});