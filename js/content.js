let imges = ["<img src='https://cdn.frankerfacez.com/emoticon/295799/1'></img>", "<img src='https://i.imgur.com/zOQUJ3l.png'></img>"]
let imgSize = imges[0];
let keywords = [];

chrome.storage.sync.get(['keywords'], function(items) {
    if (items.keywords) {
        if (items.keywords.length > 2) {
            let keywordsObj = JSON.parse(items.keywords);
            for (let elt of keywordsObj) {
                keywords.push(elt.tag);
            }
        }
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'changeSize') {
        if (imgSize === imges[0]) {
            imgSize = imges[1]
        }
        else if (imgSize === imges[1]) {
            imgSize = imges[0];
        }
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

});