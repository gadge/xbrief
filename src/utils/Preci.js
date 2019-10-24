import { totx } from './str'

export class Preci {
  /**
   *
   * @param {*[]|null} head
   * @param {*[]|null} tail
   * @param {boolean|null}  dash
   */
  constructor (head, tail, dash = true) {
    this.head = head
    this.tail = tail
    this.dash = dash
  }

  /**
   *
   * @param {*[]} arr
   * @param {number} head
   * @param {number} tail
   * @return {Preci}
   */
  static fromArr (arr, head, tail) {
    if (!arr) return new Preci(null, null, false)
    const { length } = arr
    switch (true) {
      case !length :
        return new Preci(null, null, false)
      case !head || head >= length :
        return new Preci(arr.slice(), null, false)
      case !tail || tail >= length :
        return new Preci(arr.slice(0, head), null, true)
      case head + tail < length :
        return new Preci(arr.slice(0, head), arr.slice(-tail), true)
      default:
        return new Preci(arr.slice(0, head), arr.slice(-1), true)
    }
  }

  /**
   *
   * @param {*} [el] - the element to be inserted between head and tail
   * @return {*[]}
   */
  toList (el) {
    // let arr = []
    // if (this.head) arr = arr.concat(this.head)
    // if (this.dash && !!el) arr.push(el)
    // if (this.tail) arr.push(...this.tail)
    return [].concat(
      this.head ? this.head : [],
      this.dash && el ? [el] : [],
      this.tail ? this.tail : []
    )
  }

  jectHead (fn) {
    if (!fn || !this.head) return this
    this.head = fn(this.head)
    return this
  }

  jectTail (fn) {
    if (!fn || !this.tail) return this
    this.tail = fn(this.tail)
    return this
  }

  ject (fn, tailFn = undefined) {
    return this.jectHead(fn).jectTail(tailFn || fn)
  }

  /**
   *
   * @param {?function} fn
   * @param {?function} [tailFn]
   * @return {Preci}
   */
  map (fn, tailFn) {
    if (!fn) return this
    const
      head = this.head ? this.head.map(fn) : this.head,
      tail = this.tail ? this.tail.map(tailFn || fn) : this.tail
    return new Preci(head, tail, this.dash)
  }

  stringify () {
    return this.map(totx)
  }
}