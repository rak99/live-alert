// Add keyword mode, where extension looks ONLY for keywords, for example : NO, WHO
// change this line : if (lowerCaseElt.indexOf('o') > -1) {
// To a no boundary regular expression with the keyword

// TODO:
/**
 * When paragraph has a carrot in it e.g: "<OMEGA" or ">OMEGA"
 * There is a loop of images spawning in that paragraph, fix it, it's because it's inserting <<img or something and if it's after />>
 * The O in OMEGA stays there
 */

let imges = ["<img src='https://cdn.frankerfacez.com/emoticon/295799/1'></img>", "<img src='https://i.imgur.com/zOQUJ3l.png'></img>"]
let imgSize = imges[0];
// let keywords = localStorage.getItem('keywords') !== null ? localStorage.getItem('keywords').indexOf('[') >= 0 ? JSON.parse(localStorage.getItem('keywords')) : localStorage.getItem('keywords')  : '';
let keywords = [];

/* chrome.browserAction.onClicked.addListener(function (tabs) {
    console.log('hehe');
}); */

chrome.storage.sync.get(['keywords'], function(items) {
    if (items.keywords.length > 2) {
        let keywordsObj = JSON.parse(items.keywords);
        for (let elt of keywordsObj) {
            console.log(elt.tag);
            keywords.push(elt.tag);
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

/* chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'toggleKeyword') {
        console.log(msg.keywords);
        localStorage.setItem('keywords', JSON.stringify(msg.keywords));
        keywords = JSON.parse(localStorage.getItem('keywords'));
    }
}); */

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

});