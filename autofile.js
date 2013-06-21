'use strict';

var fs = require('fs');

module.exports = function (task) {
    task
    .id('symlink')
    .name('Symlink')
    .description('Create a symlink.')
    .author('Indigo United')

    .option('src', 'The original file you want to reference.')
    .option('dst', 'The symlink file that will be generated.')
    .option('type', 'Can be either "dir", "file", or "junction" (default is "file"). Check http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback for more info.', 'file')

    .do(function (opt, ctx, next) {
        fs.symlink(opt.src, opt.dst, opt.type, next);
    });
};
