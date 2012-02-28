/**
 *  ^_^'
 *  @class Vi
 *  @requires Fs
 */

var Vi = function() {
    this._init.apply(this, arguments);
};

Vi.prototype = {

    /**
     *  UI. The display area.  Defaults to $('#vi').
     *  @property $ui
     */
    $ui: null,

    /**
     *  Path to current file in Fs.
     *  @property _path
     */
    _path: '',

    /**
     *  Flag: in edit mode or command mode?
     *  @property _isEditMode
     *  @protected
     */
    _isEditMode: false,

    /**
     *  Initiate the vi object.
     *  @method _init
     *  @protected
     */
    _init: function() {
        this.$ui = $('#vi');
    },

    /**
     *  End the mayhem.
     *  @method die
     */
    die: function() {
        if (this.$ui) {
            this.$ui.addClass('snoozing');
        }

        if (typeof(this.onDeath) === 'function') {
            this.onDeath();
        }
    },

    /**
     *  Accepts a keyboard key event.  I need to abstract this out. :(
     *  @method io
     *  @param {Object} e the key event (JQuery format)
     */
    io: function(e) {
        var v = $input.html(),
            key = e.keyCode || e.which,
            isCtrl = e.metaKey || false,
            isShift = e.shiftKey || false,
            letter;

        if (isCtrl) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        this.die();
    },

    /**
     *  Start the mayhem.
     *  @method run
     *  @param {String} filename
     */
    run: function(filename) {
        if (!this.$ui) {
            this.die();
        }

        this._path = filename;
        this.$ui.html(this._viFormat(Fs.getContents(filename)));
        this.$ui.removeClass('snoozing');
    },

    /**
     *  Format text to make it easier to style as fake vi text.
     *  @method _viFormat
     *  @protected
     *  @param {String} text
     *  @return {String}
     */
    _viFormat: function(text) {
        var chars = text.split(''),
            result = [],
            i;

        for (i = 0; i < chars.length; i++) {
            result.push('<span class="vi-char');

            if ((chars[i] >= 'a' && chars[i] <= 'z') || (chars[i] >= 'A' && chars[i] <= 'Z')) {
                result.push(' vi-char-');
                result.push(chars[i]);
            }

            result.push('" id="vi-pos-');
            result.push(i);
            result.push('">');
            result.push(chars[i]);
            result.push('</span>');
        }

        return result.join('');
    }
};
