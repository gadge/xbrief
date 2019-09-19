import { rn } from '../utils/clay'
import { Typ } from '../typ/Typ'
import { Preci } from '../utils/Preci'
import { VecX } from '../brief/VecX'
import { columnIndexes } from '../utils/columnIndexes'


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
    const colIndexes = columnIndexes(rowsPreci.toList())
    const rowList = rowsPreci.toList(colIndexes.map(_ => '..'))
    const columnList = colIndexes.map(c => rowList.map(row => row[c]))
    const widths = columnList.map(VecX.maxLength)
    let lines = rowList.map((row) =>
      row.map((x, i) => Typ.isNumeric(x)
        ? (x).padStart(widths[i])
        : (x).padEnd(widths[i]),
      ).join(' | '))
    return '[' + lines.map(row => `[${row}]`).join(`,${rn} `) + ']'
  }
}

export {
  MatX,
}
