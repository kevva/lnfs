'use strict';
const fs = require('fs');
const path = require('path');
const del = require('del');
const makeDir = require('make-dir');
const pify = require('pify');
const pSeries = require('p-series');

const fsP = pify(fs);

const link = (src, dest, type) => pSeries([
	() => del(dest, {force: true}),
	() => makeDir(path.dirname(dest)),
	() => fsP.symlink(src, dest, type)
]);

module.exports = (src, dest, type) => {
	if (typeof src !== 'string') {
		return Promise.reject(new TypeError(`Expected a \`string\`, got \`${typeof src}\``));
	}

	if (typeof dest !== 'string') {
		return Promise.reject(new TypeError(`Expected a \`string\`, got \`${typeof dest}\``));
	}

	const resolvedSrc = path.resolve(src);
	const resolvedDest = path.resolve(dest);

	return fsP.lstat(resolvedDest)
		.then(stats => {
			if (!stats.isSymbolicLink()) {
				return link(resolvedSrc, resolvedDest, type);
			}

			return fsP.realpath(resolvedDest).then(res => res !== resolvedSrc && link(resolvedSrc, resolvedDest, type));
		})
		.catch(err => {
			if (err.code === 'ENOENT') {
				return link(resolvedSrc, dest, type);
			}

			throw err;
		});
};
