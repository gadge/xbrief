import { EntX } from './EntX'
import { greys, palette } from 'spettro'

class MapX {
  /**
   *
   * @param {Map<*,*>} dict
   * @param {string} [delimiter=',']
   * @param {function(*):string} [keyAbstract]
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @returns {string}
   */
  static hBrief (dict,
    {
      delimiter = ':',
      keyAbstract,
      abstract,
      head,
      tail,
      visual = {
        on: true,
        mark: {
          max: palette.lightGreen.accent_3,
          min: palette.orange.accent_2,
          na: greys.blueGrey.lighten_3,
        }
      }
    } = {}
  ) {
    return EntX.hBrief([...dict.entries()], {
      delimiter,
      keyAbstract,
      abstract,
      head,
      tail,
      visual
    })
    // const textAbstract = abstract
    //   ? ([k, v]) => `${k}:(${abstract(v)})`
    //   : ([k, v]) => `${k}:(${v})`
    // const elements = Preci
    //   .fromArr([...dict.entries()], head, tail)
    //   .map(textAbstract)
    //   .toList('...')
    // return elements.length > 0
    //   ? elements.join(delimiter)
    //   : aeu
  }

  /***
   *
   * @param {Map<*,*>} dict
   * @param {string} [delimiter=' -> ']
   * @param {function(*):string} [keyAbstract]
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @param {boolean} [ansi=false]
   * @returns {string}
   */
  static vBrief (dict, {
    delimiter = ' -> ',
    keyAbstract,
    abstract,
    head = 0,
    tail = 0,
    visual = {
      on: true,
      mark: {
        max: palette.lightGreen.accent_3,
        min: palette.orange.accent_2,
        na: greys.blueGrey.lighten_3,
      }
    },
    ansi = false
  } = {}) {
    return EntX.vBrief([...dict.entries()], {
      delimiter,
      keyAbstract,
      abstract,
      head,
      tail,
      visual,
      ansi
    })
    // const textAbstract = !!abstract
    //   ? ([k, v]) => [`${k}`, `${abstract(v)}`]
    //   : ([k, v]) => [`${k}`, `${v}`]
    // const preci = Preci
    //   .fromArr([...dict.entries()], head, tail)
    //   .map(textAbstract)
    // const pad = ArrX.maxLen(preci.toList().map(([k]) => k))
    // const elements = preci
    //   .map(it => EntX.briefPadded(it, pad))
    //   .toList('...'.padStart(pad))
    // return elements.length > 0
    //   ? elements.join(rn)
    //   : aeu
  }
}

export {
  MapX
}
