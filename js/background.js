let keywords = [];
let names = [];
let profilePic = '';

const urlRegexTwitch = new RegExp('^(http(s)?:\/\/)?((w){3}.)?twitch?(\.tv)?\/.+');
let whatTab = '';

if ( (localStorage.getItem('names')) ) {
    if (localStorage.getItem('names').length > 0) {
        if (JSON.parse(localStorage.getItem('names')).length > 0) {
            // Disable text
            chrome.browserAction.setPopup({popup: "../keywords.html"});
            localStorage.setItem('tooltip-disable', true);
        }
    }
} else if (localStorage.getItem('keywords')) {
    if (localStorage.getItem('keywords').length > 0) {
        if (JSON.parse(localStorage.getItem('keywords')).length > 0) {
            // Disable text
            chrome.browserAction.setPopup({popup: "../keywords.html"});
            localStorage.setItem('tooltip-disable', true);
        }
    }
}

if (localStorage.getItem('usernameSkip') === 'true') {
    chrome.browserAction.setPopup({popup: "../keywords.html"});
}

if (localStorage.getItem('usernameSkip')) {
    console.log('1')
    if (localStorage.getItem('usernameSkip') !== 'true') {
        chrome.browserAction.setPopup({popup: "../username.html"});
    }
} else if (localStorage.getItem('names')) {
    console.log('2')
    if ( JSON.parse(localStorage.getItem('names')).length < 1) {
        chrome.browserAction.setPopup({popup: "../username.html"});
    }
} else if (localStorage.getItem('keywords')) {
    if (JSON.parse(localStorage.getItem('keywords')).length < 1) {
        chrome.browserAction.setPopup({popup: "../username.html"});
    }
} else {
    chrome.browserAction.setPopup({popup: "../username.html"});
}


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
                let count = 0;
                for (let elt of plainArr) {
                    fetch(`https://api.twitch.tv/helix/users?login=${elt.to_name}`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                        profilePic = (JSON.parse(result).data)[0].profile_image_url;
                    })
                    .then(() => {
                        names.push({"tag": elt.to_name, "image": profilePic});
                        if (count === plainArr.length) {
                            localStorage.setItem('names', JSON.stringify(names));
                        }
                    });
                    if (count+1 === plainArr.length) {
                        setTimeout(() => {
                            chrome.runtime.sendMessage({text: "followersProcessed"});
                        }, 2000);
                    }
                    count +=1;
                }
            } else {
                chrome.browserAction.setPopup({popup: "../username.html"});
            }
        });
    }
});

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

// chrome.storage.sync.get(['keywords'], function(items) {
//     if (items.keywords) {
//         if (items.keywords.length > 2) {
//             let i = 0;
//             let keywordsObj = JSON.parse(items.keywords);
//             for (let elt of keywordsObj) {
//                 keywords.push(elt.tag);
//                 let streamer = elt.tag;
//                 // https://api.twitch.tv/helix/users?login=${streamer}
//                 // https://api.twitch.tv/helix/users/follows?from_id=407881598
// /*                 fetch(`https://api.twitch.tv/helix/users?login=earthmother`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
//                     console.log(result);
//                     if (JSON.parse(result).data.length > 0) {
//                         // alert(`${streamer} is currently live, twitch.tv/${streamer}`);
//                     } else {
//                         console.log(keywords.indexOf(streamer));
//                         keywords = keywords.slice(keywords.indexOf(streamer), keywords.length);
//                         console.log(keywords);
//                     }
//                 }); */
//             }
//             setInterval(() => {
//                 for (let elt of keywords) {
//                     console.log(elt);
//                     fetch(`https://api.twitch.tv/helix/users?login=${elt}`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
//                         if (JSON.parse(result).data.length > 0) {
//                             console.log(keywords.indexOf(elt));
//                             keywords = keywords.slice(keywords.indexOf(elt), keywords.length);
//                             console.log(keywords);
//                         }
//                     });
//                     i++;
//                 }
//             }, 10000);
//         }
//     }
// });