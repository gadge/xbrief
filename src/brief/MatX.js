import { ArrX } from './ArrX'
import { lpad, rpad, rn, totx } from '../utils/str'
import { Preci } from '../utils/Preci'
import { coins } from '../utils/algebra'
import { Visual, palette, shades } from 'spettro'
import { NumLoose } from 'typen'

const { isNumeric } = NumLoose
const { maxLen } = ArrX

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
          na: shades.white,
        },
        direct: 1
      },
      ansi = false
    } = {},
  ) {
    const rowsPreci = Preci
      .fromArr(matrix, rows.head, rows.tail)
      .map(
        row => Preci
          .fromArr(row, columns.head, columns.tail)
          .map(abstract || totx)
          .toList('...')
      )
    const cis = coins(rowsPreci.toList())
    let mx = rowsPreci.toList(cis.map(_ => '..'))
      |> (_ => Visual.matrix(_, visual))
    const pads = cis.map(c => mx.map(r => r[c])).map(ar => maxLen(ar, true))
    let lines = mx
      .map(row => row
        .map((x, i) =>
          isNumeric(x)
            ? lpad(x, pads[i], undefined, true)
            : rpad(totx(x), pads[i], undefined, true))
        .join(delimiter)
      )
    return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
