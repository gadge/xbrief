'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wl = require('../wl/wl');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Map.prototype.hBrief = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };
  var take = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ', ';

  var list = [].concat(_toConsumableArray(this.entries()));
  switch (true) {
    case this.length === 0:
      return _wl.aeu;
    case take >= 1 && take <= this.size - 3:
      return list.take(take).map(function (it) {
        return it.entryBrief(abstract);
      }).join(delimiter) + '...' + list.last().entryBrief(abstract);
    default:
      return list.map(function (it) {
        return it.entryBrief(abstract);
      }).join(delimiter);
  }
};

Map.prototype.vBrief = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };
  var take = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var max = [].concat(_toConsumableArray(this.keys())).map(function (k) {
    return k.toString().length;
  }).max();
  switch (true) {
    case this.length === 0:
      return _wl.aeu;
    case take >= 1 && take <= this.size - 3:
      return [].concat(_toConsumableArray([].concat(_toConsumableArray(this)).take(take).map(function (it) {
        return it.entryBriefPadded(max, abstract);
      })), _toConsumableArray(['.', '.', '.'].map(function (it) {
        return ' ' + it.padStart(max) + '   .';
      })), [[].concat(_toConsumableArray(this)).last().entryBriefPadded(max, abstract)]).join(_wl.rn);
    default:
      return [].concat(_toConsumableArray(this.entries())).map(function (it) {
        return it.entryBriefPadded(max, abstract);
      }).join(_wl.rn);
  }
};

// this array is restricted to binary array in map.entries()
Array.prototype.entryBrief = function () {
  var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };

  return this[0].toString().tag(abstract(this[1]));
};

// this array is restricted to binary array in map.entries()
Array.prototype.entryBriefPadded = function () {
  var keyLen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var abstract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };

  return this[0].toString().padStart(keyLen).tag(abstract(this[1]));
};