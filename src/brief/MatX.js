import { rn } from '../utils/clay'
import { Typ } from '../typ/Typ'
import { Preci } from '../utils/Preci'
import { VecX } from '../brief/VecX'
import { columnKeys } from '../utils/algebra'

class MatX {
  /**
   *
   * @param {*[][]} matrix
   * @param {?function(*):string} [abstract]
   * @param {{[head]:number,[tail]:number}} [rows]
   * @param {{[head]:number,[tail]:number}} [columns]
   * @returns {string}
   */
  static xBrief (
    matrix,
    {
      abstract,
      rows = { head: 0, tail: 0 },
      columns = { head: 0, tail: 0 },
    } = {},
  ) {
    const rowsPreci = Preci
      .fromArr(matrix, rows.head, rows.tail)
      .map(
        row => Preci
          .fromArr(row, columns.head, columns.tail)
          .map(!!abstract ? abstract : x => `${x}`)
          .toList('...')
      )
    const cKeys = columnKeys(rowsPreci.toList())
    const rowList = rowsPreci.toList(cKeys.map(_ => '..'))
    const columnList = cKeys.map(c => rowList.map(row => row[c]))
    const pads = columnList.map(VecX.maxLength)
    let lines = rowList.map((row) =>
      row.map((x, i) => Typ.isNumeric(x)
        ? (x).padStart(pads[i])
        : (x).padEnd(pads[i]),
      ).join(' | ')
    )
    return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
