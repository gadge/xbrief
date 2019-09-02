let deco = function (obj) {
  return deNode(obj, 0)
}

const tab = '  '

let deNode = function (node, l = 0) {
  let [nt, concat] = ['\r\n' + tab.repeat(l), '']
  if (typeof node === 'object') {
    switch (true) {
      case (node instanceof Array) :
        concat = deList(node, l, nt)
        return `[${concat}]`
      case (node instanceof Map) :
        concat = deKvps([...node.entries()], l, nt)
        return `[${concat}]`
      case (node instanceof Set) :
        concat = deList([...node], l, nt)
        return `set:[${concat}]`
      case (node instanceof Object):
        concat = deKvps(Object.entries(node), l, nt)
        return `{${concat}}`
      default:
        return `${node}`
    }
  } else {
    return `${node}`
  }
}

let deKvps = function (kvps, l, nt) {
  // const max = Stat.maxBy(kvps, it => it[0].toString().length)
  const max = Math.max(...kvps.map(it => it[0].toString().length))
  const points = kvps
    .map(([k, v]) => `${k.toString().padEnd(max, ' ')}: ${deNode(v, l + 1)}`)
  return points.length > 1
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
}

let deList = function (arr, l, nt) {
  const points = arr.map(it => deNode(it, l + 1))
  return points.reduce((a, b) => a + b, 0) > 36
    ? `${nt}  ${points.join(`,${nt + tab}`)}${nt}`
    : points.join(',')
}

export {
  deco
}
