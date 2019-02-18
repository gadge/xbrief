'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeLine = exports.deco = exports.noop = exports.emb = exports.aeu = exports.tb = exports.rn = undefined;

require('./ext/extArray');

require('./ext/extMatrix');

require('./ext/extMap');

var _deco = require('./ext/deco');

var _wl = require('./wl/wl');

exports.rn = _wl.rn;
exports.tb = _wl.tb;
exports.aeu = _wl.aeu;
exports.emb = _wl.emb;
exports.noop = _wl.noop;
exports.deco = _deco.deco;
exports.writeLine = _wl.writeLine;