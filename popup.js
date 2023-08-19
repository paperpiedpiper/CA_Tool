"use strict";

document.querySelector("button#unsnooze").addEventListener("click", function () {

    chrome.tabs.query({ url: 'https://goodman-sd.stefanini.com/CAisd/pdmweb.exe' }, function (tabs) {
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { message: "popupUnsnooze" });
    });
    window.close();
});
document.querySelector("button#half_hour_break").addEventListener("click", function () {

    chrome.tabs.query({ url: 'https://goodman-sd.stefanini.com/CAisd/pdmweb.exe' }, function (tabs) {
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { message: "30mBreak" });
    });
    window.close();
});