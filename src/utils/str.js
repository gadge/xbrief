const rn = '\r\n'
const tb = '  '
const aeu = '(Ø)'

const noop = () => {}

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
const tx = x => `${x}`

export {
  rn,
  tb,
  aeu,
  noop,
  tx,
  isTab,
  indexNaTab,
  beforeNaTab,
  afterNaTab,
  endsBracs,
  tabify,
}