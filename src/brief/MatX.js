import { rn, aeu } from '../utils/str'
import { palette, greys } from 'spettro'
import { Mx } from 'veho'
import { isVisual } from '../utils/isVisual'
import { destructPreX } from '../utils/Preci/functions/destructPreX'
import { padMx } from '../utils/Preci/functions/padMx'
import { readCrop } from '../utils/readCrop'
import { maxLen } from '../utils/arr'

class MatX {
  /**
   * direct: point-wise=0, row-wise=1, column-wise=2
   * @param {*[][]} matrix
   * @param {function(*):string} [abstract]
   * @param {string} [delimiter=',']
   * @param {{head:number,tail:number}} [rows]
   * @param {{head:number,tail:number}} [columns]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @param ansi
   * @returns {string}
   */
  static xBrief (
    matrix,
    {
      abstract,
      delimiter = ', ',
      rows = { head: 0, tail: 0 },
      columns = { head: 0, tail: 0 },
      visual = {
        on: true,
        mark: {
          max: palette.lightGreen.accent_3,
          min: palette.orange.accent_2,
          na: greys.blueGrey.lighten_3,
        },
        direct: 1
      },
      ansi = false
    } = {},
  ) {
    const [h, w] = Mx.size(matrix)
    if (!h || !w) return aeu
    ansi = (visual |> isVisual) ? true : ansi
    const { rawx, palx, wordx } = destructPreX(
      matrix,
      rows |> readCrop, columns |> readCrop,
      { abstract, visual, ansi },
      [h, w]),
      pads = Mx.columns(wordx, col => maxLen(col, ansi)),
      lines = padMx(wordx, rawx, palx, pads, ansi).map(line => `[${line}]`)
    return '[' + lines.join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
