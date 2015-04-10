'use strict';

var fs = require('fs');
var path = require('path');
var test = require('ava');
var lnfs = require('./');

test('symlink a file', function (t) {
	t.plan(4);

	lnfs(__filename, 'tmp.js', function (err) {
		t.assert(!err, err);

		fs.realpath('tmp.js', function (err, file) {
			t.assert(!err, err);
			t.assert(file === __filename, file);

			fs.unlink('tmp.js', function (err) {
				t.assert(!err, err);
			});
		});
	});
});

test('symlink a file two times', function (t) {
	t.plan(5);

	lnfs(__filename, 'tmp2.js', function (err) {
		t.assert(!err, err);

		lnfs(__filename, 'tmp2.js', function (err) {
			t.assert(!err, err);

			fs.realpath('tmp2.js', function (err, file) {
				t.assert(!err, err);
				t.assert(file === __filename, file);

				fs.unlink('tmp2.js', function (err) {
					t.assert(!err, err);
				});
			});
		});
	});
});

test('overwrite symlink with new source', function (t) {
	t.plan(5);

	lnfs(__filename, 'tmp3.js', function (err) {
		t.assert(!err, err);

		lnfs('index.js', 'tmp3.js', function (err) {
			t.assert(!err, err);

			fs.realpath('tmp3.js', function (err, file) {
				t.assert(!err, err);
				t.assert(file === path.resolve('index.js'), file);

				fs.unlink('tmp3.js', function (err) {
					t.assert(!err, err);
				});
			});
		});
	});
});

test('symlink a file synchronously', function (t) {
	lnfs.sync(__filename, 'tmp4.js');
	t.assert(fs.realpathSync('tmp4.js') === __filename, fs.realpathSync('tmp4.js'));
	fs.unlinkSync('tmp4.js');
	t.end();
});

test('symlink a file two times synchronously', function (t) {
	lnfs.sync(__filename, 'tmp5.js');
	lnfs.sync(__filename, 'tmp5.js');
	t.assert(fs.realpathSync('tmp5.js') === __filename, fs.realpathSync('tmp5.js'));
	fs.unlinkSync('tmp5.js');
	t.end();
});

test('overwrite symlink with new source synchronously', function (t) {
	lnfs.sync(__filename, 'tmp6.js');
	lnfs.sync('index.js', 'tmp6.js');
	t.assert(fs.realpathSync('tmp6.js') === path.resolve('index.js'), fs.realpathSync('tmp6.js'));
	fs.unlinkSync('tmp6.js');
	t.end();
});
