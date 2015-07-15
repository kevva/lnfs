# lnfs [![Build Status](http://img.shields.io/travis/kevva/lnfs.svg?style=flat)](https://travis-ci.org/kevva/lnfs)

> Safely force create symlinks

*See [lnfs-cli](https://github.com/kevva/lnfs-cli) for the command-line version.*


## Install

```
$ npm install --save lnfs
```


## Usage

```js
var symlink = require('lnfs');

symlink('foo.txt', 'bar.txt', function (err) {
	console.log('Symlink successfully created!');
});

symlink.sync('foo.txt', 'bar.txt');
```


## API

### lnfs(src, dest, type, callback)

#### src

*Required*  
Type: `string`

Path to source file.

#### dest

*Required*  
Type: `string`

Path to destination.

#### type

Type: `string`  
Default: `file`

Can be set to `dir`, `file`, or `junction` and is only available on Windows (ignored on other platforms).

#### callback(err)

Type: `function`

Returns nothing but a possible exception.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
