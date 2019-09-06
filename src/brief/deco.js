import { tb, rn } from '../utils/clay'

let deco = function (obj) {
  return deNode(obj, 0)
}

/**
 *
 * @param {*} node
 * @param {number} l
 * @return {string}
 */
function deNode (node, l = 0) {
  let [r, concat] = [rn + tb.repeat(l), '']
  if (typeof node === 'object') {
    switch (true) {
      case (node instanceof Array) :
        concat = deList(node, l, r)
        return `[${concat}]`
      case (node instanceof Map) :
        concat = deKvps([...node.entries()], l, r)
        return `[${concat}]`
      case (node instanceof Set) :
        concat = deList([...node], l, r)
        return `set:[${concat}]`
      case (node instanceof Object):
        concat = deKvps(Object.entries(node), l, r)
        return `{${concat}}`
      default:
        return `${node}`
    }
  } else {
    return `${node}`
  }
}

let deKvps = function (kvps, l, rn) {
  // const max = Stat.maxBy(kvps, it => it[0].toString().length)
  const max = Math.max(...kvps.map(([k]) => k.toString().length))
  const points = kvps
    .map(([k, v]) => `${k.toString().padEnd(max, ' ')}: ${deNode(v, l + 1)}`)
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
