import { VecX } from './VecX'
import { StrX } from './StrX'
import { Preci } from '../utils/Preci'
import { totx } from '../utils/totx'
import { transpose, zip } from '../utils/algebra'

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
    let head, rows
    if (table.hasOwnProperty('head')) {
      ({ head, rows } = table)
    } else {
      ({ banner: head, matrix: rows } = table)
    }
    ({ head, rows } = preciTable({ head, rows }, { banner, matrix }))
    return chinese ? briefCn({ head, rows }) : briefEn({ head, rows })
  }

  /**
   *
   * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
   * @param {[function(*):string]} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
   * @param {boolean} [chinese=false]
   * @return {string}
   */
  static briefCrosTab (crosTab, {
    abstract,
    side = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    banner = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    chinese = false
  } = {}) {
    const { head, rows } = preciCrosTab(crosTab, { abstract, side, banner })
    return TabX.brief({ head, rows }, { chinese })
  }
}

/**
 *
 * @param {{head:*[],rows:*[][]}} table
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [matrix]
 * @return {{head:string[],rows:string[][]}}
 */
function preciTable (table, {
  banner = {
    abstract: null,
    head: 0,
    tail: 0
  },
  matrix = {
    abstract: null,
    head: 0,
    tail: 0
  }
} = {}) {
  let { head, rows } = table
  head = Preci
    .fromArr(head, banner.head, banner.tail)
    .map(!!banner.abstract ? banner.abstract : totx)
    .toList('..')
  const elAbstract = !!matrix.abstract ? matrix.abstract : totx
  rows = Preci
    .fromArr(rows, matrix.head, matrix.tail)
    .map(row => Preci.fromArr(row, banner.head, banner.tail)
      .map(elAbstract)
      .toList('..')
    ).toList(head.map(_ => '..'))
  return { head, rows }
}

/**
 * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
 * @param {[function(*):string]} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [matrix]
 * @return {{head:string[],rows:string[][]}}
 */
function preciCrosTab (crosTab, {
                         abstract,
                         side = {
                           abstract: undefined,
                           head: 0,
                           tail: 0
                         },
                         banner = {
                           abstract: undefined,
                           head: 0,
                           tail: 0
                         },
                       } = {}
) {
  const sideTaken = Preci
    .fromArr(crosTab.side, side.head, side.tail)
    .map(!!side.abstract ? side.abstract : totx)
    .toList('..')
  const head = Preci
    .fromArr(crosTab.banner, banner.head, banner.tail)
    .map(!!banner.abstract ? banner.abstract : totx)
    .toList('..')
  const matrixAbstract = !!abstract ? abstract : totx
  const rows = Preci
    .fromArr(crosTab.matrix, side.head, side.tail)
    .map(row => Preci
      .fromArr(row, banner.head, banner.tail)
      .map(matrixAbstract)
      .toList('..')
    )
    .toList(head.map(_ => '..'));
  (!!crosTab.title ? crosTab.title : '') |> head.unshift
  zip(sideTaken, rows, (side, row) => side |> row.unshift)
  return { head, rows }
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
  const pads = ([head, ...rows] |> transpose).map(VecX.maxLength)
  const [bannerLine, blankLine, matrixLines] = [
    head.map((x, i) => x.padStart(pads[i])),
    pads.map(l => '-'.repeat(l)),
    rows.map((row) => VecX.padStarts(row, pads))
  ]
  return [
    bannerLine.join(' | '),
    blankLine.join('-+-'),
    ...matrixLines.map(row => row.join(' | '))
  ].join('\r\n')
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
        pad: VecX.maxLength(col),
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
        ? StrX.toFullAngle(x).padStart(pad, cnSpace)
        : x.padStart(pad)
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