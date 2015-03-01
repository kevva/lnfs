#!/usr/bin/env node
'use strict';

var lnfs = require('./');
var meow = require('meow');

var cli = meow({
	help: [
		'Usage',
		'  $ lnfs <file> <target>',
		'',
		'Example',
		'  $ lnfs foo.txt bar.txt'
	].join('\n')
});

lnfs(cli.input[0], cli.input[1], function (err) {
	if (err) {
		console.error(err.message);
		return;
	}
});
