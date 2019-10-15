import { rn, aeu } from '../utils/str'
import { Preci } from '../utils/Preci'
import stringLength from 'string-length'
import { StrX } from './StrX'

class VecX {

  /**
   *
   * @param {*[]} arr
   * @param {string} [delimiter]
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{[max]:string|number[],[min]:string|number[],[direction]:?number}} [palette]
   * @return {string}
   */
  static hBrief (arr, {
      delimiter = ', ',
      abstract,
      head,
      tail,
      palette = {
        max: null,
        min: null,
        direction: null
      }
    } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail)
      .map(abstract)
      .stringify()
    const elements = preci.toList('...')
    return elements.length > 0
      ? elements.join(delimiter)
      : aeu
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{[max]:string|number[],[min]:string|number[],[direction]:?number}} [palette]
   * @return {*}
   */
  static vBrief (arr, {
      abstract,
      head,
      tail,
      palette = {
        max: null,
        min: null,
        direction: null
      }
    } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail)
      .map(abstract)
      .stringify()
    const elements = preci
      .jectHead(VecX.tagsIndexed)
      .jectTail(ar => VecX.tagsIndexed(ar, arr.length - tail + 1))
      .toList('...')
    return elements.length > 0
      ? elements.join(rn)
      : aeu
  }

  /**
   *
   * @param {string[]} texts
   */
  static maxLength (texts) {
    return Math.max(...texts.map(x => !!x ? x.length : 0))
  }

  /**
   *
   * @param {string[]} texts
   */
  static maxAnsiLen (texts) {
    return Math.max(...texts.map(x => !!x ? stringLength(x) : 0))
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):string} lengthSelector
   */
  static maxLengthBy (arr, lengthSelector) {
    return Math.max(...arr.map(x => lengthSelector(x).length))
  }

  static pads (arr, { direction = 'l', selfBench = false, padWidths, fillString }) {

  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]|number} [padWidths]
   * @param {string} [fillString]
   * @return {string[]}
   */
  static padStartsAnsi (texts, padWidths, fillString) {
    switch (true) {
      case !padWidths:
        const pad = texts |> VecX.maxAnsiLen
        return texts.map(x => StrX.padStartAnsi(x, pad, fillString))
      case typeof padWidths === 'number':
        return texts.map(x => StrX.padStartAnsi(x, padWidths, fillString))
      case Array.isArray(padWidths):
        return texts.map((x, i) => StrX.padStartAnsi(x, padWidths[i], fillString))
      default:
        return texts
    }
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]|number} [padWidths]
   * @param {string} [fillString]
   * @return {string[]}
   */
  static padStarts (texts, padWidths, fillString) {
    switch (true) {
      case !padWidths:
        const pad = texts |> VecX.maxLength
        return texts.map(x => x.padStart(pad, fillString))
      case typeof padWidths === 'number':
        return texts.map(x => x.padStart(padWidths, fillString))
      case Array.isArray(padWidths):
        return texts.map((x, i) => x.padStart(padWidths[i], fillString))
      default:
        return texts
    }
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]|number} [padWidths]
   * @param {string} [fillString]
   * @return {string[]}
   */
  static padEnds (texts, padWidths, fillString) {
    switch (true) {
      case !padWidths:
        const pad = texts |> VecX.maxAnsiLen
        return texts.map(x => x.padEnd(pad, fillString))
      case typeof padWidths === 'number':
        return texts.map(x => x.padEnd(padWidths, fillString))
      case Array.isArray(padWidths):
        return texts.map((x, i) => x.padEnd(padWidths[i], fillString))
      default:
        return texts
    }
  }

  static tagsIndexed (arr, startIndex = 1) {
    //maxPad = intExponent(arr.length) + 1
    const maxPad = Math.floor(Math.log10(arr.length + startIndex)) + 1
    return arr.map(
      (x, i) => `[${String(i + startIndex).padStart(maxPad)}] ${x}`
    )
  }
}

export {
  VecX
}
