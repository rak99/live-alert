document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {
        exitDelay: 0, // Delay time before tooltip disappears. 
        enterDelay: 200, //	Delay time before tooltip appears.
        html: 'Please type in a streamer\'s name that you\'d like to alerted of, then simply press enter.', //	Can take regular text or HTML strings.
        margin: 5, // 	Set distance tooltip appears away from its activator excluding transitionMovement.
        inDuration: 300, // Enter transition duration.
        outDuration: 250, // Exit transition duration.
        position: 'bottom', // Set the direction of the tooltip. 'top', 'right', 'bottom', 'left'.
        transitionMovement: 10 // Amount in px that the tooltip moves during its transition.
    });
});