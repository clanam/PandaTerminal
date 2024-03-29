/**
 *  Parser class stores terminal commands.
 *  @class Parser
 *  @requires Printer
 *  @requires Fs
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
            if (!file) {
                this.print("             *     ,MMM8&&&.            *");
                this.print("                  MMMM88&&&&&    .");
                this.print("                 MMMM88&&&&&&&");
                this.print("     *           MMM88&&&&&&&&");
                this.print("                 MMM88&&&&&&&&");
                this.print("                 'MMM88&&&&&&'");
                this.print("                   'MMM8&&&'      *");
                this.print("          |\\___/|");
                this.print("          )     (             .              '");
                this.print("         =\\     /=");
                this.print("           )===(       *");
                this.print("          /     \\");
                this.print("          |     |");
                this.print("         /       \\");
                this.print("         \\       /");
                this.print("  _/\\_/\\_/\\__  _/_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_");
                this.print("  |  |  |  |( (  |  |  |  |  |  |  |  |  |  |");
                this.print("  |  |  |  | ) ) |  |  |  |  |  |  |  |  |  |");
                this.print("  |  |  |  |(_(  |  |  |  |  |  |  |  |  |  |");
                this.print("  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |");
                this.print("  jgs|  |  |  |  |  |  |  |  |  |  |  |  |  |");
                return;
            }

            if (typeof(file) !== 'string') {
                this.print("No file specified.");
                return;
            }

            var type = Fs.typeOf(file);

            if (type === 'file') {
                this.print(Fs.getContents(file));
            } else if (type === 'folder') {
                this.print(file + ' is a folder.');
            } else {
                this.print(file + ' not found.');
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
            var list = Fs.ls();
            if (list && list.join) {
                this.print(list.join(' '));
            } else {
                this.print('no files');
            }
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
            var filename = arguments[0] || '';

            if (self._vi) {
                self.openApp = self._vi;
                self._vi.onDeath = function() {
                    self.openApp = null;
                };
                self._vi.run(filename);
            }
        };

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

        if (!val) {
            this.print('');
            return;
        }

        splat = val.split(/\s/);

        if (splat && splat[0]) {
            this.print(['<span class="cmd">', splat[0], '</span> ', splat.slice(1).join(' ')].join(''));
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
