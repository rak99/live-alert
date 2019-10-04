/**
 * Popup content here
 * Make a nice theme, when text is highlighted the popup should show the word with a dropdown, the dropdown then displays all information about the word
 */

// !-- Trim the selection to eliminate spaces, also - stop popup from executing if there are more than 2 words, or if the user wants maybe they can enable a beta mode where mutliple words can be selected and there will be multiple words
// !-- in the popup, all of which can be dropped down

// ! ----- Modes of requests ----- !

// Consider adding hover mode, check wikipedia functionality for idea on implementation

// !-- ADD HOVER KEYBIND MODE, upon installation, a popup appears asking users to set a keybind along with hovering over the word, so let's say they choose
// middle-mouse, hovering over a word and pressing middle mouse button will open embed with that word in, need to find how to get word from a hover though
// maybe check mouse position, nearest word to mouse till spaces, trim it and there's the word.

/* let loading3rd = document.createElement('img');
loading3rd.src = 'chrome-extension://mclbphjeilficpgimkclonokbohcbiga/icons/spinner-1st-eraser.png';
let loadingHalf = document.createElement('img');
loadingHalf.src = 'chrome-extension://mclbphjeilficpgimkclonokbohcbiga/icons/spinner-2nd-eraser.png';
let loadingFull = document.createElement('img');
loadingFull.src = 'chrome-extension://mclbphjeilficpgimkclonokbohcbiga/icons/spinner-full-eraser.png'; */

let loading3rd = document.createElement('h3');
loading3rd.textContent = '3..';
loading3rd.className = 'countdownTimer';
let loadingHalf = document.createElement('h3');
loadingHalf.textContent = '2..';
loading3rd.className = 'countdownTimer';
let loadingFull = document.createElement('h3');
loadingFull.textContent = '1..';
loading3rd.className = 'countdownTimer';
let count = 0;
let stopFunction = false;

function countdownTimer(el) {
    let text = el.textContent;
    console.log(text);
    if (stopFunction === true) {
        return;
    }
    let countdownTimeout3 = setTimeout(() => {
        count +=1;
        console.log(count);
        el.appendChild(loading3rd);
        //if () { countdownTimeout2(); }
        if (stopFunction === true) {
            loading3rd.remove();
            return;
        } else {
            loading3rd.remove();
            countdownTimeout2;
        }
    }, 1000);
    
    let countdownTimeout2 = setTimeout(() => {
        count+=1;
        console.log(count);
        el.appendChild(loadingHalf);
        if (stopFunction === true) {
            loadingHalf.remove();
            return;
        } else {
            loadingHalf.remove();
            countdownTimeout3;
        }
    }, 2000);
    
    let countdownTimeout1 = setTimeout(() => {
        count+=1;
        console.log(count);
        el.appendChild(loadingFull);
        loadingFull.remove();
        popup(el);
    }, 3000);
};

