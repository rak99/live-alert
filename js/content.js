let imges = ["<img src='https://cdn.frankerfacez.com/emoticon/295799/1'></img>", "<img src='https://i.imgur.com/zOQUJ3l.png'></img>"]
let imgSize = imges[0];
let keywords = [];

document.addEventListener('keydown', function(e) {
    let usernameEl = document.getElementById('input_text');
    if (usernameEl) {
        if (usernameEl.value.length < 25) {
            if (e.keyCode === 13) {
                e.preventDefault();
                console.log('enter');
                // Do Fetch, either send username is right, else pop error
                // or send the followers in array form
                chrome.storage.sync.set({'username': usernameEl.value}, function() {
                    console.log('Settings saved');
                });
                window.location.href = 'chrome-extension://gfipmfpmegnlpolmjoocigllppobanfe/keywords.html';
            }
        } else if (e.keyCode !== 8) {
            console.log('hehe');
            e.preventDefault();
        }
    }
});

chrome.storage.sync.get(['username'], function(items) {
    if (items.keywords) {
        if (items.keywords.length > 2) {
            let keywordsObj = JSON.parse(items.keywords);
            for (let elt of keywordsObj) {
                keywords.push(elt.tag);
            }
        }
    }
});

$(document).ready(function() {
    $('input#input_text').characterCounter();
});

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