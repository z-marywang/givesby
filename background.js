window.domain = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (request != null) {
    //   window.domain = request;
    //   console.log(window.domain);
    //   // sendResponse({url: });
    // }
    console.log("About to display popup");
    // chrome.notifications.create('NOTFICATION_ID', {
    //   type: 'basic',
    //   iconUrl: 'black.jpeg',
    //   title: 'notification title',
    //   message: 'notification message',
    //   priority: 2
    // });
    // chrome.action.setPopup({popup: 'popup.html'});
    // chrome.tabs.create({url:"popup.html"});
    window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=no,resizable=no");


  });

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.browserAction.setBadgeText({text: "clicked"});
    // chrome.tabs.create({url: window.clue.html});
});