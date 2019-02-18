'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isNum(x) {
  return typeof x === 'number';
}

function intExponent(x) {
  return Math.floor(log10(x));
}

var StatB = function () {
  function StatB() {
    _classCallCheck(this, StatB);
  }

  _createClass(StatB, null, [{
    key: 'sum',
    value: function sum(arr, ject) {
      switch (arr.length) {
        case 0:
          return NaN;
        case 1:
          return ject(arr[0]);
        default:
          var sum = 0;
          for (var i = 0; i < arr.length; i++) {
            sum += ject(arr[i]);
          }
          return sum;
      }
    }
  }, {
    key: 'max',
    value: function max(arr, ject) {
      switch (arr.length) {
        case 0:
          return NaN;
        case 1:
          return ject(arr[0]);
        default:
          var v = void 0;
          var max = ject(arr[0]);
          for (var i = 1; i < arr.length; i++) {
            v = ject(arr[i]);
            if (v > max) max = v;
            // if (arr[i] < min) min = arr[i]
          }
          return max;
      }
    }
  }]);

  return StatB;
}();

exports.isNum = isNum;
exports.intExponent = intExponent;
exports.StatB = StatB;