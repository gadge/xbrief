import { afterNaTab, endsBracs, indexNaTab, isTab, rn, tb } from '../utils/str'
import hasAnsi from 'has-ansi'
import stringLength from 'string-length'

const StrReg = {
  jv2py: /[A-Z]+|[0-9]+/g,
  py2jv: /[A-Za-z\d]+/g
}

class StrX {

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
    const matches = pyExp.match(StrReg.py2jv)
    return matches
      ? matches[0].toLowerCase() + matches.slice(1)
      .map(wd => wd[0].toUpperCase() + wd.slice(1).toLowerCase()).join()
      : pyExp
  }

  static wL (tx = '') {
    console.log(tx)
  }

  static tag (label, item) {
    const i = indexNaTab(label)
    let [key, text] = [
      endsBracs(label)
        ? label
        : `${label.substring(0, i)}[${label.substring(i)}]`,
      `${item}`
    ]
    if (text.includes('\n')) {
      const t = ' '.repeat(i)
      text = (text.endsWith('}') || text.endsWith(']')) && !text.endsWith(']]')
        ? afterNaTab(text.split(rn).map(x => t + x).join(rn))
        : ['', ...text.split(rn).map(x => t + tb + x), t].join(rn)
    }
    return `${key} (${text})`
  }

  static narrow (tx, lb, rb) {
    const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)]
    return li > 0 && ri > 0 ? tx.slice(li, ri + rb.length) : tx
  }

  static narrowExclude (tx, lb, rb) {
    const [li, ri] = [tx.indexOf(lb), tx.lastIndexOf(rb)]
    return li && ri ? tx.slice(li + lb.length, ri) : tx
  }

  static padStartAnsi (tx, len, fill) {
    return hasAnsi(tx)
      ? tx.padStart(tx.length + len - stringLength(tx), fill)
      : tx.padStart(len, fill)
  }

  static padEndAnsi (tx, len, fill) {
    return hasAnsi(tx)
      ? tx.padEnd(tx.length + len - stringLength(tx), fill)
      : tx.padEnd(len, fill)
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
    return str.search(/[\u4e00-\u9fa5]|[\uff00-\uffff]/) !== -1
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
    let t = ''
    for (let c of tx) {
      const co = c.charCodeAt(0)
      t = co === 32
        ? t + String.fromCharCode(12288)
        : co < 127
          ? t + String.fromCharCode(co + 65248)
          : t + c
    }
    return t
  }

  /**
   * Full-angle string -> Half-angle string
   * 全角转换为半角
   * @param {string} tx
   * @returns {string}
   * @constructor
   */
  static toHalfAngle (tx) {
    let t = ''
    for (let c of tx) {
      const co = c.charCodeAt(0)
      t += co === 12288
        ? String.fromCharCode(co - 12256)
        : 65280 < co && co < 65375
          ? String.fromCharCode(co - 65248)
          : String.fromCharCode(co)
    }
    return t
  }

  static indexNonTab (tx) {
    let i = 0
    for (let { length } = tx; i < length; i++) if (!isTab(tx.charAt(i))) return i
    return i
  }

  static afterNonTab (tx) {
    return tx.substring(indexNaTab(tx))
  }
}

export {
  StrX
}

// toHalfAngle Source
// if (co === 12288) {
//   t += String.fromCharCode(co - 12256)
// } else if (co > 65280 && co < 65375) {
//   t += String.fromCharCode(co - 65248)
// } else {
//   t += String.fromCharCode(co)
// }
