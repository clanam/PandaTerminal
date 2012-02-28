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
     *  Cursor position
     *  @property _cursor
     *  @type {Number}
     *  @protected
     */
    _cursor: 0,

    /**
     *  Length, in characters, of the current file.
     *  @property _fileLength
     *  @type {Number}
     *  @protected
     */
    _fileLength: 0,

    /**
     *  Path to current file in Fs.
     *  @property _path
     *  @type {String}
     *  @protected
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
        var contents;

        if (!this.$ui) {
            this.die();
        }

        this._path = filename;
        contents = Fs.getContents(filename) || '';
        this._fileLength = contents.length;

        this.$ui.html(this._viFormat(contents));
        this.$ui.removeClass('snoozing');
        this._placeCursor(0);
    },

    /**
     *  Places the cursor at a given position in the file.
     *  Caps at 0 and at file.length.
     *  @method _placeCursor
     *  @param {Number} index
     *  @protected
     */
    _placeCursor: function(index) {
        var $cursed, $uncursed,
            prev = this._cursor || 0;

        index = (index < 0)? 0 : index;
        index = (index > this._fileLength)? this._fileLength : index;
        this._cursor = index;

        $uncursed = $('#vi-pos-' + prev); // inefficient -- store?
        $cursed = $('#vi-pos-' + this._cursor);

        $uncursed.removeClass('cursor');
        $cursed.addClass('cursor');
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

        result.push('<span class="vi-char vi-char-end" id="vi-pos-');
        result.push(chars.length);
        result.push('">&nbsp;</span>');

        return result.join('');
    }
};
