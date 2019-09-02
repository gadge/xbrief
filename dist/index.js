'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __ = require('..');

const rn = '\r\n';
const tb = '  ';
const aeu = '(Ø)';

const noop = () => {
};

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
  // const max = Stat.maxBy(kvps, it => it[0].toString().length)
  const max = Math.max(...kvps.map(it => it[0].toString().length));
  const points = kvps
    .map(([k, v]) => `${k.toString().padEnd(max, ' ')}: ${deNode(v, l + 1)}`);
  return points.length > 1
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
};

let deList = function (arr, l, nt) {
  const points = arr.map(it => deNode(it, l + 1));
  return points.reduce((a, b) => a + b, 0) > 36
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
};

class StrReg {}

StrReg.jv2py = /[A-Z]+|[0-9]+/g;
StrReg.py2jv = /[A-Za-z\d]+/g;

class Str {

  /**
   * Java-style expression -> Pythonic expression
   * @example 'TheWallstreetJournal2025WSJ' -> 'the wallstreet journal 2025 wsj'
   * @param {string} jvExp java-style expression
   * @param {string} delimiter
   * @returns {string} pythonic expression
   */
  static jv2py (jvExp, delimiter = ' ') {
    return jvExp.replace(StrReg.jv2py, it => delimiter + it.toLowerCase()).trim()
  }

  /**
   * Pythonic expression -> Java-style expression
   * @example 'THE_WALLSTREET_JOURNAL-2019.FOR.THE.FANS' -> 'theWallstreetJournal2019ForTheFans'
   * @param {string} pyExp python expression
   * @returns {string} java expression
   */
  static py2jv (pyExp) {
    const matches = pyExp.match(StrReg.py2jv);
    return matches
      ? [
        matches[0].toLowerCase(),
        ...matches.slice(1).map(wd => wd[0].toUpperCase() + wd.slice(1).toLowerCase())
      ].join('')
      : pyExp
  }

  static wL (tx = '') {
    console.log(tx);
  }

  static tag (label, item) {
    const i = Str.indexOfFirstNonTab(label);
    let [key, text] = [
      label.endsWith(')')
        ? label
        : `${label.substring(0, i)}[${label.substring(i)}]`,
      `${item}`
    ];
    if (text.includes('\n')) {
      const t = ' '.repeat(i);
      text = (text.endsWith('}') || text.endsWith(']')) && !text.endsWith(']]')
        ? Str.afterFirstNonTab(text.split(rn).map(x => t + x).join(rn))
        : ['', ...text.split(rn).map(x => t + tb + x), t].join(rn);
    }
    return `${key} (${text})`
  }

  static narrow (tx, lb, rb) {
    const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)];
    return li > 0 && ri > 0 ? tx.slice(li, ri + rb.length) : tx
  }

  static narrowExclude (tx, lb, rb) {
    const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)];
    return li > 0 && ri > 0 ? tx.slice(li + lb.length, ri) : tx
  }

  /**
   * Return if a string contains Chinese character.
   * halfAng = str.match(/[\u0000-\u00ff]/g) || [] //半角
   * chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
   * fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
   * @param {string} str
   * @returns {boolean}
   */
  static hasChn (str) {
    return str.search(/[\u4e00-\u9fa5]/) !== -1
  }

  /**
   * Half-angle string -> Full-angle string
   * 半角转化为全角
   * a.全角空格为12288，半角空格为32
   * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
   * @param {string} tx
   * @returns {string}
   * @constructor
   */
  static toFullAngle (tx) {
    let tmp = '';
    for (let c of tx) {
      const code = c.charCodeAt(0);
      if (code === 32) {
        tmp = tmp + String.fromCharCode(12288);
      } else if (code < 127) {
        tmp = tmp + String.fromCharCode(code + 65248);
      } else {
        tmp = tmp + c;
      }
    }
    return tmp
  }

  /**
   * Full-angle string -> Half-angle string
   * 全角转换为半角
   * @param {string} tx
   * @returns {string}
   * @constructor
   */
  static toHalfAngle (tx) {
    let tmp = '';
    for (let c of tx) {
      const code = c.charCodeAt(0);
      if (code === 12288) {
        tmp += String.fromCharCode(code - 12256);
      } else if (code > 65280 && code < 65375) {
        tmp += String.fromCharCode(code - 65248);
      } else {
        tmp += String.fromCharCode(code);
      }
    }
    return tmp
  }

  static indexOfFirstNonTab (tx) {
    let i = 0;
    while (tx.startsWith('\t', i) || tx.startsWith(' ', i)) {
      i++;
    }
    return i
  }

  static afterFirstNonTab (tx) {
    return tx.substring(Str.indexOfFirstNonTab(tx))
  }
}

