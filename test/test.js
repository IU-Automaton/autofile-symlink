'use strict';

var expect    = require('expect.js'),
    isFile    = require('./util/is-file'),
    isDir     = require('./util/is-dir'),
    fs        = require('fs'),
    rimraf    = require('rimraf'),
    symlink   = require('../autofile'),
    automaton = require('automaton').create()
;

describe('symlink', function () {
    var target = __dirname + '/tmp/';

    function clean(done) {
        rimraf(target, done);
    }

    beforeEach(function (done) {
        clean(function (err) {
            if (err) {
                throw err;
            }

            fs.mkdirSync(target);
            done();
        });
    });
    after(clean);

    it('should create symlink for files', function (done) {
        var dst = target + 'file.js';

        automaton.run(symlink, {
            dst: dst,
            src: __dirname + '/assets/folder/file.js',
            type: 'file'
        }, function (err) {
            if (err) {
                throw err;
            }

            expect(isFile(dst)).to.be(true);
            done();
        });
    });

    it('should create symlink for directories', function (done) {
        automaton.run(symlink, {
            dst: target + 'folder',
            src: __dirname + '/assets/folder',
            type: 'dir'
        }, function (err) {
            if (err) {
                throw err;
            }

            expect(isDir(target + 'folder')).to.be(true);
            done();
        });

    });
});