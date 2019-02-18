'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _euler = require('../../euler/euler');

var _wl = require('../wl/wl');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Array.prototype.hBrief = function () {
  var delimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ', ';
  var abstract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };
  var take = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  switch (true) {
    case this.length === 0:
      return _wl.aeu;
    case take >= 1 && take <= this.length - 3:
      return this.take(take).map(abstract).join(delimiter) + '...' + this.last();
    default:
      return this.map(abstract).join(delimiter);
  }
};

Array.prototype.vBrief = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };
  var take = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  switch (true) {
    case this.length === 0:
      return _wl.aeu;
    case take >= 1 && take <= this.length - 3:
      return [].concat(_toConsumableArray(this.take(take).tagsIndexed(abstract)), [' .', ' .', ' .'], [this.lastTagIndexed(abstract)]).join(_wl.rn);
    default:
      return this.tagsIndexed(abstract).join(_wl.rn);
  }
};

Array.prototype.tagsIndexed = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };

  var maxIdxLen = (0, _euler.intExponent)(this.length) + 1;
  return this.map(function (x, i) {
    return '[' + (i + 1).toString().padStart(maxIdxLen) + '] ' + abstract(x);
  });
};

Array.prototype.tagIndexedAt = function (index) {
  var abstract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };

  return '[' + (index + 1) + '] ' + abstract(this[index]);
};

Array.prototype.lastTagIndexed = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };

  return this.tagIndexedAt(this.length - 1, abstract);
};