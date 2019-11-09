import { tb, rn, rpad, lpad } from '../utils/str'
import { NumLoose, Typ } from 'typen'
import chalk from 'chalk'
import { palette, greys, Visual } from 'spettro'
import stringLength from 'string-length'

let deco = obj => deNode(obj, 0)

const { initial } = Typ
const { isNumeric } = NumLoose
const
  Pal = {
    idx: chalk.hex(greys.brown.lighten_4),
    str: chalk.hex(palette.lightGreen.accent_2),
    num: chalk.hex(palette.deepOrange.accent_2),
    udf: chalk.hex(palette.deepPurple.accent_2),
    brk: chalk.hex(palette.blue.accent_2),
    brc: chalk.hex(palette.amber.base)
  }

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @return {string|number}
 */
function deNode (node, l = 0) {
  switch (typeof node) {
    case 'string':
      return isNumeric(node) ? node : `${Pal.str(node)}`
    case 'object':
    case 'function':
      return deJson(node, l)
    case 'bigint':
    case 'number':
      return node
    // return `${pal.num)(node)}`
    case 'boolean':
    case 'symbol':
    case 'undefined':
      return `${Pal.udf(node)}`
  }
}

const bracket = content => Pal.brk('[ ') + content + Pal.brk(' ]')

const brace = content => Pal.brc('{') + content + Pal.brc('}')

function deJson (node, l = 0) {
  let [r, concat] = [rn + tb.repeat(l), '']
  switch (initial(node)) {
    case 'Arr':
      concat = deList(node, l, r)
      return bracket(concat)
    case 'Obj' :
      concat = deEntries(Object.entries(node), l, r)
      return brace(concat)
    case 'Map':
      concat = deEntries([...node.entries()], l, r)
      return bracket(concat)
    case 'Fun' :
      concat = `${node}`
      return concat.startsWith('function') ? concat.slice(9) : concat
    case 'Set':
      concat = deList([...node], l, r)
      return `set:[${concat}]`
    default:
      return `${node}`
  }
}

const targets = ['object', 'function']

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @return {string}
 */
function deNode2 (node, l = 0) {
  if (!node || !targets.includes(typeof node)) return `${node}`
  let [r, concat] = [rn + tb.repeat(l), '']
  switch (true) {
    case Array.isArray(node):
      concat = deList(node, l, r)
      return `[${concat}]`
    case node instanceof Map:
      concat = deEntries([...node.entries()], l, r)
      return `[${concat}]`
    case node instanceof Set:
      concat = deList([...node], l, r)
      return `set:[${concat}]`
    case node instanceof Function:
      concat = `${node}`
      return concat.startsWith('function') ? concat.slice(9) : concat
    case node instanceof Object:
      concat = deEntries(Object.entries(node), l, r)
      return `{${concat}}`
    default:
      return `${node}`
  }
}

let deEntries = (entries, l, rn) => {
  let
    _ents = entries.map(([k, v]) => [`${k}`, v]),
    pad = Math.max(..._ents.map(([k]) => stringLength(k)))
  _ents = _ents
    .map(([k, v]) => [Pal.idx(lpad(k, pad, true)), deNode(v, l + 1)])
  _ents = Visual.column(_ents, 1, { deep: false })
  const points = _ents.map(([k, v]) => `${k}: ${v}`)
  return stringLength(points.reduce((a, b) => a + b, 0).toString()) > 36
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(', ')
}

let deList = (arr, l, rn) => {
  const points = arr.map(it => deNode(it, l + 1)) |> Visual.vector
  return stringLength(points.reduce((a, b) => a + b, 0).toString()) > 36
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

export {
  deco
}
