/**
 *  ^_^'
 * @class Vi
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
    },

    /**
     *  Start the mayhem.
     *  @method run
     */
    run: function() {
        if (this.$ui) {
            this.$ui.removeClass('snoozing');
        }
    }

};
