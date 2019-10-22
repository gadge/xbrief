import { Preci } from '../utils/Preci'
import { totx } from '../utils/str'
import { zip } from '../utils/algebra'
import { TableX } from './TableX'

/**
 * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
 * @param {?function(*):string} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @return {{head:string[],rows:string[][]}}
 */
function _preci (crosTab,
  {
    abstract,
    side: _s = {
      abstract,
      head: 0,
      tail: 0
    },
    banner: _b = {
      abstract,
      head: 0,
      tail: 0
    },
  } = {}
) {
  abstract = abstract || totx
  const
    side = Preci
      .fromArr(crosTab.side, _s.head, _s.tail)
      .map(_s.abstract || totx)
      .toList('..'),
    head = Preci
      .fromArr(crosTab.banner, _b.head, _b.tail)
      .map(_b.abstract || totx)
      .toList('..'),
    rows = Preci
      .fromArr(crosTab.matrix, _s.head, _s.tail)
      .map(row => Preci
        .fromArr(row, _b.head, _b.tail)
        .map(abstract)
        .toList('..')
      )
      .toList(head.map(_ => '..'))
  head.unshift(crosTab.title || '')
  zip(side, rows, (s, row) => row.unshift(s))
  return { head, rows }
}

class CrosTabX {
  /**
   *
   * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
   * @param {?function(*):string} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
   * @param {boolean} [ansi=false]
   * @param {boolean} [chinese=false]
   * @return {string}
   */
  static brief (crosTab,
    {
      abstract,
      side = {
        abstract,
        head: 0,
        tail: 0
      },
      banner = {
        abstract,
        head: 0,
        tail: 0
      },
      ansi = false,
      chinese = false
    } = {}) {
    const { head, rows } = _preci(crosTab, { abstract, side, banner })
    return TableX.brief({ head, rows }, { chinese, ansi })
  }
}

export {
  CrosTabX
}