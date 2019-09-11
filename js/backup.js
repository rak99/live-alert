

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.chips');
  
    // Use this as a global var pushing into to save to localStorage
    let strChipsData = [];
  
    document.addEventListener('mousedown', function() {
      setTimeout(() => {
        console.log(instances[0].chipsData);
        for (let elt of instances[0].chipsData) {
          if (strChipsData.indexOf(elt.tag) >= 0) {
            strChipsData.splice(strChipsData.indexOf(elt.tag), 1);
            localStorage.setItem('keywords', strChipsData);
            console.log(strChipsData);
          }
        }
      }, 333);
    });
  
    document.addEventListener('keydown', function(e) {
      console.log(e.keyCode);
      if (e.keyCode === 13) {
        console.log(instances[0].chipsData);
        for (let elt of instances[0].chipsData) {
          if (strChipsData.indexOf(elt.tag) === -1) {
            strChipsData.push(elt.tag);
            localStorage.setItem('keywords', strChipsData);
            console.log(strChipsData);
          }
        }
      } else if (e.keyCode === 8) {
        console.log(instances[0].chipsData);
        for (let elt of instances[0].chipsData) {
          if (strChipsData.indexOf(elt.tag) >= 0) {
            strChipsData.splice(strChipsData.indexOf(elt.tag), 1);
            localStorage.setItem('keywords', strChipsData);
            console.log(strChipsData);
          }
        }
      }
    });
  
    var instances = M.Chips.init(elems, {
      data: localStorage.getItem('keywords') !== null ? localStorage.getItem('keywords').indexOf('[') >= 0 ? JSON.parse(localStorage.getItem('keywords')) : localStorage.getItem('keywords') : [],
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