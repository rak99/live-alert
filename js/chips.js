

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.chips');

  // Use this as a global var pushing into to save to localStorage
  let strChipsData = [];

  document.addEventListener('mousedown', function() {
    setTimeout(() => {
      console.log(instances[0].chipsData);
      localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
      chrome.storage.sync.set({'keywords': JSON.stringify(instances[0].chipsData)}, function() {
        console.log('Settings saved');
      });
    }, 333);
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      console.log(instances[0].chipsData);
      localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
      chrome.storage.sync.set({'keywords': JSON.stringify(instances[0].chipsData)}, function() {
        console.log('Settings saved');
      });
    } else if (e.keyCode === 8 && document.querySelectorAll('.keyboard-focused').length > 0) {
      setTimeout(() => {
        console.log(instances[0].chipsData);
        localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
        chrome.storage.sync.set({'keywords': JSON.stringify(instances[0].chipsData)}, function() {
          console.log('Settings saved');
        });
      }, 333);
    }
  });

  var instances = M.Chips.init(elems, {
    data: localStorage.getItem('keywords') !== null ? JSON.parse(localStorage.getItem('keywords')) : [],
    limit: Infinity,
    // Add something like limit: IsProUser === true ? 25 : 5
    minLength: 1
  });

  if (localStorage.getItem('keywords') !== null) {
    if (localStorage.getItem('keywords').indexOf('[') >= 0) {
      JSON.parse(localStorage.getItem('keywords'))
    } else {
      localStorage.getItem('keywords')
    }
  }

  let chipStr = '';

});

// Find out how to check if popup is open, then do this shit


var instance = M.Chips.getInstance(document.querySelectorAll('.chips'));

var chip = {
    tag: 'chip content',
    image: '', //optional
  };