var $output = $('#output'),
    $input = $('#input'),
    $terminal = $('body'),

    files = {
        'hi.txt': 'hello there',
        'bye.txt': 'i can\'t think of anything to write'
    },
    
    hist = [],
    currentStep = 0, // location in history

    waitingForCtrlSeq = false,

    cmds = {
        cat: function(file) {
            if (typeof(file) !== 'string') {
                print("No file specified.");
                return;
            }

            if (files[file]) {
                print(files[file]);
            } else {
                print(file + " not found.");
            }
        },
        echo: function() {
            if (arguments) {
                print(Array.prototype.slice.call(arguments, 0).join(' '));
            } else {
                print(' ');
            }
        },
        ls: function() {
            var str = '';
            $.each(files, function(key) {
                str += ' ' + key;
            });
            print(str);
        },
        panda: function() {
            print("          .--.");
            print("         / _  \\  ___      .--.");
            print("        | ( _.-\"\"   `'-.,' _  \\");
            print("         \\.\'            \'.  ) /");
            print("         /                \\_.\'");
            print("        /    .-.   .-.     \\");
            print("        |   / o \\ / o \\    |");
            print("        ;   \\.-'` `'-./    |");
            print("        /\\      ._.       /");
            print("      ;-'';_   ,_Y_,   _.'");
            print("     /     \\`--.___.--;.");
            print("    /|      '.__.---.  \\\\");
            print("   ;  \\              \\  ;'--. .-.");
            print("   |   '.    __..-._.'  |-,.-'  /");
            print("   |     `\"\"`  .---._  / .--.  /");
            print("  / ;         /      `-;/  /|_/");
            print("  \\_,\\       |            | |");
            print("  jgs '-...--'._     _..__\\/");
            print("                `\"\"\"`");
        }
    };

function formatLine(str) {
    return ['<pre class="entry">: ', str, '<\/pre>'].join('');
}

function print(str) {
    $output.append(formatLine(str));
}

function parse(val) {
    var splat = val.split(/\s/);
    if (splat && splat[0]) {
        splat[0] = splat[0].toLowerCase(); // no case sensitivity
        if (cmds[splat[0]]) {
            cmds[splat[0]].apply(cmds, splat.slice(1));
        }
    } else {
        print('unknown command: ' + val);
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
            print(v);
            if (v) {
                hist.push(v);
                currentStep = history.length;
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
