'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../fund/veho/matrix');

var _clay = require('../fund/clay');

var _euler = require('../fund/euler');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Array.prototype.xBrief = function () {
  var abstractNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };
  var abstractOther = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };

  var rows = this.map(function (row) {
    return row.map(function (x) {
      return (0, _euler.isNum)(x) ? abstractNumber(x) : abstractOther(x);
    });
  });
  var widths = rows.veho(function (it) {
    return it.toString().length;
  }).vehoCol(function (col) {
    return Math.max.apply(Math, _toConsumableArray(col));
  });
  var lines = rows.map(function (row) {
    return row.map(function (it, i) {
      return (0, _euler.isNum)(it) ? it.toString().padStart(widths[i]) : it.toString().padEnd(widths[i]);
    }).join(' | ');
  });
  return '[' + lines.map(function (row) {
    return '[' + row + ']';
  }).join(',' + _clay.rn + ' ') + ']';
};