chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.update({'url': "index.html"});
});
