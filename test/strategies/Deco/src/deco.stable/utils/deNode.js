import { isNumeric } from '../../../../../../src/deco/utils/typeCheck'
import { Pal } from '../../../../../../src/deco/utils/palette'
import { deJson } from './deJson'

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @return {string|number}
 */
export function deNode (node, l = 0) {
  switch (typeof node) {
    case 'string':
      return isNumeric(node) ? node : `${Pal.str(node)}`
    case 'object':
    case 'function':
      return deJson(node, l)
    case 'bigint':
    case 'number':
      return node
    // return `${pal.num)(node)}`
    case 'boolean':
    case 'symbol':
    case 'undefined':
      return `${Pal.udf(node)}`
  }
}
