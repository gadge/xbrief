import hasAnsi from 'has-ansi'
import stringLength from 'string-length'

const rn = '\r\n'
const tb = '  '
const aeu = '(Ø)'
const zhChars = {
  dash: '－',
  space: '　'
}

const noop = () => {}

const lpad = (tx, len, fill, ansi = false) => ansi && hasAnsi(tx)
  ? tx.padStart(tx.length + len - stringLength(tx), fill)
  : tx.padStart(len, fill)

const rpad = (tx, len, fill, ansi = false) => ansi && hasAnsi(tx)
  ? tx.padEnd(tx.length + len - stringLength(tx), fill)
  : tx.padEnd(len, fill)

const isTab = (c) => c === '\t' || c === ' '
const indexNaTab = (tx) => {
  let i = 0
  for (let { length } = tx; i < length; i++) if (!isTab(tx.charAt(i))) return i
  return i
}
const beforeNaTab = (tx) => tx.substring(0, indexNaTab(tx))
const afterNaTab = (tx) => tx.substring(indexNaTab(tx))
const endsBracs = (tx) => tx.endsWith(')') || tx.endsWith(']')
const tabify = (tx) => {
  const i = tx |> indexNaTab
  return endsBracs(tx) ? tx : `${tx.substring(0, i)}[${tx.substring(i)}]`
}

/**
 *
 * @param {*} x
 * @return {string}
 */
const totx = x => `${x}`

export {
  rn,
  tb,
  aeu,
  zhChars,
  noop,
  totx,
  lpad,
  rpad,
  isTab,
  indexNaTab,
  beforeNaTab,
  afterNaTab,
  endsBracs,
  tabify,
}