import { rn, tb } from '../../utils/str'
import { initial } from '../utils/typeCheck'
import { brace, bracket } from '../utils/palette'
import { deAr } from './deAr'
import { deEnts } from './deEnts'

export const deOb = (node, lv = 0, hi = 8, vu = 1) => {
  let lf = rn + tb.repeat(lv)
  switch (initial(node)) {
    case 'Arr':
      return lv >= hi ? '[array]' : deAr(node, lv, lf, hi, vu) |> bracket
    case 'Obj' :
      return lv >= hi ? '{object}' : deEnts(Object.entries(node), lv, lf, hi, vu) |> brace
    case 'Map':
      return lv >= hi ? '(map)' : deEnts([...node.entries()], lv, lf, hi, vu)|> bracket
    // case 'Fun' :
    //   return deFn(node)
    case 'Set':
      return lv >= hi ? '(set)' : `set:[${deAr([...node], lv, lf, hi, vu)}]`
    default:
      return `${node}`
  }
}


