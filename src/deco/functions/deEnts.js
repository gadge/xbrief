import stringLength from 'string-length'
import { Ar } from 'veho'
import { Visual } from 'spettro'
import { deNode } from '../deco'
import { Pal } from '../utils/palette'
import { lpad, tb } from '../../utils/str'

export let deEnts = (entries, lv, rn, hi, vu) => {
  let
    pad = 0, sum = 0, wrap = lv < vu, n,
    ents = entries.map(([k, v]) => {
      k = `${k}`
      n = stringLength(k)
      if (!wrap && (sum += n) > 48) wrap = true
      if (n > pad) pad = n
      return [k, v]
    })
  wrap
    ? Ar.mutateMap(ents, ([k, v]) => [Pal.idx(lpad(k, pad, true)), deNode(v, lv + 1, hi, vu)])
    : Ar.mutateMap(ents, ([k, v]) => [k, deNode(v, lv + 1, hi, vu)])
  const points = Visual.column(ents, 1, { mutate: true }).map(([k, v]) => `${k}: ${v}`)
  return wrap
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(', ')
}
