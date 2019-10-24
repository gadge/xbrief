import { Preci } from '../utils/Preci'
import { totx, aeu, rn, rpad, lpad } from '../utils/str'
import { greys, palette, Visual } from 'spettro'
import stringLength from 'string-length'
import { NumLoose } from 'typen'

const { isNumeric } = NumLoose

class EntX {
  /***
   *
   * @param {[*,*][]} entries
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
  static hBrief (entries, {
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
  } = {}) {
    const
      [keyFn, valFn] = [keyAbstract || totx, abstract || totx]
    let elements = Preci
      .fromArr(entries, head, tail)
      .map(([k, v]) => [keyFn(k), valFn(v)])
      .toList(['..', '..'])
    if (visual.on !== false) {
      Visual.column(elements, 1, { mark: visual.mark, deep: false },)
    }
    elements = elements.map(([k, v]) => '(' + k + delimiter + v + ')')
    return elements.length ? elements.join(',') : aeu
  }

  /***
   *
   * @param {[*,*][]} entries
   * @param {string} [delimiter=' => ']
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
  static vBrief (entries, {
    delimiter = ' -> ',
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
    },
    ansi = false
  } = {}) {
    let len = ansi || visual.on !== false ? stringLength : x => x.length
    let [kPad, vPad] = [0, 0], _k, _v, _kl, _vl
    const
      [keyFn, valFn] = [keyAbstract || totx, abstract || totx],
      preci = Preci
        .fromArr(entries, head, tail)
        .map(([k, v]) => {
          _k = keyFn(k)
          _v = valFn(v)
          _kl = len(_k)
          _vl = len(_v)
          if (_kl > kPad) kPad = _kl
          if (_vl > vPad) vPad = _vl
          return [_k, _v]
        })
    let elements = preci.toList(['..', '..'])
    if (visual.on !== false) {
      ansi = true
      Visual.column(elements, 1, { mark: visual.mark, deep: false },)
    }
    elements = elements.map(([k, v]) => lpad(k, kPad, ' ', ansi)
      + delimiter
      + (isNumeric(v)
        ? rpad(totx(v), vPad, undefined, ansi)
        : lpad(v, vPad, undefined, ansi))
    )
    return elements.length ? elements.join(rn) : aeu
  }
}

export {
  EntX
}