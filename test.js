import fs from 'fs';
import path from 'path';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test.after(async () => {
	await fsP.unlink('tmp.js');
	await fsP.unlink('tmp2.js');
	await fsP.unlink('tmp3.js');
});

test('symlink a file', async t => {
	await m(__filename, 'tmp.js');
	const file = await fsP.realpath('tmp.js');
	t.is(file, __filename);
});

test('symlink a file two times', async t => {
	await m(__filename, 'tmp2.js');
	await m(__filename, 'tmp2.js');
	const file = await fsP.realpath('tmp2.js');
	t.is(file, __filename);
});

test('overwrite symlink with new source', async t => {
	await m(__filename, 'tmp3.js');
	await m('index.js', 'tmp3.js');
	const file = await fsP.realpath('tmp3.js');
	t.is(file, path.resolve('index.js'));
});
