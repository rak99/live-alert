let contextMenuItem = {
    "id": "omegaluler",
    "title": "toggle OMEGALUL size",
    "contexts": ["browser_action"]
};

let keywords = [];

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "omegaluler") {
        chrome.tabs.sendMessage(tab.id, {text: 'changeSize'});
    }
});

const urlRegexTwitch = new RegExp('^(http(s)?:\/\/)?((w){3}.)?twitch?(\.tv)?\/.+');
let whatTab = '';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (urlRegexTwitch.test(tab.url) === true) {
        whatTab = 'twitch';
        console.log(whatTab);
        chrome.tabs.sendMessage(tab.id, {text: 'twitch'});
    }
    // ...if it matches, send a message specifying a callback too
});