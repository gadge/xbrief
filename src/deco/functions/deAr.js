import stringLength from 'string-length'
import { Visual } from 'spettro'
import { deNode } from '../deco'
import { tb } from '../../utils/str'

export let deAr = (arr, l, rn, hi) => {
  let len = 0, wrap = false, word
  l++
  const points = arr.map(node => {
    word = deNode(node, l, hi).toString()
    if (!wrap && (len += stringLength(word)) > 64) wrap = true
    return word
  })|> Visual.vector
  return wrap
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}
