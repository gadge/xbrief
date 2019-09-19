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

const rxObj = /^\[object (.*)]$/

class Typ {
  static isNum (x) {
    return typeof x === 'number'
  }

  static isArr (x) {
    return !!x ? x.constructor === Array : false
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

  /**
   * protoType(o) = Object.prototype.toString.call(o)
   * @example protoType([]) // "[object Array]". protoType({}) // "[object Object]"
   * @param {*} o
   * @returns {string} Inferred typ in [object "Type"] form.
   */
  static protoType (o) {
    return Object.prototype.toString.call(o)
  }

  static inferType (o) {
    const raw = typeof o
    return raw === 'object'
      ? Typ.objectType(o)
      : raw
  }

  static objectType (o) {
    const [, info] = Object.prototype.toString.call(o).match(rxObj)
    return info.toLowerCase()
    // return str.match(rxObj)[1].toLowerCase()
  }

  static check (x) {
    const info = {
      toString: `${x}`,
      typeOf: typeof x,
      protoType: Object.prototype.toString.call(x),
      inferType: Typ.inferType(x),
      notUdf: x !== undefined,
      '!!': !!x
    }
    return deco(info)
  }
}

export {
  Typ
}
