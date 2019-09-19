// let protoType = function (it) {
//   const raw = typeof it;
//   if (raw === "object") {
//     switch (true) {
//       case (it instanceof Array):
//         return "array";
//       case (it instanceof Map):
//         return "map";
//       case (it instanceof Set):
//         return "set";
//       case (it instanceof Function):
//         return "function";
//       default:
//         return raw;
//     }
//   } else {
//     return raw
//   }
// };

import { deco } from '../brief/deco'

const oc = Object.prototype.toString

/**
 * const rxObj = /^\[object (.*)]$/
 * Equivalent to: Object.prototype.toString.call(o).match(rxObj)[1]
 * @param {*} o
 * @return {string}
 */
function otype (o) {
  return oc.call(o).slice(8, -1)

}

class Typ {
  static infer (o) {
    const raw = typeof o
    return raw !== 'object'
      ? raw
      : otype(o).toLowerCase()
  }

  /**
   * protoType(o) = oc.call(o)
   * @example protoType([]) // "[object Array]". protoType({}) // "[object Object]"
   * @param {*} o
   * @returns {string} Inferred typ in [object "Type"] form.
   */
  static protoType (o) {
    return oc.call(o)
  }

  static isNum (x) {
    return typeof x === 'number'
  }

// Angular 4.3
  static isNumeric (v) {
    return !isNaN(v - parseFloat(v))
  }

  static notUdf (it) {
    return it !== undefined
  }

  static isNumStrBooUdf (it) {
    const typ = typeof it
    switch (typ) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return true
      default:
        return false
    }
  }

  static check (x) {
    const info = {
      toString: `${x}`,
      typeOf: typeof x,
      protoType: oc.call(x),
      inferType: Typ.infer(x),
      notUdf: x !== undefined,
      '!!': !!x
    }
    return deco(info)
  }
}

export {
  Typ
}
