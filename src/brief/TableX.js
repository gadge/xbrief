import { ArrX } from './ArrX'
import { StrX } from './StrX'
import { Preci } from '../utils/Preci'
import { lpad, rpad, totx, zhChars, rn } from '../utils/str'
import { transpose, zip } from '../utils/algebra'

const { hasChn, toFullAngle } = StrX
const { maxLen, padStarts } = ArrX

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @param {?function(*):string} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [_head]
 * @param {{[head]:?number,[tail]:?number}} [rows]
 * @param {{[max]:string|number[],[min]:string|number[],[direction]:?number}} [palette]
 * @return {{head:string[],rows:string[][]}}
 */
function _preci (table,
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
    palette = {
      max: null,
      min: null,
      direction: null
    }
  } = {}) {
  let { head, rows } = table
  abstract = abstract || totx
  head = Preci
    .fromArr(head, _head.head, _head.tail)
    .map(_head.abstract || totx)
    .toList('..')
  rows = Preci
    .fromArr(rows, _rows.head, _rows.tail)
    .map(row =>
      Preci
        .fromArr(row, _head.head, _head.tail)
        .map(abstract)
        .toList('..')
    ).toList(head.map(() => '..'))
  return { head, rows }
}

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
      ansi = false,
      chinese = false,
    } = {}) {
    let
      head = table.head || table.banner || table.header,
      rows = table.rows || table.matrix || table.rowSet;
    ({ head, rows } = _preci({ head, rows }, { abstract, head: _head, rows: _rows }))
    return chinese ? briefCn({ head, rows }, ansi) : briefEn({ head, rows }, ansi)
  }
}

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @param {boolean=false} [ansi]
 * @return {string}
 */
function briefEn ({ head, rows }, ansi = false) {
  /**
   * @type {number[]}
   */
  const pads = ([head, ...rows] |> transpose).map(col => maxLen(col, ansi))
  const [banner, blank, matrix] = [
    head.map((x, i) => lpad(x, pads[i], ' ', ansi)),
    pads.map(l => '-'.repeat(l)),
    rows.map((row) => padStarts(row, { pads, ansi }))
  ]
  return [
    banner.join(' | '),
    blank.join('-+-'),
    ...matrix.map(row => row.join(' | '))
  ].join(rn)
}

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @param {boolean=false} [ansi]
 * @return {string}
 */
function briefCn ({ head, rows }, ansi = false) {
  const { dash, space } = zhChars
  /**
   *
   * @type {{pad:number,chn:boolean}[]}
   */
  const pads = ([head, ...rows] |> transpose)
    .map(col =>
      ({
        pad: maxLen(col, ansi),
        chn: col.some(hasChn)
      })
    )
  const [banner, blank, matrix] = [
    zip(head, pads, (x, { chn, pad }) => chn
      ? rpad(toFullAngle(x), pad, space, ansi)
      : rpad(x, pad, ' ', ansi)
    ),
    pads.map(p => (p.chn ? dash : '-').repeat(p.pad)),
    rows.map(
      row => zip(row, pads, (x, { chn, pad }) => chn
        ? lpad(toFullAngle(x), pad, space, ansi)
        : rpad(x, pad, ' ', ansi)
      )
    )
  ]
  return [
    banner.join(' | '),
    blank.join('-+-'),
    ...matrix.map(row => row.join(' | '))
  ].join(rn)
}

export {
  TableX
}