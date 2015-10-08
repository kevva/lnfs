'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var pify = require('pify');
var Promise = require('pinkie-promise');
var rimraf = require('rimraf');

function link(src, dest, type) {
	return Promise.all([
		pify(rimraf, Promise)(dest),
		pify(mkdirp, Promise)(path.dirname(dest))
	]).then(function () {
		return pify(fs.symlink, Promise)(src, dest, type);
	});
}

module.exports = function (src, dest, type) {
	if (typeof src !== 'string' || typeof dest !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	src = path.resolve(src);
	dest = path.resolve(dest);

	return pify(fs.lstat, Promise)(dest).then(function (stats) {
		if (!stats.isSymbolicLink()) {
			return link(src, dest, type);
		}

		return pify(fs.realpath, Promise)(dest).then(function (res) {
			if (res !== src) {
				return link(src, dest, type);
			}
		});
	}).catch(function (err) {
		if (err.code === 'ENOENT') {
			return link(src, dest, type);
		}

		throw err;
	});
};
