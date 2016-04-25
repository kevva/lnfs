import fs from 'fs';
import path from 'path';
import pify from 'pify';
import test from 'ava';
import fn from './';

const realpath = pify(fs.realpath);
const unlink = pify(fs.unlink);

test('symlink a file', async t => {
	await fn(__filename, 'tmp.js');

	const file = await realpath('tmp.js');
	t.is(file, __filename);

	await unlink('tmp.js');
});

test('symlink a file two times', async t => {
	await fn(__filename, 'tmp2.js');
	await fn(__filename, 'tmp2.js');

	const file = await realpath('tmp2.js');
	t.is(file, __filename);

	await unlink('tmp2.js');
});

test('overwrite symlink with new source', async t => {
	await fn(__filename, 'tmp3.js');
	await fn('index.js', 'tmp3.js');

	const file = await realpath('tmp3.js');
	t.is(file, path.resolve('index.js'));

	await unlink('tmp3.js');
});
