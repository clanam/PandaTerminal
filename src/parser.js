/**
 *  Parser class stores terminal commands.
 *  @class Parser
 *  @requires Printer
 *  @requires Vi
 */
var Parser = function() {
    this._init();
};

Parser.prototype = {
    /**
     *  Dinky comprehensive repository of all known commands.
     *  @property cmds
     */
    cmds: {

        bear: function() {
            this.print("                ___   .--.");
            this.print("          .--.-\"   \"-' .- |");
            this.print("         / .-,`          .'");
            this.print("         \\   `           \\");
            this.print("          '.            ! \\");
            this.print("            |     !  .--.  |");
            this.print("            \\        '--'  /.____");
            this.print("           /`-.     \\__,'.'      `\\");
            this.print("        __/   \\`-.____.-' `\\      /");
            this.print("        | `---`'-'._/-`     \\----'    _");
            this.print("        |,-'`  /             |    _.-' `\\");
            this.print("       .'     /              |--'`     / |");
            this.print("      /      /\\              `         | |");
            this.print("      |   .\\/  \\      .--. __          \\ |");
            this.print("       '-'      '._       /  `\\         /");
            this.print("          jgs      `\\    '     |------'`");
            this.print("                     \\  |      |");
            this.print("                      \\        /");
            this.print("                       '._  _.'");
            this.print("                          ``");
        },

        cat: function(file) {
            if (typeof(file) !== 'string') {
                this.print("No file specified.");
                return;
            }

            if (this._files[file]) {
                this.print(this._files[file]);
            } else {
                this.print(file + " not found.");
            }
        },

        echo: function() {
            if (arguments) {
                this.print(Array.prototype.slice.call(arguments, 0).join(' '));
            } else {
                this.print(' ');
            }
        },

        help: function() {
            var cmdList = [],
                self = this;

            $.each(self, function(key) {
                if (typeof(self[key]) === 'function') {
                    cmdList.push(key); // can i memo-ize this?
                }
            });

            cmdList.sort();
            this.print("Here is a list of all commands:");
            cmdList.forEach(function(val) {
                self.print("   " + val);
            });
        },

        ls: function() {
            var str = '', first = true;
            $.each(this._files, function(key) {
                if (first) {
                    str += key;
                    first = false;
                } else {
                    str += ' ' + key;
                }
            });
            this.print(str);
        },

        panda: function() {
            this.print("          .--.");
            this.print("         / _  \\  ___      .--.");
            this.print("        | ( _.-\"\"   `'-.,' _  \\");
            this.print("         \\.'            '.  ) /");
            this.print("         /                \\_.\'");
            this.print("        /    .-.   .-.     \\");
            this.print("        |   / o \\ / o \\    |");
            this.print("        ;   \\.-'` `'-./    |");
            this.print("        /\\      ._.       /");
            this.print("      ;-'';_   ,_Y_,   _.'");
            this.print("     /     \\`--.___.--;.");
            this.print("    /|      '.__.---.  \\\\");
            this.print("   ;  \\              \\  ;'--. .-.");
            this.print("   |   '.    __..-._.'  |-,.-'  /");
            this.print("   |     `\"\"`  .---._  / .--.  /");
            this.print("  / ;         /      `-;/  /|_/");
            this.print("  \\_,\\       |            | |");
            this.print("  jgs '-...--'._     _..__\\/");
            this.print("                `\"\"\"`");
        },

        squirrel: function() {
            this.print("                        ,;:;;,");
            this.print("                       ;;;;;");
            this.print("               .=',    ;:;;:,");
            this.print("              /_', \"=. ';:;:;");
            this.print("              @=:__,  \\,;:;:'");
            this.print("                _(\\.=  ;:;;'");
            this.print("               `\"_(  _/=\"`");
            this.print("        jgs     `\"'``");
        }
    },

    /**
     *  Temporary representation of a file system.
     *  @property files
     */
    files: {
        'hi.txt': 'Hello, there!',
        'bye.txt': 'I can\'t think of anything to write.'
    },

    /**
     *  Temporary way of handling console apps.
     *  @property openApp
     */
    openApp: null,

    /**
     *  Printer object.
     *  @property out
     */
    out: null,

    /**
     *  Initiate the parser object.
     *  @method _init
     *  @protected
     */
    _init: function() {
        var self = this;

        this.cmds.print = function() {
            self.print.apply(self, arguments);
        };

        this.cmds.vi = function() {
            if (self._vi) {
                self.openApp = self._vi;
                self._vi.onDeath = function() {
                    self.openApp = null;
                };
                self._vi.run(this.openApp);
            }
        };

        this.cmds._files = self.files;
        this._vi = new Vi();
    },

    /**
     *  Clear the printed area.
     *  @method clear
     */
    clear: function() {
        if (this.out && this.out instanceof Printer) {
            this.out.clear();
        }
    },

    /**
     *  Handle command parsing.
     *  @function parse
     *  @param {String} val the given command
     */
    parse: function(val) {
        var splat;

        this.print(val);

        if (!val) {
            return;
        }

        splat = val.split(/\s/);

        if (splat && splat[0]) {
            splat[0] = splat[0].toLowerCase(); // no case sensitivity

            if (typeof(this.cmds[splat[0]]) === 'function') {
                this.cmds[splat[0]].apply(this.cmds, splat.slice(1));
            } else {
                this.print('unknown command: ' + splat[0]);
            }
        } else {
            this.print('unparsable command: ' + val);
        }
    },

    /**
     *  Print to the printer object, if any.
     *  @method print
     *  @param {String} str
     */
    print: function(str) {
        if (this.out && this.out instanceof Printer) {
            this.out.print(str);
        }
    }
};
