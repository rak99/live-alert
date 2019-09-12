let keywords = [];

const urlRegexTwitch = new RegExp('^(http(s)?:\/\/)?((w){3}.)?twitch?(\.tv)?\/.+');
let whatTab = '';

chrome.storage.sync.get(['username'], function(items) {
    if (items.username) {
        console.log(items);
    }
});

// Do Twitch connect auth thing, then check user's followers and make them alert by default, really good idea.

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
                https://api.twitch.tv/helix/users/follows?from_id=407881598
                fetch(`https://api.twitch.tv/helix/users?login=earthmother`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                    console.log(result);
                    if (JSON.parse(result).data.length > 0) {
                        // alert(`${streamer} is currently live, twitch.tv/${streamer}`);
                    } else {
                        console.log(keywords.indexOf(streamer));
                        keywords = keywords.slice(keywords.indexOf(streamer), keywords.length);
                        console.log(keywords);
                    }
                });
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