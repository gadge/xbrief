// let inferTypo = function (it) {
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
   * inferTypo(o) = Object.prototype.toString.call(o)
   * @example inferTypo([]) // "[object Array]". inferTypo({}) // "[object Object]"
   * @param {*} obj
   * @returns {string} Inferred typ in [object "Type"] form.
   */
  static inferTypo (obj) {
    return Object.prototype.toString.call(obj)
  }

  static inferType (it) {
    const raw = typeof it
    return raw === 'object'
      ? Typ.inferObject(it)
      : raw
  }

  static inferObject (it) {
    const str = Object.prototype.toString.call(it)
    return str.match(rxObj)[1].toLowerCase()
  }

  static check (x) {
    const info2 = {
      toString: `${x}`,
      prototypeCall: Object.prototype.toString.call(x),
      notUndefined: x !== undefined,
      type: Typ.inferType(x),
      '!!': !!x
    }
    return deco(info2)
  }
}

export {
  Typ
}
