import { tb, rn } from '../utils/clay'

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
  switch (true) {
    case Array.isArray(node):
      concat = deList(node, l, r)
      return `[${concat}]`
    case node instanceof Map:
      concat = deKvps([...node.entries()], l, r)
      return `[${concat}]`
    case node instanceof Set:
      concat = deList([...node], l, r)
      return `set:[${concat}]`
    case node instanceof Function:
      concat = `${node}`
      return concat.startsWith('function') ? concat.substring(9) : concat
    case node instanceof Object:
      concat = deKvps(Object.entries(node), l, r)
      return `{${concat}}`
    default:
      return `${node}`
  }
}

let deKvps = function (kvps, l, rn) {
  const tkvps = kvps.map(([k, v]) => [`${k}`, v])
  const max = Math.max(...tkvps.map(([k]) => k.length))
  const points = tkvps
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
