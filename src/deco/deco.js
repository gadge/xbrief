import { Pal } from './utils/palette'
import { isNumeric } from './utils/typeCheck'
import { deOb } from './functions/deOb'
import { deFn } from './functions/deFn'

/**
 *
 * @param {*} obj
 * @param {number} [hi] - level of object to show
 * @param {number} [vu] - vertical under
 * @returns {string|number}
 */
export const deco = (obj, { hi, vu } = {}) => deNode(obj, 0, hi, vu)

const { str } = Pal

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @param {number} hi
 * @param {number} vu
 * @return {string|number}
 */
export function deNode (node, l = 0, hi = undefined, vu = 0) {
  switch ((typeof node).slice(0, 3)) {
    case 'str':
      return isNumeric(node) ? node : `${str(node)}`
    case 'obj':
      return deOb(node, l, hi, vu)
    case 'num':
    case 'big':
      return node
    case 'fun':
      return deFn(node)
    case 'boo':
    case 'und':
    case 'sym':
      return `${Pal.udf(node)}`
  }
}


