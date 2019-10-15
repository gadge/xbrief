import { Preci } from '../utils/Preci'
import { tx } from '../utils/str'
import { zip } from '../utils/algebra'
import { TabX } from './TabX'

/**
 * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
 * @param {[function(*):string]} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [matrix]
 * @return {{head:string[],rows:string[][]}}
 */
function _preci (crosTab, {
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
    .map(!!side.abstract ? side.abstract : tx)
    .toList('..')
  const head = Preci
    .fromArr(crosTab.banner, banner.head, banner.tail)
    .map(!!banner.abstract ? banner.abstract : tx)
    .toList('..')
  const matrixAbstract = !!abstract ? abstract : tx
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

class CrosTabX {
  /**
   *
   * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
   * @param {[function(*):string]} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
   * @param {boolean} [chinese=false]
   * @return {string}
   */
  static brief (crosTab, {
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
    const { head, rows } = _preci(crosTab, { abstract, side, banner })
    return TabX.brief({ head, rows }, { chinese })
  }
}

export {
  CrosTabX
}