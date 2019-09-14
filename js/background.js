let keywords = [];
let isSync = false;
let names = [];

const urlRegexTwitch = new RegExp('^(http(s)?:\/\/)?((w){3}.)?twitch?(\.tv)?\/.+');
let whatTab = '';

/* chrome.storage.sync.get(['username'], function(items) {
    if (items.username) {
        console.log(items.username);
        chrome.tabs.sendMessage('test', {text: 'usernameTrue'});
    }
}); */

// Do Twitch connect auth thing, then check user's followers and make them alert by default, really good idea.

/* chrome.storage.sync.get(['username'], function(items) {
    isSync = true;
    if (items.username && localStorage.getItem('followees') !== null) {
        chrome.browserAction.setPopup({popup: "../keywords.html"});
        let plainArr = JSON.parse(localStorage.getItem('followees'));
        for (let elt of plainArr) {
            names.push(elt.to_name);
        }
        localStorage.setItem('names', names);
    } else {
        chrome.browserAction.setPopup({popup: "../username.html"});
    }
}); */

/**
 * !-- TODO
 * Do Autocomplete thing that loads names with imges, will be really cool, also make the chips have icons on them
 */

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'tabChanged') {
        console.log('tab has changed');
        chrome.storage.sync.get(['username'], function(items) {
            if (localStorage.getItem('followees') !== null) {
                console.log('follow');
                isSync = true;
                chrome.browserAction.setPopup({popup: "../keywords.html"});
                let plainArr = JSON.parse(localStorage.getItem('followees'));
                for (let elt of plainArr) {
                    names.push({"tag": elt.to_name, "image": '../icons/256.png'});
                    console.log(names);
                }
                localStorage.setItem('names', JSON.stringify(names));
            } else {
                chrome.browserAction.setPopup({popup: "../username.html"});
            }
        });
    }
});



if (isSync === false) {
    chrome.browserAction.setPopup({popup: "../username.html"});
}

/* chrome.storage.sync.get(['followees'], function(items) {
    if (items.followees) {
        let followees = items.followees;
        console.log(followees);
        // localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
    } else {
    
    }
}); */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (urlRegexTwitch.test(tab.url) === true) {
        whatTab = 'twitch';
        console.log(whatTab);
        chrome.tabs.sendMessage(tab.id, {text: 'twitch'});
    }
    // ...if it matches, send a message specifying a callback too
});

chrome.storage.sync.get(['keywords'], function(items) {
    if (items.keywords) {
        if (items.keywords.length > 2) {
            let i = 0;
            let keywordsObj = JSON.parse(items.keywords);
            for (let elt of keywordsObj) {
                keywords.push(elt.tag);
                let streamer = elt.tag;
                // https://api.twitch.tv/helix/users?login=${streamer}
                // https://api.twitch.tv/helix/users/follows?from_id=407881598
/*                 fetch(`https://api.twitch.tv/helix/users?login=earthmother`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                    console.log(result);
                    if (JSON.parse(result).data.length > 0) {
                        // alert(`${streamer} is currently live, twitch.tv/${streamer}`);
                    } else {
                        console.log(keywords.indexOf(streamer));
                        keywords = keywords.slice(keywords.indexOf(streamer), keywords.length);
                        console.log(keywords);
                    }
                }); */
            }
            setInterval(() => {
                for (let elt of keywords) {
                    console.log(elt);
                    fetch(`https://api.twitch.tv/helix/users?login=${elt}`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                        if (JSON.parse(result).data.length > 0) {
                            console.log(keywords.indexOf(elt));
                            keywords = keywords.slice(keywords.indexOf(elt), keywords.length);
                            console.log(keywords);
                        }
                    });
                    i++;
                }
            }, 10000);
        }
    }
});