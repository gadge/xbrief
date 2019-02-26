'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isNum (x) {
  return typeof x === 'number'
}

let log10 = Math.log10
  ? x => Math.log10(x)
  : x => {
    let exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
    // Check for whole powers of 10,
    // which due to floating point rounding error should be corrected.
    let powerOf10 = Math.round(exponent);
    let isPowerOf10 = x === Math.pow(10, powerOf10);
    return isPowerOf10 ? powerOf10 : exponent
  };

function intExponent (x) {
  return Math.floor(log10(x))
}

class StatB {
  static sum (arr, ject) {
    switch (arr.length) {
      case 0:
        return NaN
      case 1:
        return ject(arr[0])
      default:
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum += ject(arr[i]);
        }
        return sum
    }
  }

  static max (arr, ject) {
    switch (arr.length) {
      case 0:
        return NaN
      case 1:
        return ject(arr[0])
      default:
        let v;
        let max = ject(arr[0]);
        for (let i = 1; i < arr.length; i++) {
          v = ject(arr[i]);
          if (v > max) max = v;
          // if (arr[i] < min) min = arr[i]
        }
        return max
    }
  }
}

const rn = '\r\n';
const tb = '  ';
const aeu = '(Ø)';

const noop = () => {
};

Array.prototype.last = function () {
  return this[this.length - 1]
};

Array.prototype.take = function (len) {
  let ar = new Array(len);
  if (len > 0 && len < this.length) {
    for (let i = 0; i < len; i++) {
      ar[i] = this[i];
    }
  } else {
    ar = this;
  }
  return ar
};

Array.prototype.hBrief = function (
  delimiter = ', ', abstract = (x) => x, take = 0) {
  switch (true) {
    case this.length === 0:
      return aeu
    case take >= 1 && take <= (this.length - 3):
      return this.take(take).map(abstract).join(delimiter) + '...' +
        this.last()
    default:
      return this.map(abstract).join(delimiter)
  }
};

Array.prototype.vBrief = function (abstract = (x) => x, take = 0) {
  switch (true) {
    case this.length === 0:
      return aeu
    case take >= 1 && take <= (this.length - 3):
      return [
        ...this.take(take).tagsIndexed(abstract),
        ...[' .', ' .', ' .'],
        this.lastTagIndexed(abstract)
      ].join(rn)
    default:
      return this.tagsIndexed(abstract).join(rn)
  }
};

Array.prototype.tagsIndexed = function (abstract = (x) => x) {
  const maxIdxLen = intExponent(this.length) + 1;
  return this.map(
    (x, i) => `[${(i + 1).toString().padStart(maxIdxLen)}] ${abstract(x)}`)
};

Array.prototype.tagIndexedAt = function (index, abstract = (x) => x) {
  return `[${(index + 1)}] ${abstract(this[index])}`
};

Array.prototype.lastTagIndexed = function (abstract = (x) => x) {
  return this.tagIndexedAt(this.length - 1, abstract)
};

Array.prototype.transpose = function () {
  return Object.keys(this[0]).map(c => this.map(r => r[c]))
};

Array.prototype.vehoCol = function (columnJect) {
  let cols = this.transpose();
  return cols.map(columnJect)
};

Array.prototype.veho = function (elementJect) {
  return this.map((row) => row.map(elementJect))
};

Array.prototype.xBrief = function (
  abstractNumber = (x) => x, abstractOther = (x) => x) {
  let rows = this.map(
    row => row.map(x => isNum(x) ? abstractNumber(x) : abstractOther(x)));
  let widths = rows.veho(it => it.toString().length)
    .vehoCol(col => Math.max(...col));
  let lines =
    rows.map(row =>
      row.map((it, i) => isNum(it)
        ? (it.toString()).padStart(widths[i])
        : (it.toString()).padEnd(widths[i])
      ).join(' | ')
    );
  return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
};

Map.prototype.hBrief = function (
  abstract = (x) => x, take = 0, delimiter = ', ') {
  const list = [...this.entries()];
  switch (true) {
    case this.length === 0 :
      return aeu
    case take >= 1 && take <= (this.size - 3) :
      return list.take(take)
        .map(it => it.entryBrief(abstract))
        .join(delimiter) + '...' + list.last().entryBrief(abstract)
    default :
      return list.map(it => it.entryBrief(abstract)).join(delimiter)
  }
};

