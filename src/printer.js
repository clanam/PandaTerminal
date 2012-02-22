/**
 *  Simple Printer class appends to a given JQuery object.
 *  Expects out to be a JQuery DOM object.
 *  @class Printer
 */
var Printer = function(out) {
    if (out) {
        this.out = out;
    }
};

Printer.prototype = {
    /**
     *  Where to print stuff to! :)
     *  Expects a jquery DOM object.
     *  @property output
     */
    out: null,

    /**
     *  Clear the print area.
     *  @method clear
     */
    clear: function() {
        this.out.html('');
    },

    /**
     *  Format a line for HTML printing.
     *  Sticks the given string in a <pre></pre> block.
     *  @method formatLine.
     *  @param {String} str
     */
    formatLine: function(str) {
        return ['<pre class="entry">: ', str, '<\/pre>'].join('');
    },

    /**
     *  Prints the given string to output, after formatting
     *  to fit in with HTML.
     *  @method print
     *  @param {String} str
     */
    print: function(str) {
        if (this.out) {
            this.out.append(this.formatLine(str));
        }
    },

    /**
     *  Prints the given string to output, no formatting.
     *  @method printPlain
     *  @param {String} str
     */
    printPlain: function(str) {
        if (this.out) {
            this.out.append(str);
        }
    }
};
