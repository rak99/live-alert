let keywords = [];
let names = [];
let profilePic = '';

const urlRegexTwitch = new RegExp('^(http(s)?:\/\/)?((w){3}.)?twitch?(\.tv)?\/.+');
let whatTab = '';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'tabChanged') {
        console.log('tab has changed');
    }
});

console.log('background active');
