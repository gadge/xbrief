import { VecX } from './VecX'
import { StrX } from './StrX'
import { Preci } from '../utils/Preci'
import { tx } from '../utils/str'
import { transpose, zip } from '../utils/algebra'
import { rn } from '../utils/str'

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [matrix]
 * @param {{[max]:string|number[],[min]:string|number[],[direction]:?number}} [palette]
 * @return {{head:string[],rows:string[][]}}
 */
function _preci (table, {
  banner = {
    abstract: null,
    head: 0,
    tail: 0
  },
  matrix = {
    abstract: null,
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
  head = Preci
    .fromArr(head, banner.head, banner.tail)
    .map(banner.abstract || tx)
    .toList('..')
  const abstract = matrix.abstract || tx
  rows = Preci
    .fromArr(rows, matrix.head, matrix.tail)
    .map(row => Preci.fromArr(row, banner.head, banner.tail)
      .map(abstract)
      .toList('..')
    ).toList(head.map(_ => '..'))
  return { head, rows }
}

class TabX {
  /**
   *
   * @param {
   * {banner:*[],matrix:*[][],[title]:string,[types]:*[]} |
   * {head:*[],rows:*[][],[title]:string,[types]:*[]}
   * } table
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [matrix]
   * @param {boolean} [chinese=false]
   * @return {string}
   */
  static brief (table, {
    banner = {
      abstract: null,
      head: 0,
      tail: 0
    },
    matrix = {
      abstract: null,
      head: 0,
      tail: 0
    },
    chinese = false
  } = {}) {
    let
      head = table.head || table.banner,
      rows = table.rows || table.matrix;
    ({ head, rows } = _preci({ head, rows }, { banner, matrix }))
    return chinese ? briefCn({ head, rows }) : briefEn({ head, rows })
  }
}

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @return {string}
 */
function briefEn ({ head, rows }) {
  /**
   * @type {number[]}
   */
  const pads = ([head, ...rows] |> transpose).map(VecX.maxAnsiLen)
  const [bannerLine, blankLine, matrixLines] = [
    head.map((x, i) => StrX.padStartAnsi(x, pads[i])),
    pads.map(l => '-'.repeat(l)),
    rows.map((row) => VecX.padStartsAnsi(row, pads))
  ]
  return [
    bannerLine.join(' | '),
    blankLine.join('-+-'),
    ...matrixLines.map(row => row.join(' | '))
  ].join(rn)
}

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @return {string}
 */
function briefCn ({ head, rows }) {
  const [cnDash, cnSpace] = ['－', '　']
  /**
   *
   * @type {{pad:number,chn:boolean}[]}
   */
  const pads = ([head, ...rows] |> transpose)
    .map(col =>
      ({
        pad: VecX.maxAnsiLen(col),
        chn: col.some(StrX.hasChn)
      })
    )

  const [bannerLine, blankLine, matrixLines] = [
    zip(head, pads, (x, { chn, pad }) => chn
      ? StrX.toFullAngle(x).padEnd(pad, cnSpace)
      : x.padEnd(pad)
    ),
    pads.map(p => (p.chn ? cnDash : '-').repeat(p.pad)),
    rows.map(
      row => zip(row, pads, (x, { chn, pad }) => chn
        ? StrX.padStartAnsi(StrX.toFullAngle(x), pad, cnSpace)
        : StrX.padStartAnsi(x, pad)
      )
    )
  ]
  return [
    bannerLine.join(' | '),
    blankLine.join('-+-'),
    ...matrixLines.map(row => row.join(' | '))
  ].join('\r\n')
}

export {
  TabX
}