String.prototype.wL = function () {
  console.log(this);
};

String.prototype.tag = function (val) {
  return Str.tag(this, val)
};

String.prototype.deco = function (val) {
  return Str.tag(this, deco(val))
};

Number.prototype.tag = function (val) {
  return Str.tag(this.toString(), val)
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

class Preci {
  /**
   *
   * @param {*[]|null} head
   * @param {*[]|null} tail
   */
  constructor (head, tail) {
    this.head = head;
    this.tail = tail;
  }

  /**
   *
   * @param {*[]} arr
   * @param {number} head
   * @param {number} tail
   * @return {Preci}
   */
  static fromArr (arr, head, tail) {
    // let [h, tailCount] = Array.isArray(arr) && !!arr.length
    //   ? head > 0 && tail > 0 && (head + tail < arr.length)
    //     ? [arr.slice(0, head), arr.slice(-tail)]
    //     : [arr, null]
    //   : [null, null]

    let [h, t] = arr && !!arr.length
      ? !!head && head > 0 && head <= arr.length
        ? !!tail && tail > 0 && tail <= arr.length
          ? [arr.slice(0, head), arr.slice(-tail)]
          : [arr.slice(0, head), null]
        : !!tail && tail > 0 && tail <= arr.length
          ? [null, arr.slice(-tail)]
          : [arr, null]
      : [null, null];
    return new Preci(h, t)
  }

  /**
   *
   * @param {*}element
   * @return {*[]}
   */
  toList (element = undefined) {
    return !!this.head
      ? !!this.tail
        ? !!element
          ? [...this.head, element, ...this.tail]
          : [...this.head, ...this.tail]
        : [...this.head]
      : !!this.tail
        ? [...this.tail]
        : []
  }

  /**
   *
   * @param {*[]}elements
   * @return {*[]}
   */
  fillSomeToList (elements) {
    return !!this.head
      ? !!this.tail
        ? [...this.head, ...elements, ...this.tail]
        : [...this.head]
      : !!this.tail
        ? [...this.tail]
        : []
  }

  jectHead (ject) {
    this.head = !!this.head && !!ject
      ? ject(this.head)
      : this.head;
    return this
  }

  jectTail (ject) {
    this.tail = !!this.tail && !!ject
      ? ject(this.tail)
      : this.tail;
    return this
  }

  ject (ject, jectTail = undefined) {
    return this.jectHead(ject).jectTail(!!jectTail ? jectTail : ject)
  }

  /**
   *
   * @param {function|null} abstract
   * @param {function|null} abstractTail
   * @return {Preci}
   */
  map (abstract, abstractTail = undefined) {
    const head = !!this.head && !!abstract
      ? this.head.map(abstract)
      : this.head;
    const tail = !!this.tail
      ? !!abstractTail
        ? this.tail.map(abstractTail)
        : !!abstract
          ? this.tail.map(abstract)
          : this.tail
      : this.tail;
    return new Preci(head, tail)
  }

  // vehoCol (abstract) {
  //   const list = this.toList()
  //   const columnIndexes = [...list[0].keys()]
  //   const cols = columnIndexes.
  // }

  stringify () {
    return this.map(x => `${x}`)
  }
}

class VecX {

  /**
   *
   * @param {*[]} arr
   * @param {string} delimiter
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @return {string}
   */
  static hBrief (arr, {
                   delimiter = ', ',
                   abstract,
                   head,
                   tail
                 } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail).map(abstract).stringify();
    const elements = preci.toList('...');
    return elements.length > 0 ? elements.join(delimiter) : aeu
  }

  /**
   *
   * @param {*[]} arr
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @return {*}
   */
  static vBrief (arr, {
                   abstract,
                   head,
                   tail
                 } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail).map(abstract).stringify();
    const elements = preci
      .jectHead(VecX.tagsIndexed)
      .jectTail(ar => VecX.tagsIndexed(ar, arr.length - tail))
      .toList('...');
    return elements.length > 0 ? elements.join(rn) : aeu
  }

  /**
   *
   * @param {string[]} texts
   */
  static maxLength (texts) {
    return Math.max(...texts.map(x => x.length))
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):string} lengthSelector
   */
  static maxLengthBy (arr, lengthSelector) {
    return Math.max(...arr.map(x => lengthSelector(x).length))
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]} padWidths
   * @param {string|null} fillString
   * @return {string[]}
   */
  static padStarts (texts, padWidths, fillString = undefined) {

    return texts.map((x, i) => x.padStart(padWidths[i], fillString))
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]} padWidths
   * @param {string|null} fillString
   * @return {string[]}
   */
  static padEnds (texts, padWidths, fillString = undefined) {
    return texts.map((x, i) => x.padEnd(padWidths[i], fillString))
  }

  static tagsIndexed (arr, startIndex = 1) {
    //Math.floor(Math.log10(arr.length)) = intExponent(arr.length)
    const maxIdxLen = Math.floor(Math.log10(arr.length + startIndex)) + 1;
    return arr.map(
      (x, i) => `[${(i + startIndex).toString().padStart(maxIdxLen)}] ${x}`
    )
  }
}

