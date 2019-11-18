import stringLength from 'string-length'
import { Pal } from '../../../../../../src/deco/utils/palette'
import { lpad, tb } from '../../../../../../src/utils/str'
import { Visual } from 'spettro'
import { deNode } from './deNode'

export let deEntries = (entries, l, rn) => {
  let
    ents = entries.map(([k, v]) => [`${k}`, v]),
    pad = Math.max(...ents.map(([k]) => stringLength(k)))
  ents = ents
    .map(([k, v]) => [Pal.idx(lpad(k, pad, true)), deNode(v, l + 1)])
  ents = Visual.column(ents, 1, { mutate: true })
  const points = ents.map(([k, v]) => `${k}: ${v}`)
  return stringLength(points.reduce((a, b) => a + b, 0).toString()) > 64
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(', ')
}
