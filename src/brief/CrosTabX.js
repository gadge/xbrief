import { Preci } from '../utils/Preci'
import { totx } from '../utils/str'
import { zip } from '../utils/algebra'
import { TableX } from './TableX'
import { greys, palette, Visual } from 'spettro'

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
      chinese = false
    } = {}) {
    const { head, rows } = _preci(crosTab, { abstract, side, banner })
    return TableX.brief({ head, rows }, { visual, ansi, chinese })
  }
}

export {
  CrosTabX
}