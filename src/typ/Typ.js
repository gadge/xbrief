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

const oc = Object.prototype.toString

/**
 * const rxObj = /^\[object (.*)]$/
 * Equivalent to: Object.prototype.stringify.call(o).match(rxObj)[1]
 * @param {*} o
 * @return {string}
 */
function otype (o) {
  return oc.call(o).slice(8, -1)
}

class Typ {
  /**
   * protoType(o) = oc.call(o)
   * @example protoType([]) // "[object Array]". protoType({}) // "[object Object]"
   * @param {*} o
   * @returns {string} Inferred typ in [object "Type"] form.
   */
  static protoType (o) {
    return oc.call(o)
  }

  static infer (o) {
    const raw = typeof o
    return raw !== 'object'
      ? raw
      : otype(o).toLowerCase()
  }

  static initial (o) {
    return oc.call(o).slice(8, 11)
  }

  static isNum (x) {
    return typeof x === 'number'
  }

// Angular 4.3
  static isNumeric (v) {
    return !isNaN(v - parseFloat(v))
  }

  /**
   *
   * @param x
   * @return {{
   * typeOf: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"),
   * protoType: *,
   * stringify: string
   * }}
   */
  static check (x) {
    return {
      typeOf: typeof x,
      protoType: oc.call(x),
      stringify: `${x}`,
    }
  }
}

export {
  Typ
}
