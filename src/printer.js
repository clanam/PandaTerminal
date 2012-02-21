var Printer = function(out) {
    if (out) {
        this.out = out;
    }
};

Printer.prototype = {
    /**
     *  Where to print stuff to! :)
     *  @property output
     */
    out: null,

    /**
     *  Format a line for HTML printing.
     *  Sticks the given string in a <pre></pre> block.
     *  @method formatLine.
     */
    formatLine: function(str) {
        return ['<pre class="entry">: ', str, '<\/pre>'].join('');
    },

    /**
     *  Prints the given string to output, after formatting
     *  to fit in with HTML.
     *  @method print
     */
    print: function(str) {
        if (this.out) {
            this.out.append(this.formatLine(str));
        }
    },

    /**
     *  Prints the given string to output, no formatting.
     *  @method printPlain
     */
    printPlain: function(str) {
        if (this.out) {
            this.out.append(str);
        }
    }
};
