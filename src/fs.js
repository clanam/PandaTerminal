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
    }
};

