"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Array.prototype.transpose = function () {
  var _this = this;

  return Object.keys(this[0]).map(function (c) {
    return _this.map(function (r) {
      return r[c];
    });
  });
};

Array.prototype.vehoCol = function (columnJect) {
  var cols = this.transpose();
  return cols.map(columnJect);
};

Array.prototype.veho = function (elementJect) {
  return this.map(function (row) {
    return row.map(elementJect);
  });
};