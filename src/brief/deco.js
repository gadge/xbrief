import { tb, rn } from '../utils/clay'
import { Typ } from '../typ/Typ'

let deco = function (obj) {
  return deNode(obj, 0)
}

const targets = ['object', 'function']

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @return {string}
 */
function deNode (node, l = 0) {
  if (!node || !targets.includes(typeof node)) return `${node}`
  let [r, concat] = [rn + tb.repeat(l), '']
  const typ = Typ.initial(node)
  switch (typ) {
    case 'Arr':
      concat = deList(node, l, r)
      return `[${concat}]`
    case 'Obj' :
      concat = deEntries(Object.entries(node), l, r)
      return `{${concat}}`
    case 'Map':
      concat = deEntries([...node.entries()], l, r)
      return `[${concat}]`
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

let deEntries = function (entries, l, rn) {
  const tEntries = entries.map(([k, v]) => [`${k}`, v])
  const max = Math.max(...tEntries.map(([k]) => k.length))
  const points = tEntries
    .map(([k, v]) => `${k.padEnd(max, ' ')}: ${deNode(v, l + 1)}`)
  return points.length > 1
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

let deList = function (arr, l, rn) {
  const points = arr.map(it => deNode(it, l + 1))
  return points.reduce((a, b) => a + b, 0).toString().length > 36
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

export {
  deco
}
