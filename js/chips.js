
let isProUser = false;



document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.chips');

  // Use this as a global var pushing into to save to localStorage
  let strChipsData = [];

  document.addEventListener('mousedown', function() {
    setTimeout(() => {
      console.log(instances[0].chipsData);
      // Fetch here
      localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
      chrome.storage.sync.set({'keywords': JSON.stringify(instances[0].chipsData)}, function() {
        console.log('Settings saved');
      });
    }, 333);
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      let chipCount = instances[0].chipsData.length - 1;
      // Change last chip
      let lastChip = instances[0].chipsData[chipCount];
      instances[0].chipsData[chipCount] = JSON.parse(JSON.stringify(lastChip).slice(0, JSON.stringify(lastChip).indexOf('}')) + ', "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/8c55fdc6-9b84-4daf-a33b-cb318acbf994-profile_image-300x300.png"}');
      let imgUrl = 'https://static-cdn.jtvnw.net/jtv_user_pictures/8c55fdc6-9b84-4daf-a33b-cb318acbf994-profile_image-300x300.png'
      let img = document.createElement('img');
      img.src = imgUrl;
      console.log(document.getElementsByClassName('chip')[chipCount]);
      document.getElementsByClassName('chip')[chipCount].insertBefore(img, document.getElementsByClassName('chip')[chipCount].firstChild)
      localStorage.setItem('keywords', JSON.stringify(instances[0].chipsData));
      // Fetch here
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

  if (localStorage.getItem('keywords')) {
    var instances = M.Chips.init(elems, {
      data: localStorage.getItem('keywords') !== null ? JSON.parse(localStorage.getItem('keywords')) : [],
      limit: 10,
      autocompleteOptions: {
        data: {
          'Apple': null,
          'Microsoft': null,
          'Google': null
        },
        limit: Infinity,
        minLength: 1
      },
      // isProUser === true ? 25 : 5,
      // Add something like limit: 
      minLength: 1
    });
  } else {
    var instances = M.Chips.init(elems, {
      data: JSON.parse(localStorage.getItem('names')) !== null ? JSON.parse(localStorage.getItem('names')) : [],
      limit: 10,
      autocompleteOptions: {
        data: {
          'Apple': null,
          'Microsoft': null,
          'Google': null
        },
        limit: 10,
        minLength: 1
      },
      // isProUser === true ? 25 : 5,
      // Add something like limit: 
      minLength: 1
    });
  }

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