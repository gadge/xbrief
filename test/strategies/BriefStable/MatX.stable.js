import { ArrX } from './ArrX'
import { rn, totx, aeu, numPad } from '../functions/str'
import { PreciStable as Preci } from '../../test/strategies/Preci/functions/Preci.stable'
import { Visual, palette, greys } from 'spettro'
import { Ar, Mx } from 'veho'
import { isVisual } from '../functions/isVisual'

const { maxLen } = ArrX
const { map: mapAr } = Ar

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
    const [ht, wd] = Mx.size(matrix)
    if (!ht || !wd) return aeu
    const visualOn = visual |> isVisual
    ansi = visualOn ? true : ansi
    const br = abstract ? (_ => String(abstract(_))) : totx
    let
      preci = Preci
        .fromArr(matrix, rows.head, rows.tail)
        .map(row => Preci.fromArr(row, columns.head, columns.tail)),
      blanc = Ar.ini(preci.first().length, '..'),
      rawx = preci.map(row => mapAr(row.toList('..'), br, wd), false).toList(blanc),
      visx = visualOn
        ? Visual.matrix(rawx, { ...visual, retFn: true, mutate: false })
        : null,
      mx = preci.map(row => mapAr(row.toList('..'), br, wd), false).toList(blanc),
      pads = Mx.columns(mx, col => maxLen(col, ansi))
    const lines = visualOn
      ? mx.map((row, i) => '[' +
        mapAr(row, (x, j) => numPad(x, rawx[i][j], pads[j], ansi) |> visx[i][j]).join(delimiter)
        + ']')
      : mx.map((row, i) => '[' +
        mapAr(row, (x, j) => numPad(x, rawx[i][j], pads[j], ansi)).join(delimiter)
        + ']')
    return '[' + lines.join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
