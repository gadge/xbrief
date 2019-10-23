import { Preci } from '../utils/Preci'
import { totx } from '../utils/str'
import { zip } from '../utils/algebra'
import { TableX } from './TableX'
import { greys, Pal, palette, Visual } from 'spettro'

/**
 * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
 * @param {?function(*):string} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
 * @return {{side:string[],banner:string[],matrix:string[][]}}
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
    banner = Preci
      .fromArr(crosTab.banner, _b.head, _b.tail)
      .map(_b.abstract || totx)
      .toList('..'),
    matrix = Preci
      .fromArr(crosTab.matrix, _s.head, _s.tail)
      .map(row => Preci
        .fromArr(row, _b.head, _b.tail)
        .map(abstract)
        .toList('..')
      )
      .toList(banner.map(_ => '..'))
  return { side, banner, matrix }
}

class CrosTabX {
  /**
   *
   * @param {{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
   * @param {?function(*):string} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [_s]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [_b]
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
      visual = {
        on: true,
        mark: {
          max: greys.grey.lighten_5,
          min: greys.grey.darken_1,
          na: palette.indigo.lighten_2
        },
        direct: 2
      },
      ansi = false,
      chinese = false
    } = {}) {
    let { side, banner, matrix } = _preci(crosTab, { abstract, side: _s, banner: _b })
    if (visual.on !== false) {
      ansi = true
      matrix = Visual.matrix(matrix, visual)
    }
    banner.unshift(crosTab.title || '')
    zip(side, matrix, (s, row) => row.unshift(s))
    return TableX.brief({ head: banner, rows: matrix }, { visual: { on: false }, ansi, chinese })
  }
}

export {
  CrosTabX
}