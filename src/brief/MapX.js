import { rn, aeu } from '../misc/clay'
import { EntX } from './EntX'
import { Preci } from '../misc/Preci'

class MapX {
  /**
   *
   * @param {Map} dict
   * @param {string} delimiter
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @returns {string}
   */
  static hBrief (dict,
                 {
                   delimiter = ', ',
                   abstract,
                   head = 0,
                   tail = 0
                 } = {}
  ) {
    const realAbstract = abstract ? ([k, v]) => [k, abstract(v)] : null
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(realAbstract)
      .map(([k, v]) => [`${k}`, `${v}`])
    const elements = preci.map(EntX.simpleBrief).toList('...')
    return elements.length > 0 ? elements.join(delimiter) : aeu
  }

  /***
   *
   * @param {Map} dict
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @returns {string}
   */
  static vBrief (dict, { abstract, head, tail } = {}) {
    const actualAbstract = !!abstract
      ? ([k, v]) => [`${k}`, `${abstract(v)}`]
      : ([k, v]) => [`${k}`, `${v}`]
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(actualAbstract)
    const l = Math.max(...preci.map(([k]) => k.length)
      .toList())
    const elements = preci
      .map(it => EntX.briefPadded(it, l))
      .toList('...'.padStart(l))
    return elements.length > 0 ? elements.join(rn) : aeu
  }
}

Map.prototype.hBrief = function ({ delimiter = ', ', abstract, head = 0, tail = 0 } = {}) {
  return MapX.hBrief(this, { delimiter, abstract, head, tail })
}

Map.prototype.vBrief = function ({ abstract, head = 0, tail = 0 } = {}) {
  return MapX.vBrief(this, { abstract, head, tail })
}

export {
  MapX
}
