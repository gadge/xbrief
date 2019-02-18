'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deco = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _euler = require('../fund/euler');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deco = function deco(obj) {
  return deNode(obj, 0);
};

var tab = '  ';
var deNode = function deNode(node) {
  var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var nt = '\r\n' + tab.repeat(l),
      concat = '';

  if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
    switch (true) {
      case node instanceof Array:
        concat = deList(node, l, nt);
        return '[' + concat + ']';
      case node instanceof Map:
        concat = deKvps([].concat(_toConsumableArray(node.entries())), l, nt);
        return '[' + concat + ']';
      case node instanceof Set:
        concat = deList([].concat(_toConsumableArray(node)), l, nt);
        return 'set:[' + concat + ']';
      case node instanceof Object:
        concat = deKvps(Object.entries(node), l, nt);
        return '{' + concat + '}';
      default:
        return '' + node;
    }
  } else {
    return '' + node;
  }
};

var deKvps = function deKvps(kvps, l, nt) {
  var max = _euler.StatB.max(kvps, function (it) {
    return it[0].toString().length;
  });
  var points = kvps.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return k.toString().padEnd(max, ' ') + ': ' + deNode(v, l + 1);
  });
  return points.length > 1 ? nt + '  ' + points.join(',' + (nt + tab)) + nt : points.join(',');
};

var deList = function deList(arr, l, nt) {
  var points = arr.map(function (it) {
    return deNode(it, l + 1);
  });
  return _euler.StatB.sum(points, function (it) {
    return it.length;
  }) > 36 ? nt + '  ' + points.join(',' + (nt + tab)) + nt : points.join(',');
};

exports.deco = deco;