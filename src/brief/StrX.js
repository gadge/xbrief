import { rn, tb } from '../utils/clay'

class StrReg {}

StrReg.jv2py = /[A-Z]+|[0-9]+/g
StrReg.py2jv = /[A-Za-z\d]+/g

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
      ? [
        matches[0].toLowerCase(),
        ...matches.slice(1).map(wd => wd[0].toUpperCase() + wd.slice(1).toLowerCase())
      ].join('')
      : pyExp
  }

  static wL (tx = '') {
    console.log(tx)
  }

  static tag (label, item) {
    const i = StrX.indexOfFirstNonTab(label)
    let [key, text] = [
      label.endsWith(')')
        ? label
        : `${label.substring(0, i)}[${label.substring(i)}]`,
      `${item}`
    ]
    if (text.includes('\n')) {
      const t = ' '.repeat(i)
      text = (text.endsWith('}') || text.endsWith(']')) && !text.endsWith(']]')
        ? StrX.afterFirstNonTab(text.split(rn).map(x => t + x).join(rn))
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
    let tmp = ''
    for (let c of tx) {
      const code = c.charCodeAt(0)
      if (code === 32) {
        tmp = tmp + String.fromCharCode(12288)
      } else if (code < 127) {
        tmp = tmp + String.fromCharCode(code + 65248)
      } else {
        tmp = tmp + c
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
    let tmp = ''
    for (let c of tx) {
      const code = c.charCodeAt(0)
      if (code === 12288) {
        tmp += String.fromCharCode(code - 12256)
      } else if (code > 65280 && code < 65375) {
        tmp += String.fromCharCode(code - 65248)
      } else {
        tmp += String.fromCharCode(code)
      }
    }
    return tmp
  }

  static indexOfFirstNonTab (tx) {
    let i = 0
    while (tx.startsWith('\t', i) || tx.startsWith(' ', i)) {
      i++
    }
    return i
  }

  static afterFirstNonTab (tx) {
    return tx.substring(StrX.indexOfFirstNonTab(tx))
  }
}

export {
  StrX
}