Map.prototype.vBrief = function (abstract = (x) => x, take = 0) {
  const max = Math.max(...[...this.keys()].map(k => k.toString().length));
  switch (true) {
    case this.length === 0 :
      return aeu
    case take >= 1 && take <= (this.size - 3) :
      return [
        ...[...this].take(take).map(it => it.entryBriefPadded(max, abstract)),
        ...['.', '.', '.'].map(it => ` ${it.padStart(max)}   .`),
        [...this].last().entryBriefPadded(max, abstract)
      ].join(rn)
    default :
      return [...this.entries()].map(it => it.entryBriefPadded(max, abstract))
        .join(rn)
  }
};

// this array is restricted to binary array in map.entries()
Array.prototype.entryBrief = function (abstract = (x) => x) {
  return this[0].toString().tag(abstract(this[1]))
};

// this array is restricted to binary array in map.entries()
Array.prototype.entryBriefPadded = function (keyLen = 0, abstract = (x) => x) {
  return this[0].toString().padStart(keyLen).tag(abstract(this[1]))
};

/**
 * inferFormat(o) = Object.prototype.toString.call(o)
 * @example inferFormat([]) // "[object Array]". inferFormat({}) // "[object Object]"
 * @param {*} obj
 * @returns {string} Inferred format in [object "Type"] form.
 */
function inferFormat (obj) {
  return Object.prototype.toString.call(obj)
}

let writeLine = function (some) {
  console.log(some);
};

String.prototype.wL = function () {
  console.log(this);
};

String.prototype.tag = function (val) {
  const idx = this.indexOfFirstNonTab();
  let key = this.substring(this.length - 1) === ')'
    ? this
    : `${this.substring(0, idx)}[${this.substring(idx)}]`;
  const text = `${val}`;
  const item = text.includes('\n')
    ? `${rn}${text.split(rn).map(x => `\t${x}`).join(rn)}${rn}`
    : text;
  return `${key} (${item})`
};

String.prototype.etch = function (item) {
  const raw = typeof item;
  if (raw === 'object') {
    switch (true) {
      case (item instanceof Array):
        this.tag(item.vBrief()).wL();
        break
      case (item instanceof Map):
        this.tag(item.vBrief()).wL();
        break
      case (item instanceof Set):
        this.tag(item.toArray().vBrief()).wL();
        break
      default:
        this.tag(item).wL();
    }
  } else {
    this.tag(item).wL();
  }
};

String.prototype.indexOfFirstNonTab = function () {
  let idx = 0;
  while (this.startsWith('\t', idx) || this.startsWith(' ', idx)) {
    idx++;
  }
  return idx
};

let emb = item => `"${item}"`;

let deco = function (obj) {
  return deNode(obj, 0)
};

const tab = '  ';
let deNode = function (node, l = 0) {
  let [nt, concat] = ['\r\n' + tab.repeat(l), ''];
  if (typeof node === 'object') {
    switch (true) {
      case (node instanceof Array) :
        concat = deList(node, l, nt);
        return `[${concat}]`
      case (node instanceof Map) :
        concat = deKvps([...node.entries()], l, nt);
        return `[${concat}]`
      case (node instanceof Set) :
        concat = deList([...node], l, nt);
        return `set:[${concat}]`
      case (node instanceof Object):
        concat = deKvps(Object.entries(node), l, nt);
        return `{${concat}}`
      default:
        return `${node}`
    }
  } else {
    return `${node}`
  }
};

let deKvps = function (kvps, l, nt) {
  const max = StatB.max(kvps, it => it[0].toString().length);
  const points = kvps
    .map(([k, v]) => `${k.toString().padEnd(max, ' ')}: ${deNode(v, l + 1)}`);
  return points.length > 1
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
};

let deList = function (arr, l, nt) {
  const points = arr.map(it => deNode(it, l + 1));
  return StatB.sum(points, it => it.length) > 36
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
};

// export * from './fund/clay'
// export * from './format/format'
// export * from './wl/wl'
// export * from './deco/deco'

exports.rn = rn;
exports.tb = tb;
exports.aeu = aeu;
exports.noop = noop;
exports.inferFormat = inferFormat;
exports.writeLine = writeLine;
exports.emb = emb;
exports.deco = deco;
