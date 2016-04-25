'use strict';
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const pify = require('pify');
const rimraf = require('rimraf');
const fsP = pify(fs);

const link = (src, dest, type) => Promise.all([
	pify(rimraf)(dest),
	pify(mkdirp)(path.dirname(dest))
]).then(() => fsP.symlink(src, dest, type));

module.exports = (src, dest, type) => {
	if (typeof src !== 'string' || typeof dest !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	src = path.resolve(src);
	dest = path.resolve(dest);

	return fsP.lstat(dest)
		.then(stats => {
			if (!stats.isSymbolicLink()) {
				return link(src, dest, type);
			}

			return fsP.realpath(dest).then(res => res !== src && link(src, dest, type));
		})
		.catch(err => {
			if (err.code === 'ENOENT') {
				return link(src, dest, type);
			}

			throw err;
		});
};