$(function() {
    // wrap words in spans
    $('p').each(function() {
        var $this = $(this);
        derp = $this;
        $this.html($this.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
    });

    // bind to each span
    $('p span').hover(
        function() { 
            countdownTimer($(this)[0]); 
            $('#word').text($(this).css('background-color','#ffff66').text());  
        },
        function() { 
            stopFunction = true; 
            $('#word').text(''); 
            $(this).css('background-color',''); 
        }
    );
});

function popup(el) {
    // Do timeout popup here!
    console.log('Show popup!');
    let text = el.textContent
    console.log(text);
    let selectedDOM = el;
    console.log(el);

    el.outerHTML = `<b>${el.outerHTML}</b>`; 
    // Begin popup ---

    let popupNode = document.createElement('iframe');
    popupNode.src = `https://www.merriam-webster.com/dictionary/${text}`;
    popupNode.className = "selectedWord";
    // Styling
    popupNode.id = 'defineIt-popupNode';
    el.insertBefore(popupNode, el.firstChild);
    console.log(popupNode, el.firstChild);
    console.log(el);
    const showPopup = () => {   
        console.log('do');
        if ( document.getElementById('defineIt-popupNode') ) {
            let popupNodePositions = popupNode.getBoundingClientRect();
            console.log(popupNodePositions);
            let popupNodeLeftToRight = popupNodePositions.x + popupNodePositions.width;
            let popupNodeTopToBottom = popupNodePositions.y + popupNodePositions.height;
            var x = event.clientX;     // Get the horizontal coordinate
            var y = event.clientY;     // Get the vertical coordinate
            var coor = "X coords: " + x + ", Y coords: " + y;
            console.log(coor);
            if ( ( x < (popupNodePositions.x) || x > popupNodeLeftToRight ) || y < (popupNodePositions.y) || y > popupNodeTopToBottom ) {
                console.log('mouse outside inside iframe!', x, popupNodePositions.x, popupNodeLeftToRight);
                console.log(el, popupNode.getBoundingClientRect());
                document.getElementById('defineIt-popupNode').remove();
                $(el).contents().unwrap();
                window.removeEventListener('mousedown', showPopup, false);
                let popupNodePosition = popupNode.getBoundingClientRect();
                console.log(popupNodePosition);
                console.log(popupNode.style.width);
                popupNode.style.left = (el.left - popupNodePosition.left + 'px') + popupNode.style.width;
                console.log(el.left, popupNodePosition.left, popupNode );
                console.log(popupNode.style.left, el.left, el.left - popupNodePosition.left + 'px');
            }
        }
    };
    window.addEventListener('mousedown', showPopup, false);
    $(el).contents().unwrap();
    // End popup ---
    return text;

}

function getSelectionText(e) {
    let selectedNodeIndex = 0;
    let nodeCount = 0;
    var text = "";
    let promise = [];
    if (window.getSelection && window.getSelection().toString().trim().length > 0) {

        // !-- IMPORTANT, STOP DESELECTION SO USERS CAN'T COPY WHEN HIGHLIGHTED

        // Rework to use x and y rather than document I think... 
        text = window.getSelection().toString().trim();
        console.log(text);
        let selectedDOM = window.getSelection().focusNode;
        console.log(selectedDOM, window.getSelection());
        // !-- This below method may be inconsistent if there are more versions of the dom element surrounding the selection, this method searches the entire body for the text, and assumes it appears only once.
        // Use below as reference, with the emphasis on range as it allows dom insertion at the specific select.
        let highlight = window.getSelection(),
        // bold = $('<b/></b>')[0],
        bold = document.createElement('b'),
        range = highlight.getRangeAt(0);
        range.surroundContents(bold);   
        let boldPosition = bold.getBoundingClientRect();
        // Begin popup ---
/*         let popupNode = document.createElement("div");
        popupNode.className = "selectedWord";
        let selectedWordTextNode = document.createTextNode(`${text}`);
        popupNode.appendChild(selectedWordTextNode);
        range.insertNode(popupNode);
        let rangeNode = range.startOffset; */
        let popupNode = document.createElement('iframe');
        popupNode.src = `https://www.merriam-webster.com/dictionary/${range}`;
        popupNode.className = "selectedWord";
        // Styling
        popupNode.id = 'defineIt-popupNode';
        console.log(range);
        range.insertNode(popupNode);
        let rangeNode = range.startOffset;
        console.log(boldPosition);
        const showPopup = () => {   
            console.log('do');
            if ( document.getElementById('defineIt-popupNode') ) {
                let popupNodePositions = popupNode.getBoundingClientRect();
                console.log(popupNodePositions);
                let popupNodeLeftToRight = popupNodePositions.x + popupNodePositions.width;
                let popupNodeTopToBottom = popupNodePositions.y + popupNodePositions.height;
                var x = event.clientX;     // Get the horizontal coordinate
                var y = event.clientY;     // Get the vertical coordinate
                var coor = "X coords: " + x + ", Y coords: " + y;
                console.log(coor);
                if ( ( x < (popupNodePositions.x) || x > popupNodeLeftToRight ) || y < (popupNodePositions.y) || y > popupNodeTopToBottom ) {
                    console.log('mouse outside inside iframe!', x, popupNodePositions.x, popupNodeLeftToRight);
                    console.log(bold, popupNode.getBoundingClientRect());
                    // range.startContainer.childNodes[rangeNode].remove();
                    document.getElementById('defineIt-popupNode').remove();
                    $(bold).contents().unwrap();
                    window.removeEventListener('mousedown', showPopup, false);
                    let popupNodePosition = popupNode.getBoundingClientRect();
                    console.log(popupNodePosition);
                    console.log(popupNode.style.width);
                    popupNode.style.left = (boldPosition.left - popupNodePosition.left + 'px') + popupNode.style.width;
                    console.log(boldPosition.left, popupNodePosition.left, popupNode );
                    console.log(popupNode.style.left, boldPosition.left, boldPosition.left - popupNodePosition.left + 'px');
                }
                // x + width to get total width of x of popup, do if to check if mouse is outside/inside it
                // same for y
            }
/*             if (window.getSelection().toString().trim().length > 0) {
                console.log(bold, popupNode.getBoundingClientRect());
                range.startContainer.childNodes[rangeNode].remove();
                
                $(bold).contents().unwrap();
                document.getElementById('defineIt-popupNode').remove();
                window.removeEventListener('mousedown', showPopup, false);
            } */
        };
        window.addEventListener('mousedown', showPopup, false);
        $(bold).contents().unwrap();
        // End popup ---
    } else if (document.selection && document.selection.type != "Control" && document.selection.createRange().text.length > 0) {
        text = document.selection.createRange().text;
        console.log(text);
        let selectedDOM = document.selection.createRange().focusNode;
        // Begin popup ---
        let popupNode = document.createElement("div");
        popupNode.className = "selectedWord";
        let selectedWordTextNode = document.createTextNode(`${text}`);
        popupNode.appendChild(selectedWordTextNode);
        selectedDOM.appendChild(popupNode);
        const showPopup = () => {
            selectedDOM.lastChild.remove();
            window.removeEventListener('click', showPopup, false);
        };
        window.addEventListener('click', showPopup, false);
        // End popup ---
    }
    return text;
}
window.addEventListener('mouseup', e => {
    console.log('mouse up!');
    getSelectionText(e);
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'followersProcessed') {
        console.log('Followers Processed');
        document.getElementsByClassName('spinner-layer')[0].hidden = true;
        document.getElementById('usernameArea').hidden = false;
        window.location.href = 'chrome-extension://gfipmfpmegnlpolmjoocigllppobanfe/keywords.html';
    }
});