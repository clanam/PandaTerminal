/**
 *  ^_^'
 * @class Vi
 * @requires Fs
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
        if (this.$ui) {
            this.$ui.removeClass('snoozing');
        }
    }

};
