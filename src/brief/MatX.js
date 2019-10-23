import { ArrX } from './ArrX'
import { lpad, rpad, rn, totx, aeu } from '../utils/str'
import { Preci } from '../utils/Preci'
import { coins } from '../utils/algebra'
import { Visual, palette, greys } from 'spettro'
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
          na: greys.blueGrey.lighten_3,
        },
        direct: 1
      },
      ansi = false
    } = {},
  ) {
    if (!matrix || !matrix.length || !Array.isArray(matrix[0])) return aeu
    const
      rowsPreci = Preci
        .fromArr(matrix, rows.head, rows.tail)
        .map(
          row => Preci
            .fromArr(row, columns.head, columns.tail)
            .map(abstract || totx)
            .toList('...')
        ),
      cis = coins(rowsPreci.toList())
    let mx = rowsPreci.toList(cis.map(_ => '..'))
    if (visual.on) {
      ansi = true
      mx = Visual.matrix(mx, visual)
    }
    const
      pads = cis.map(c => mx.map(r => r[c])).map(ar => maxLen(ar, ansi)),
      lines = mx
        .map(row => row
          .map((x, i) =>
            isNumeric(x)
              ? lpad(x, pads[i], undefined, ansi)
              : rpad(totx(x), pads[i], undefined, ansi))
          .join(delimiter)
        )
    return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
