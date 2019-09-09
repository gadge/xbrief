import { rn, aeu } from '../utils/clay'
import { Preci } from '../utils/Preci'

class VecX {

  /**
   *
   * @param {*[]} arr
   * @param {string} delimiter
   * @param {function} abstract
   * @param {number} head
   * @param {number} tail
   * @return {string}
   */
  static hBrief (arr, {
                   delimiter = ', ',
                   abstract,
                   head,
                   tail
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
   * @param {function|function(*=):string} abstract
   * @param {number} head
   * @param {number} tail
   * @return {*}
   */
  static vBrief (arr, {
                   abstract,
                   head,
                   tail
                 } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail)
      .map(abstract)
      .stringify()
    const elements = preci
      .jectHead(VecX.tagsIndexed)
      .jectTail(ar => VecX.tagsIndexed(ar, arr.length - tail))
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
   * @param {*[]} arr
   * @param {function(*):string} lengthSelector
   */
  static maxLengthBy (arr, lengthSelector) {
    return Math.max(...arr.map(x => lengthSelector(x).length))
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]} padWidths
   * @param {string|null} fillString
   * @return {string[]}
   */
  static padStarts (texts, padWidths, fillString = undefined) {

    return texts.map((x, i) => x.padStart(padWidths[i], fillString))
  }

  /**
   *
   * @param {string[]} texts
   * @param {number[]} padWidths
   * @param {string|null} fillString
   * @return {string[]}
   */
  static padEnds (texts, padWidths, fillString = undefined) {
    return texts.map((x, i) => x.padEnd(padWidths[i], fillString))
  }

  static tagsIndexed (arr, startIndex = 1) {
    //Math.floor(Math.log10(arr.length)) = intExponent(arr.length)
    const maxIdxLen = Math.floor(Math.log10(arr.length + startIndex)) + 1
    return arr.map(
      (x, i) => `[${(i + startIndex).toString().padStart(maxIdxLen)}] ${x}`
    )
  }
}

export {
  VecX
}
