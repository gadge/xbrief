import { rn, tb } from '../../utils/str'
import { initial } from '../utils/typeCheck'
import { brace, bracket } from '../utils/palette'
import { deAr } from './deAr'
import { deEnts } from './deEnts'

export const deOb = (node, l = 0, hi = 8) => {
  let r = rn + tb.repeat(l)
  switch (initial(node)) {
    case 'Arr':
      return l >= hi ? '[array]' : deAr(node, l, r, hi) |> bracket
    case 'Obj' :
      return l >= hi ? '{object}' : deEnts(Object.entries(node), l, r, hi) |> brace
    case 'Map':
      return l >= hi ? '(map)' : deEnts([...node.entries()], l, r, hi)|> bracket
    // case 'Fun' :
    //   return deFn(node)
    case 'Set':
      return l >= hi ? '(set)' : `set:[${deAr([...node], l, r, hi)}]`
    default:
      return `${node}`
  }
}


