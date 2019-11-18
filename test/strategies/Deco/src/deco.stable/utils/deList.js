import { tb } from '../../../../../../src/utils/str'
import stringLength from 'string-length'
import { Visual } from 'spettro'
import { deNode } from './deNode'

export let deList = (arr, l, rn) => {
  const points = arr.map(it => deNode(it, l + 1)) |> Visual.vector
  return stringLength(points.reduce((a, b) => a + b, 0).toString()) > 64
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}
