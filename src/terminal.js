/**
 *  Simple Javascript terminal.
 *
 *  Requires printer.js for Printer object.
 */

var $input = $('#input'),
    $terminal = $('body'),

    files = {
        'hi.txt': 'hello there',
        'bye.txt': 'i can\'t think of anything to write'
    },
    
    hist = [],
    currentStep = 0, // location in history

    waitingForCtrlSeq = false,

    out = new Printer($('#output')),

    cmds = {
        cat: function(file) {
            if (typeof(file) !== 'string') {
                out.print("No file specified.");
                return;
            }

            if (files[file]) {
                out.print(files[file]);
            } else {
                out.print(file + " not found.");
            }
        },
        echo: function() {
            if (arguments) {
                out.print(Array.prototype.slice.call(arguments, 0).join(' '));
            } else {
                out.print(' ');
            }
        },
        ls: function() {
            var str = '';
            $.each(files, function(key) {
                str += ' ' + key;
            });
            out.print(str);
        },
        panda: function() {
            out.print("          .--.");
            out.print("         / _  \\  ___      .--.");
            out.print("        | ( _.-\"\"   `'-.,' _  \\");
            out.print("         \\.\'            \'.  ) /");
            out.print("         /                \\_.\'");
            out.print("        /    .-.   .-.     \\");
            out.print("        |   / o \\ / o \\    |");
            out.print("        ;   \\.-'` `'-./    |");
            out.print("        /\\      ._.       /");
            out.print("      ;-'';_   ,_Y_,   _.'");
            out.print("     /     \\`--.___.--;.");
            out.print("    /|      '.__.---.  \\\\");
            out.print("   ;  \\              \\  ;'--. .-.");
            out.print("   |   '.    __..-._.'  |-,.-'  /");
            out.print("   |     `\"\"`  .---._  / .--.  /");
            out.print("  / ;         /      `-;/  /|_/");
            out.print("  \\_,\\       |            | |");
            out.print("  jgs '-...--'._     _..__\\/");
            out.print("                `\"\"\"`");
        }
    };

function parse(val) {
    var splat = val.split(/\s/);

    if (splat && splat[0]) {
        splat[0] = splat[0].toLowerCase(); // no case sensitivity

        if (cmds[splat[0]]) {
            cmds[splat[0]].apply(cmds, splat.slice(1));
        } else {
            out.print('unknown command: ' + splat[0]);
        }
    } else {
        out.print('unparsable command: ' + val);
    }
}

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
            out.print(v);
            if (v) {
                hist.push(v);
                currentStep = hist.length;
                parse(v);
                $input.html('');
            }
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
