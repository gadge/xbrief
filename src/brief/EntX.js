import { Preci } from '../utils/Preci/Preci'
import { totx, aeu, rn, lpad, numPad } from '../utils/str'
import { greys, palette, Visual } from 'spettro'
import stringLength from 'string-length'
import { isVisual } from '../utils/isVisual'


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
    const visualOn = visual |> isVisual
    ansi = visualOn ? true : ansi
    const [brfL, brfR] = [
      keyAbstract ? (_ => String(keyAbstract(_))) : totx,
      abstract ? (_ => String(abstract(_))) : totx
    ]
    let
      len = ansi ? stringLength : x => x.length,
      pL = 0, pR = 0, vL, vR, wL, wR,
      preci = Preci.fromArr(entries, head, tail),
      raws = preci.toList(['..', '..']),
      vis = visualOn
        ? Visual.column(raws, 1, { mark: visual.mark, retFn: true, mutate: false },)
        : null,
      ents = preci.map(([k, v]) => {
        [vL, vR] = [brfL(k), brfR(v)];
        [wL, wR] = [len(vL), len(vR)];
        [pL, pR] = [wL > pL ? wL : pL, wR > pR ? wR : pR]
        return [vL, vR]
      }).toList(['..', '..']),
      list = visualOn
        ? ents.map(([k, v], i) =>
          lpad(k, pL, ansi) + delimiter +
          numPad(v, raws[i][1], pR, ansi) |> vis[i][1])
        : ents.map(([k, v], i) =>
          lpad(k, pL, ansi) + delimiter +
          numPad(v, raws[i][1], pR, ansi))
    return list.length ? list.join(rn) : aeu
  }
}

export {
  EntX
}
