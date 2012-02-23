/**
 *  Fake file system.
 *  @object Fs
 */

var Fs = {

    /**
     *  Current user directory.
     *  @currDir
     */
    currDir: '',

    /**
     *  All files in the file system.
     *  @property files
     *  @static
     */
    files: {
        'myDir': {
            'spider.txt': [
                'The itsy bitsy spider went up the water spout.',
                'Down came the rain and washed the spider out.',
                'Out came the sun and dried up all the rain.',
                'And the itsy bitsy spider went up the spout again.'
            ].join('\n')
        },
        'hi.txt': 'Hello, there!',
        'bye.txt': 'I can\'t think of anything to write.'
    },

    /**
     *  Return the contents of a given file on a given filepath,
     *  or undefined if no such file found.
     *  @method getContents
     *  @param {String} filepath e.g. "hi.txt" or "myDir/bingopuppy.txt"
     *  @return {String|Undefined}
     */
    getContents: function(filepath) {
        var i, path, loc = Fs.files;

        if (!filepath || typeof(filepath) !== 'string') {
            return;
        }

        path = filepath.split('/');

        for (i = 0; i < path.length; i++) {
            if (!loc || typeof(loc) !== 'object' || typeof(loc[path[i]]) === 'undefined') {
                return;
            }

            loc = loc[path[i]];
        }

        return loc;
    },

    /**
     *  Lists all directories/files in the current directory.
     *  @method ls
     *  @return {Array} list of all folders and files
     */
    ls: function() {
        // TODO: other than root directory
        var location = Fs.files,
            files = [],
            folders = [];

        $.each(location, function(h) {
            if (typeof(Fs.files[h]) === 'string') {
                files.push(['<span class="ls-file">', h, '</span>'].join(''));
            } else if (typeof(Fs.files[h]) === 'object') {
                folders.push(['<span class="ls-folder">', h, '/</span>'].join(''));
            }
        });

        folders.sort();
        files.sort();
        files = folders.concat(files);

        return files;
    },

    /**
     *  Returns 'file', 'folder', or undefined.
     *  @method typeOf
     *  @param {String} filepath e.g. "hi.txt" or "myDir/bubbles.txt"
     *  @return {String|Undefined}
     */
    typeOf: function(filepath) {
        var type = typeof(this.getContents.apply(this, arguments));
        if (type === 'string') {
            return 'file';
        } else if (type === 'object') {
            return 'folder';
        } else {
            return;
        }
    }
};

