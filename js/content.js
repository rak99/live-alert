let keywords = [];
let data = [];

console.log('hey');

if (window.location.href === 'chrome-extension://gfipmfpmegnlpolmjoocigllppobanfe/username.html') {
    document.addEventListener('keydown', function(e) {
        let usernameEl = document.getElementById('input_text');
        if (usernameEl) {
            if (usernameEl.value.length < 25) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    // Do Fetch, either send username is right, else pop error
                    // or send the followers in array form
                    fetch(`https://api.twitch.tv/helix/users?login=${usernameEl.value}`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                        data = result;
                        console.log(result);
                        document.getElementById('usernameArea').hidden = true;
                        document.getElementsByClassName('spinner-layer')[0].hidden = false;
                        document.getElementsByClassName('preloader-wrapper')[0].style.display = 'flex';
                        setTimeout(() => {
                            document.getElementsByClassName('preloader-wrapper')[0].style.marginTop = document.getElementsByClassName('preloader-wrapper')[0].clientHeight / 2;
                        }, 250);
                    }).then(() => {
                        fetch(`https://api.twitch.tv/helix/users/follows?from_id=${JSON.parse(data).data[0].id}&first=10`, { headers: { 'Client-ID': '6qoqexk4vgnl8caf4w8g14f3203eun' } }).then(r => r.text()).then(result => {
                            console.log((JSON.parse(result).data));
                            let followees = (JSON.parse(result).data);
                            localStorage.setItem('followees', JSON.stringify(followees));
                            localStorage.setItem('username', usernameEl.value);
                            chrome.storage.sync.set({'username': usernameEl.value}, function() {
                                console.log('Settings saved');
                            });
                            setTimeout(() => {
                                chrome.runtime.sendMessage({text: "tabChanged"});
                                window.location.href = 'chrome-extension://gfipmfpmegnlpolmjoocigllppobanfe/keywords.html';
                                document.getElementsByClassName('spinner-layer')[0].hidden = true;
                                document.getElementById('usernameArea').hidden = false;
                            }, 333);
                        });
                    });
                }
            } else if (e.keyCode !== 8) {
                e.preventDefault();
            }
        }
    });
} else if (window.location.href === 'chrome-extension://gfipmfpmegnlpolmjoocigllppobanfe/keywords.html') {

}

/*                             chrome.storage.sync.set({'username': usernameEl.value}, function() {
                                console.log('Settings saved');
                            });
                            chrome.storage.sync.set({'followees': followees}, function() {
                                console.log('Settings saved');
                            }); */