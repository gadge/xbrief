import { Ar, Mx } from 'veho'
import { cropMapMx, cropMx } from './utils/cropMx'
import { totx } from '../str'

export class PreX {
  constructor (mx, [top, bottom], [left, right], [height, width], [xDash, yDash]) {
    this.mx = mx
    this.tb = [top, bottom]
    this.lr = [left, right]
    this.hw = [height, width]
    this.dash = [xDash, yDash]
  }

  /**
   *
   * @param {*[][]} mx
   * @returns {PreX}
   */
  reboot (mx) {
    this.mx = mx
    return this
  }

  /**
   *
   * @param {*[][]} mx
   * @returns {PreX}
   */
  copy (mx) {
    return new PreX(mx, this.tb, this.lr, this.hw, this.dash)
  }

  get height () {
    return this.tb[0] + this.tb[1]
  }

  get width () {
    return this.lr[0] + this.lr[1]
  }

  xHeight (elCn) {
    return Math.min(this.hw[0], this.lr[0] + this.lr[1] + (this.dash[0] && elCn ? elCn : 0))
  }

  xWidth (elCn) {
    return Math.min(this.hw[1], this.lr[0] + this.lr[1] + (this.dash[1] && elCn ? elCn : 0))
  }

  get voidSize () {
    const [height, width] = this.hw
    return [height - this.height, width - this.width]
  }

  static fromMx (mx, [top, bottom], [left, right], size) {
    size = size || Mx.size(mx)
    const [height, width] = size
    let [xDash, yDash] = [true, true]
    if (!height || !width) [top, bottom, xDash, yDash] = [0, 0, false, false]
    if (!top || top >= height) [top, bottom, xDash] = [height, 0, false]
    if (!left || left >= width) [left, right, yDash] = [width, 0, false]
    const _mx = cropMx(mx, [top, bottom], [left, right], [height, width])
    return new PreX(_mx, [top, bottom], [left, right], [height, width], [xDash, yDash])
  }

  map (fn, mutate = true) {
    return mutate
      ? this.reboot(cropMapMx(this.mx, fn, this.tb, this.lr, this.hw))
      : this.copy(cropMapMx(this.mx, fn, this.tb, this.lr, this.hw))
    // return mutate
    //   ? this.reboot(this.mx.map((r, i) => r.map((x, j) => fn(x, i, j))))
    //   : this.copy(this.mx.map((r, i) => r.map((x, j) => fn(x, i, j))))
  }

  toMx (el) {
    const {
        mx,
        tb: [top], lr: [left],
        dash: [xDash, yDash], voidSize: [dx, dy]
      } = this,
      _mx = Mx.copy(mx)
    xDash && el
      ? _mx.splice(top, dx, Ar.ini(this.xWidth(1), el))
      : _mx.splice(top, dx)
    if (yDash && el) {
      for (let row of _mx) row.splice(left, dy, el)
    } else {
      for (let row of _mx) row.splice(left, dy)
    }
    return _mx
  }

  stringify (abstract, mutate = true) {
    const brief = abstract ? (_ => String(abstract(_))) : totx
    return this.map(brief, mutate)
  }
}
