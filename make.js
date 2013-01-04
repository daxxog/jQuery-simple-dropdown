var UglifyJS = require('uglify-js'),
    fs = require('fs');

fs.writeFileSync('./jsd.min.js', UglifyJS.minify('./jsd.js'));