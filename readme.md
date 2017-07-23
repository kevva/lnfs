# lnfs [![Build Status](http://img.shields.io/travis/kevva/lnfs.svg?style=flat)](https://travis-ci.org/kevva/lnfs)

> Safely force create symlinks


## Install

```
$ npm install lnfs
```


## Usage

```js
const lnfs = require('lnfs');

lnfs('foo.txt', 'bar.txt').then(() => {
	console.log('Symlink successfully created!');
});
```


## API

### lnfs(src, dest, [type])

Returns a `Promise` with the path to the symlink.

#### src

Type: `string`

Path to source file.

#### dest

Type: `string`

Path to destination.

#### type

Type: `string`<br>
Default: `file`

Can be set to `dir`, `file`, or `junction` and is only available on Windows (ignored on other platforms).


## Related

* [lnfs-cli](https://github.com/kevva/lnfs-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
