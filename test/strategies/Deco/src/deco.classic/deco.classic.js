import { rn, tb } from '../../../../../src/utils/str'
import { deList } from '../deco.stable/utils/deList'
import { deEntries } from '../deco.stable/utils/deEntries'

const targets = ['object', 'function']

export const decoClassic = node => deNode(node, 0)

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
