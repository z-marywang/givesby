window.domain = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (request != null) {
    //   window.domain = request;
    //   console.log(window.domain);
    //   // sendResponse({url: });
    // }
    console.log("About to display popup");
    chrome.notifications.create('NOTFICATION_ID', {
      type: 'basic',
      iconUrl: 'black.jpeg',
      title: 'notification title',
      message: 'notification message',
      priority: 2
    });

  });

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.browserAction.setBadgeText({text: "clicked"});
    // chrome.tabs.create({url: window.clue.html});
});