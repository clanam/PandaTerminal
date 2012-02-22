/**
 *  Simple Javascript terminal.
 *
 *  Requires parser.js for terminal commands.
 *  Requires printer.js to create a printer for parser.js.
 */

var $input = $('#input'),
    $terminal = $('body'),
    
    hist = [],
    currentStep = 0, // location in history

    parser = new Parser();

parser.out = new Printer($('#output'));

$terminal.bind('keydown', function(e) {
    var v = $input.html(),
        key = e.keyCode || e.which,
        isCtrl = e.metaKey || false,
        isShift = e.shiftKey || false,
        letter;

    // if I don't do this, ctrl+r page reloads are getting munched
    if (isCtrl) {
        if (key === 75 /*k*/) {
            parser.clear();
        }
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
        case 32: // space
            $input.append(' ');
            break;
        case 38: // up arrow
            if (currentStep <= 0) {
                return;
            }
            currentStep--;
            $input.html(hist[currentStep]);
            break;
        case 40: //down arrow
            if (currentStep >= hist.length) {
                return;
            }
            currentStep++;
            $input.html(hist[currentStep]);
            break;
        case 188: // comma
            $input.append(','); // from CharCode fails on some :(
            break;
        case 189: // dash
            $input.append(isShift? '_' : '-');
            break;
        case 190: // period
            $input.append('.');
            break;
        default:
            if (key >= 48 /*0*/ && key <= 57 /*9*/) {
                letter = String.fromCharCode(key);
                $input.append(letter);
            } else if (key >= 65 /*A*/ && key <= 90 /*Z*/) {
                letter = String.fromCharCode(key); // defaults to CAPS
                letter = isShift? letter : letter.toLowerCase();
                $input.append(letter);
            }
            break;
    }
});
