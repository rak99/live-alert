/**
 * Popup content here
 * Make a nice theme, when text is highlighted the popup should show the word with a dropdown, the dropdown then displays all information about the word
 */

// !-- Trim the selection to eliminate spaces, also - stop popup from executing if there are more than 2 words, or if the user wants maybe they can enable a beta mode where mutliple words can be selected and there will be multiple words
// !-- in the popup, all of which can be dropped down

function getSelectionText(e) {
    let selectedNodeIndex = 0;
    let nodeCount = 0;  
    var text = "";
    let promise = [];
    if (window.getSelection && window.getSelection().toString().trim().length > 0) {.

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
        let selectedWordNode = document.createElement("div");
        selectedWordNode.className = "selectedWord";
        let selectedWordTextNode = document.createTextNode(`${text}`);
        selectedWordNode.appendChild(selectedWordTextNode);
        range.insertNode(selectedWordNode);
        let rangeNode = range.startOffset;
        console.log(boldPosition);
        const showPopup = () => {
            console.log('do');
            if (window.getSelection().toString().trim().length > 0) {
                //range.commonAncestorContainer.childNodes[rangeNode].remove();
                console.log(bold, selectedWordNode.getBoundingClientRect());
                // range.startContainer.nextSibling.remove();
                range.startContainer.childNodes[rangeNode].remove();
                $(bold).contents().unwrap()
                window.removeEventListener('mousedown', showPopup, false);
            }
        };
        window.addEventListener('mousedown', showPopup, false);
        let selectedWordNodePosition = selectedWordNode.getBoundingClientRect();
        console.log(selectedWordNodePosition);
        selectedWordNode.style.left = boldPosition.left - selectedWordNodePosition.left + 'px';
        console.log(boldPosition.left, selectedWordNodePosition.left, selectedWordNode );
        // End popup ---
    } else if (document.selection && document.selection.type != "Control" && document.selection.createRange().text.length > 0) {
        text = document.selection.createRange().text;
        console.log(text);
        let selectedDOM = document.selection.createRange().focusNode;
        // Begin popup ---
        let selectedWordNode = document.createElement("div");
        selectedWordNode.className = "selectedWord";
        let selectedWordTextNode = document.createTextNode(`${text}`);
        selectedWordNode.appendChild(selectedWordTextNode);
        selectedDOM.appendChild(selectedWordNode);
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