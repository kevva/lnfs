'use strict';
var fs = require('fs');
var path = require('path');
var pify = require('pify');
var Promise = require('pinkie-promise');
var test = require('ava');
var lnfs = require('./');
var realpath = pify(fs.realpath, Promise);
var unlink = pify(fs.unlink, Promise);

test('symlink a file', function (t) {
	t.plan(2);

	lnfs(__filename, 'tmp.js').then(function () {
		realpath('tmp.js').then(function (file) {
			t.assert(file === __filename, file);

			unlink('tmp.js').then(function () {
				t.assert(true);
			});
		});
	});
});

test('symlink a file two times', function (t) {
	t.plan(2);

	lnfs(__filename, 'tmp2.js').then(function () {
		lnfs(__filename, 'tmp2.js').then(function () {
			realpath('tmp2.js').then(function (file) {
				t.assert(file === __filename, file);

				unlink('tmp2.js').then(function () {
					t.assert(true);
				});
			});
		});
	});
});

test('overwrite symlink with new source', function (t) {
	t.plan(2);

	lnfs(__filename, 'tmp3.js').then(function () {
		lnfs('index.js', 'tmp3.js').then(function () {
			realpath('tmp3.js').then(function (file) {
				t.assert(file === path.resolve('index.js'), file);

				unlink('tmp3.js').then(function () {
					t.assert(true);
				});
			});
		});
	});
});