Array.prototype.hBrief = function ({ delimiter = ', ', abstract, head, tail } = {}) {
  return VecX.hBrief(this, { delimiter, abstract, head, tail })
};

Array.prototype.vBrief = function ({ abstract, head, tail } = {}) {
  return VecX.vBrief(this, { abstract, head, tail })
};

class MatX {
  /**
   *
   * @param {*[][]} matrix
   * @param {function} abstract
   * @param {{head:number,tail:number}} rows
   * @param {{head:number,tail:number}} columns
   * @returns {string}
   */
  static xBrief (matrix,
                 {
                   abstract,
                   rows = { head: 0, tail: 0 },
                   columns = { head: 0, tail: 0 }
                 } = {}
  ) {
    const rowwiseAbstract = !!abstract
      ? row => row.map(x => `${abstract(x)}`)
      : row => row.map(x => `${x}`);
    const rowsPreci = Preci
      .fromArr(matrix, rows.head, rows.tail)
      .map(row => Preci.fromArr(row, columns.head, columns.tail).toList('...'))
      .map(rowwiseAbstract);
    const colIndexes = [...rowsPreci.toList()[0].keys()];
    const rowList = rowsPreci.toList(colIndexes.map(() => '..'));
    const columnList = colIndexes.map(c => rowList.map(row => row[c]));
    const widths = columnList.map(__.VecX.maxLength);
    let lines = rowList.map((row) =>
      row.map((x, i) => __.Typ.isNumeric(x)
        ? (x).padStart(widths[i])
        : (x).padEnd(widths[i])
      ).join(' | '));
    return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
  }
}

Array.prototype.xBrief =
  function ({ abstract, rows = { head: 0, tail: 0 }, columns = { head: 0, tail: 0 } } = {}) {
    return MatX.xBrief(this, { abstract, rows, columns })
  };

class EntX {
  /***
   *
   * @param {*} key
   * @param {*} value
   * @returns {string}
   */
  static brief ([key, value]) {
    return `${key}`.tag(value)
  }

  /***
   *
   * @param {*} key
   * @param {*} value
   * @returns {string}
   */
  static simpleBrief ([key, value]) {
    return `${key}:(${value})`
  }

  /***
   *
   * @param {*} key
   * @param {*} value
   * @param {number} keyLen
   * @returns {string}
   */
  static briefPadded ([key, value], keyLen = 0) {
    return `${key}`.padStart(keyLen).tag(value)
  }
}

class MapX {
  /**
   *
   * @param {Map} dict
   * @param {string} delimiter
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @returns {string}
   */
  static hBrief (dict,
                 {
                   delimiter = ', ',
                   abstract,
                   head = 0,
                   tail = 0
                 } = {}
  ) {
    const realAbstract = abstract ? ([k, v]) => [k, abstract(v)] : null;
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(realAbstract)
      .map(([k, v]) => [`${k}`, `${v}`]);
    const elements = preci.map(EntX.simpleBrief).toList('...');
    return elements.length > 0 ? elements.join(delimiter) : aeu
  }

