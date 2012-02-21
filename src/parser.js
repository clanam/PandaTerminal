/**
 *  Parser class stores terminal commands.
 *  @class Parser
 *  @requires Printer
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

        cat: function(file) {
            if (typeof(file) !== 'string') {
                this.print("No file specified.");
                return;
            }

            if (this.files[file]) {
                this.print(this.files[file]);
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

        ls: function() {
            var str = '', first = true;
            $.each(this.files, function(key) {
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
            this.print("         \\.\'            \'.  ) /");
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

        this.cmds.files = self.files;
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

            if (this.cmds[splat[0]]) {
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
