import { rn, aeu, lpad, rpad } from '../utils/str'
import { Preci } from '../utils/Preci'
import stringLength from 'string-length'
import { Visual, palette, greys } from 'spettro'

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
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{[max]:string|number[],[min]:string|number[],[na]:string|number[]}} [palette]
   * @return {*}
   */
  static vBrief (arr, {
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
    if (!arr || !arr.length) return aeu
    const
      { length } = arr,
      preci = Preci.fromArr(arr, head, tail)
        .map(abstract)
        .stringify()
    let elements = preci
      .jectHead(entriefy)
      .jectTail(ar => entriefy(ar, length - tail + 1))
      .toList('...')
    if (visual.on) elements = Visual.vector(elements, visual)
    return elements.length ? elements.join(rn) : aeu
  }

  /**
   *
   * @param {Array<?string>} arr
   * @param ansi
   */
  static maxLen (arr, ansi = false) {
    return ansi
      ? Math.max(...arr.map(x => !!x ? stringLength(x) : 0))
      : Math.max(...arr.map(x => !!x ? x.length : 0))
  }

  /**
   *
   * @param {string[]} arr
   * @param {number[]|number} [pads]
   * @param {?string} [fill]
   * @param {boolean=false} [ansi]
   * @return {string[]}
   */
  static padStarts (arr, { pads, fill, ansi = false }) {
    switch (true) {
      case !pads:
        const pad = ArrX.maxLen(arr, ansi)
        return arr.map(x => lpad(x, pad, fill, ansi))
      case typeof pads === 'number':
        return arr.map(x => lpad(x, pads, fill, ansi))
      case Array.isArray(pads):
        return arr.map((x, i) => lpad(x, pads[i], fill, ansi))
      default:
        return arr
    }
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
        return arr.map(x => rpad(x, pad, fill, ansi))
      case typeof pads === 'number':
        return arr.map(x => rpad(x, pads, fill, ansi))
      case Array.isArray(pads):
        return arr.map((x, i) => rpad(x, pads[i], fill, ansi))
      default:
        return arr
    }
  }
}

export {
  ArrX
}
