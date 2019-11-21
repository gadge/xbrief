import stringLength from 'string-length'
import { Visual } from 'spettro'
import { deNode } from '../deco'
import { tb } from '../../utils/str'

export let deAr = (arr, lv, rn, hi, vu) => {
  let len = 0, wrap = false, word
  lv++
  const points = arr.map(node => {
    word = deNode(node, lv, hi, vu).toString()
    if (!wrap && (len += stringLength(word)) > 64) wrap = true
    return word
  }) |> Visual.vector
  return wrap
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

