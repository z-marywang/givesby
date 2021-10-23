window.domain = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request != null) {
      window.domain = request;
      console.log(window.domain);
    }
  });

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.browserAction.setBadgeText({text: "clicked"});
    // chrome.tabs.create({url: window.clue.html});
});