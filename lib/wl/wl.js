'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var writeLine = function writeLine(some) {
  console.log(some);
};

String.prototype.wL = function () {
  console.log(this);
};

String.prototype.tag = function (val) {
  var idx = this.indexOfFirstNonTab();
  var key = this.substring(this.length - 1) === ')' ? this : this.substring(0, idx) + '[' + this.substring(idx) + ']';
  var text = '' + val;
  var item = text.includes('\n') ? '' + rn + text.split(rn).map(function (x) {
    return '\t' + x;
  }).join(rn) + rn : text;
  return key + ' (' + item + ')';
};

String.prototype.etch = function (item) {
  var raw = typeof item === 'undefined' ? 'undefined' : _typeof(item);
  if (raw === 'object') {
    switch (true) {
      case item instanceof Array:
        this.tag(item.vBrief()).wL();
        break;
      case item instanceof Map:
        this.tag(item.vBrief()).wL();
        break;
      case item instanceof Set:
        this.tag(item.toArray().vBrief()).wL();
        break;
      default:
        this.tag(item).wL();
    }
  } else {
    this.tag(item).wL();
  }
};

String.prototype.indexOfFirstNonTab = function () {
  var idx = 0;
  while (this.startsWith('\t', idx) || this.startsWith(' ', idx)) {
    idx++;
  }
  return idx;
};

var emb = function emb(item) {
  return '"' + item + '"';
};

exports.emb = emb;
exports.writeLine = writeLine;