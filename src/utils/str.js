import hasAnsi from 'has-ansi'
import stringLength from 'string-length'
import { Num } from 'typen'

const { isNumeric } = Num
const rn = '\r\n'
const tb = '  '
const aeu = '(Ø)'
const zhChars = {
  dash: '－',
  space: '　'
}

const noop = () => {}

const lpad = (tx, pd, ansi = false, fill) => ansi && hasAnsi(tx)
  ? tx.padStart(tx.length + pd - stringLength(tx), fill)
  : tx.padStart(pd, fill)

const rpad = (tx, pd, ansi = false, fill) => ansi && hasAnsi(tx)
  ? tx.padEnd(tx.length + pd - stringLength(tx), fill)
  : tx.padEnd(pd, fill)

const numPad = (tx, ref, pd, ansi = false, fill) => isNumeric(ref)
  ? lpad(tx, pd, ansi, fill)
  : rpad(tx, pd, ansi, fill)

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
  numPad,
  isTab,
  indexNaTab,
  beforeNaTab,
  afterNaTab,
  endsBracs,
  tabify,
}