  /***
   *
   * @param {Map} dict
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @returns {string}
   */
  static vBrief (dict, { abstract, head, tail } = {}) {
    const actualAbstract = !!abstract
      ? ([k, v]) => [`${k}`, `${abstract(v)}`]
      : ([k, v]) => [`${k}`, `${v}`];
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(actualAbstract);
    const l = Math.max(...preci.map(([k]) => k.length)
      .toList());
    const elements = preci
      .map(it => EntX.briefPadded(it, l))
      .toList('...'.padStart(l));
    return elements.length > 0 ? elements.join(rn) : aeu
  }
}

Map.prototype.hBrief = function ({ delimiter = ', ', abstract, head = 0, tail = 0 } = {}) {
  return MapX.hBrief(this, { delimiter, abstract, head, tail })
};

Map.prototype.vBrief = function ({ abstract, head = 0, tail = 0 } = {}) {
  return MapX.vBrief(this, { abstract, head, tail })
};

// let inferTypo = function (it) {

const rxObj = /^\[object (.*)]$/;

class Typ {
  static isNum (x) {
    return typeof x === 'number'
  }

// Angular 4.3
  static isNumeric (v) {
    return !isNaN(v - parseFloat(v))
  }

  static notUdf (it) {
    return it !== undefined
  }

  static isNumStrBooUdf (it) {
    const typ = typeof it;
    switch (typ) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return true
      default:
        return false
    }
  }

  /**
   * inferTypo(o) = Object.prototype.toString.call(o)
   * @example inferTypo([]) // "[object Array]". inferTypo({}) // "[object Object]"
   * @param {*} obj
   * @returns {string} Inferred typ in [object "Type"] form.
   */
  static inferTypo (obj) {
    return Object.prototype.toString.call(obj)
  }

  static inferType (it) {
    const raw = typeof it;
    return raw === 'object'
      ? Typ.inferObject(it)
      : raw
  }

  static inferObject (it) {
    const str = Object.prototype.toString.call(it);
    return str.match(rxObj)[1].toLowerCase()
  }

  static check (x) {
    const info2 = {
      toString: `${x}`,
      prototypeCall: Object.prototype.toString.call(x),
      notUndefined: x !== undefined,
      type: Typ.inferType(x),
      '!!': !!x
    };
    return __.deco(info2)
  }
}

class Formo {
  static toPercent (num, fracDigit = 0) {
    return (num * 100).toFixed(fracDigit) + '%'
  }
}

class MagnitudeFormo {
  constructor (fracDigit = 2, magniSep = 3) {
    this.fracDigit = fracDigit;
    this.numRegex = new RegExp(
      `\\d(?=(\\d{${magniSep || 3}})+${fracDigit > 0 ? '\\.' : '$'})`, 'g');
  }

  format (num) {
    return num.toFixed(this.fracDigit).replace(this.numRegex, '$&,')
  }
}

class PercentFormo {
  constructor (fracDigit = 0) {
    this.formos = new Intl.NumberFormat(undefined,
      { style: 'percent', minimumFractionDigits: fracDigit });
  }

  format (num) {
    return this.formos.format(num)
  }
}

class MoneyFormo {
  constructor (region) {
    let config = MoneyFormo.getCurrencyConfig(region);
    this.formos = new Intl.NumberFormat(config.locale, config.options);
  }

  format (num) {
    return this.formos.format(num)
  }

  static get localeToCurrency () {
    return new Map([
      ['en-US', 'USD'],
      ['en-GB', 'GBP'],
      ['de-DE', 'EUR'],
      ['es-ES', 'EUR'],
      ['en-IN', 'INR'],
      ['zh-CN', 'CNY'],
      ['ja-JP', 'JPY'],
      ['ru-RU', 'RUB']
    ])
  }

  static getCurrencyConfig (locale) {
    // currencyDisplay: "symbol"}};//'symbol','code','name'
    return {
      locale: locale,
      options: {
        style: 'currency',
        currency: MoneyFormo.localeToCurrency.get(locale),
        currencyDisplay: 'symbol'
      }
    }
  }
}

Number.prototype.toPercent = function (fracDigit = 0) {
  return (this * 100).toFixed(fracDigit) + '%'
};

// '123456789.01234'.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, '_')

exports.Formo = Formo;
exports.MagnitudeFormo = MagnitudeFormo;
exports.MapX = MapX;
exports.MatX = MatX;
exports.MoneyFormo = MoneyFormo;
exports.PercentFormo = PercentFormo;
exports.Preci = Preci;
exports.Str = Str;
exports.Typ = Typ;
exports.VecX = VecX;
exports.deco = deco;
exports.noop = noop;
