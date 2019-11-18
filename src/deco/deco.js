import { Pal } from './utils/palette'
import { isNumeric } from './utils/typeCheck'
import { deOb } from './functions/deOb'
import { deFn } from './functions/deFn'

/**
 *
 * @param {any} obj
 * @param {number} hi - level of object to show
 * @returns {string|number}
 */
export const deco = (obj, hi) => deNode(obj, 0, hi)

const { str } = Pal

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @param {number} hi
 * @return {string|number}
 */
export function deNode (node, l = 0, hi = 8) {
  switch ((typeof node).slice(0, 3)) {
    case 'str':
      return isNumeric(node) ? node : `${str(node)}`
    case 'obj':
      return deOb(node, l, hi)
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


