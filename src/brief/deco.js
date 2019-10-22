import { tb, rn } from '../utils/str'
import { Typ } from 'typen'
import chalk from 'chalk'
import { palette, greys } from 'spettro'
import stringLength from 'string-length'

let deco = function (obj) {
  return deNode(obj, 0)
}

const
  _o = 'object',
  _f = 'function',
  isSimple = (x) => !x || typeof x !== _o && typeof x !== _f,
  { initial } = Typ

const
  pal = {
    idx: greys.brown.lighten_4,
    str: palette.lightGreen.accent_2,
    num: palette.deepOrange.accent_2,
    udf: palette.deepPurple.accent_2,
    brk: palette.blue.accent_2,
    brc: palette.amber.base
  }

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @return {string}
 */
function deNode (node, l = 0) {
  switch (typeof node) {
    case 'string':
      return `${chalk.hex(pal.str)(node)}`
    case 'object':
    case 'function':
      return deJson(node, l)
    case 'bigint':
    case 'number':
      return `${chalk.hex(pal.num)(node)}`
    case 'boolean':
    case 'symbol':
    case 'undefined':
      return `${chalk.hex(pal.udf)(node)}`
  }
}

const bracket = content => chalk.hex(pal.brk)('[ ') + content + chalk.hex(pal.brk)(' ]')

const brace = content => chalk.hex(pal.brc)('{') + content + chalk.hex(pal.brc)('}')

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
  const tEntries = entries.map(([k, v]) => [`${k}`, v])
  const max = Math.max(...tEntries.map(([k]) => stringLength(k)))
  const points = tEntries
    .map(([k, v]) => `${chalk.hex(pal.idx)(k.padEnd(max, ' '))}: ${deNode(v, l + 1)}`)
  return points.length > 1
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

let deList = (arr, l, rn) => {
  const points = arr.map(it => deNode(it, l + 1))
  return stringLength(points.reduce((a, b) => a + b, 0).toString()) > 36
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

export {
  deco
}
