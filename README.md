## xbrief
A stringify tool to javascript object

[![npm version][npm-image]][npm-url]
[![npm quality][quality-image]][quality-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/xbrief.svg?style=flat-square
[npm-url]: https://npmjs.org/package/xbrief
[quality-image]: http://npm.packagequality.com/shield/xbrief.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=xbrief
[download-image]: https://img.shields.io/npm/dm/xbrief.svg?style=flat-square
[download-url]: https://npmjs.org/package/xbrief
[license-image]: https://img.shields.io/npm/l/xbrief.svg
[license-url]: https://npmjs.org/package/xbrief

## Features

- A substitute for JSON.stringify
- ES2015 syntax

## Install

```console
$ npm install xbrief
```

## Usage

```js
import { deco } from 'xbrief'

const objects = {
  boolean: true,
  string: 'Shakespeare',
  number: 128,
  null: null,
  undefined: undefined,
  one_row_matrix: [ [1, 1, 2, 3, 5, 8, 13, 21] ],
  simple_set: new Set([1, 1, 1, 2, 2, 3, 3, 3]),
  simple_matrix: Array.from({ length: 3 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) => x + y + 1)),
  simple_map: new Map([['Lagos', 861], ['Dhaka', 8906], ['Lima', 9174], ['Ankara', 5271], ['Nagpur', 2405]]),
  simple_lambda: (x) => `${x}`,
}

console.log(deco(objects))
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Haoyang (Vincent) Wang
