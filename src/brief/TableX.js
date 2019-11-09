import { Preci } from '../utils/Preci/Preci'
import { aeu, rn } from '../utils/str'
import { greys, palette } from 'spettro'
import { Mx } from 'veho'
import { isVisual } from '../utils/isVisual'
import { destructPreX } from '../utils/Preci/functions/destructPreX'
import { readCrop } from '../utils/readCrop'
import { padTable } from '../utils/Preci/functions/padTable'

class TableX {
  /**
   *
   * @param {
   *          {banner:*[],matrix:*[][],[title]:string,[types]:*[]} |
   *          {head:*[],rows:*[][],[title]:string,[types]:*[]} |
   *          {header:*[],rowSet:*[][],[title]:string,[types]:*[]}
   *        } table
   * @param {?function(*):string} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [_head]
   * @param {{[head]:?number,[tail]:?number}} [_rows]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @param {boolean} [ansi=false]
   * @param {boolean} [chinese=false]
   * @return {string}
   */
  static brief (table,
    {
      abstract,
      head: _head = {
        abstract: null,
        head: 0,
        tail: 0
      },
      rows: _rows = {
        head: 0,
        tail: 0
      },
      visual = {
        on: true,
        mark: {
          max: palette.lightGreen.accent_3,
          min: palette.orange.accent_2,
          na: greys.blueGrey.lighten_3,
        },
        direct: 2
      },
      ansi = false,
      chinese = false,
    } = {}) {
    let
      head = table.head || table.banner || table.header,
      rows = table.rows || table.matrix || table.rowSet,
      blanc
    const [ht, wd] = Mx.size(rows)
    if (!ht || !wd) return aeu
    const visualOn = visual |> isVisual
    ansi = visualOn ? true : ansi
    const
      hs = Preci.fromArr(head, _head.head, _head.tail).stringify(abstract).toList('..'),
      { rawx, palx, wordx } = destructPreX(
        rows, _rows |> readCrop, _head |> readCrop,
        { abstract, visual, ansi }, [ht, wd]);
    ({ head, blanc, rows } = padTable(hs, wordx, rawx, palx, ansi, chinese))
    return [head.join(' | '), blanc.join('-+-')].concat(
      rows.map(row => row.join(' | '))
    ).join(rn)
  }
}

export {
  TableX
}
