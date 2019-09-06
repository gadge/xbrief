import { rn, aeu } from '../utils/clay'
import { Preci } from '../utils/Preci'
import { EntX } from './EntX'
import { VecX } from './VecX'

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
    const textAbstract = abstract
      ? ([k, v]) => [`${k}`, `${abstract(v)}`]
      : ([k, v]) => [`${k}`, `${v}`]
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(textAbstract)
    const elements = preci.map(EntX.simpleBrief)
      .toList('...')
    return elements.length > 0
      ? elements.join(delimiter)
      : aeu
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
    const textAbstract = !!abstract
      ? ([k, v]) => [`${k}`, `${abstract(v)}`]
      : ([k, v]) => [`${k}`, `${v}`]
    const preci = Preci
      .fromArr([...dict.entries()], head, tail)
      .map(textAbstract)
    const pad = VecX.maxLength(preci.toList().map(([k]) => k))
    const elements = preci
      .map(it => EntX.briefPadded(it, pad))
      .toList('...'.padStart(pad))
    return elements.length > 0
      ? elements.join(rn)
      : aeu
  }
}

export {
  MapX
}
