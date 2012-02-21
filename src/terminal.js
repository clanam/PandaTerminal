/**
 *  Simple Javascript terminal.
 *
 *  Requires parser.js for terminal commands.
 */

var $input = $('#input'),
    $terminal = $('body'),
    
    hist = [],
    currentStep = 0, // location in history

    waitingForCtrlSeq = false,

    parser = new Parser();

parser.out = new Printer($('#output'));

$terminal.bind('keydown', function(e) {
    var v = $input.html(),
        key = e.keyCode || e.which;

    if (e.ctrlKey || key === 91 /*ctrl*/) {
        waitingForCtrlSeq = true;
        return;
    } else if (waitingForCtrlSeq && key === 16 /*shift*/) {
        return;
    } else if (waitingForCtrlSeq) {
        // if I don't do this, ctrl+r page reloads are getting munched
        waitingForCtrlSeq = false;
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    switch (key) {
        case 8: // backspace
            $input.html(v.substr(0, v.length-1));
            break;
        case 13: // return
            if (v) {
                hist.push(v);
                currentStep = hist.length;
            }
            parser.parse(v);
            $input.html('');
            break;
        case 38: // up arrow
            if (currentStep <= 0) {
                return;
            }
            currentStep--;
            $input.html(hist[currentStep]);
            break;
        default:
            $input.append(String.fromCharCode(key));
            break;
    }
});
