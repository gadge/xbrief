import { rn, tb } from '../../../../../../src/utils/str'
import { initial } from '../../../../../../src/deco/utils/typeCheck'
import { brace, bracket } from '../../../../../../src/deco/utils/palette'
import { deList } from './deList'
import { deEntries } from './deEntries'

export const deJson = (node, l = 0) => {
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
