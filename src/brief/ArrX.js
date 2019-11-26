import { rn, aeu, rpad} from '../utils/str'
import { Preci } from '../utils/Preci/Preci'
import { Visual, palette, greys } from 'spettro'
import { isVisual } from '../utils/isVisual'

export const indexPad = (arr, base = 0) => ~~(Math.log10(arr.length + base)) + 1

const entriefy = (arr, base = 1) => {
  //maxPad = intExponent(arr.length) + 1
  const maxPad = ~~(Math.log10(arr.length + base)) + 1
  return arr.map(
    (x, i) => `[${String(i + base).padStart(maxPad)}] ${x}`
  )
}

class ArrX {

  /**
   *
   * @param {*[]} arr
   * @param {string} [delimiter]
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{[max]:string|number[],[min]:string|number[],[na]:string|number[]}} [palette]
   * @return {string}
   */
  static hBrief (arr, {
      delimiter = ', ',
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
    const preci = Preci.fromArr(arr, head, tail)
      .map(abstract)
      .stringify()
    let elements = preci.toList('...')
    if (visual.on !== false) {
      elements = Visual.vector(elements, visual)
    }
    return elements.length ? elements.join(delimiter) : aeu
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):string} [abstract]
   * @param {number} [h]
   * @param {number} [t]
   * @param {{[max]:string|number[],[min]:string|number[],[na]:string|number[]}} [palette]
   * @return {*}
   */
  static vBrief (arr, {
      showIndex = true,
      abstract,
      head: h,
      tail: t,
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
    if (!arr?.length) return aeu
    const visualOn = visual |> isVisual
    let
      preci = Preci.fromArr(arr, h, t),
      pals = visualOn
        ? Visual.vector(preci.toList('...'), { ...visual, retFn: true })
        : null,
      words = preci.stringify(abstract),
      pad = words |> indexPad,
      base = 1
    let list = showIndex
      ? words
        .map((x, i) => `[${String(i + base).padStart(pad)}] ${x}`)
        .toList('...')
      : words
        .toList('...')
    if (visualOn) list = list.map((x, i) => x |> pals[i])
    return list.length ? list.join(rn) : aeu
  }

  /**
   *
   * @param {string[]} arr
   * @param {?number[]|?number} [pads]
   * @param {?string} [fill]
   * @param {boolean=false} [ansi]
   * @return {string[]}
   */
  static padEnds (arr, { pads, fill, ansi = false }) {
    switch (true) {
      case !pads:
        const pad = arr |> ArrX.maxLen
        return arr.map(x => rpad(x, pad, ansi, fill))
      case typeof pads === 'number':
        return arr.map(x => rpad(x, pads, ansi, fill))
      case Array.isArray(pads):
        return arr.map((x, i) => rpad(x, pads[i], ansi, fill))
      default:
        return arr
    }
  }
}

export {
  ArrX
}
