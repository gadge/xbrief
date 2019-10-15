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
    if (!length) return new Preci(null, null, false)
    let [h, t, d] = !head || (head >= length)
      ? !tail || (tail >= length)
        ? [arr.slice(), null, false]
        : [null, arr.slice(-tail), true]
      : !tail || (tail >= length)
        ? [arr.slice(0, head), null, true]
        : ((head + tail) < length)
          ? [arr.slice(0, head), arr.slice(-tail), true]
          : [arr.slice(0, head), arr.slice(-1), true]
    return new Preci(h, t, d)
  }

  /**
   *
   * @param {*}element
   * @return {*[]}
   */
  toList (element = undefined) {
    const arr = []
    if (!!this.head) arr.push(...this.head)
    if (this.dash && !!element) arr.push(element)
    if (!!this.tail) arr.push(...this.tail)
    return arr
  }

  jectHead (ject) {
    if (!ject || !this.head) return this
    this.head = ject(this.head)
    return this
  }

  jectTail (ject) {
    if (!ject || !this.tail) return this
    this.tail = ject(this.tail)
    return this
  }

  ject (ject, jectTail = undefined) {
    jectTail = jectTail || ject
    return this.jectHead(ject).jectTail(jectTail)
  }

  /**
   *
   * @param {?function} abstract
   * @param {?function} [abstractTail]
   * @return {Preci}
   */
  map (abstract, abstractTail) {
    if (!abstract) return this
    abstractTail = abstractTail || abstract
    const
      head = !!this.head ? this.head.map(abstract) : this.head,
      tail = !!this.tail ? this.tail.map(abstractTail) : this.tail
    return new Preci(head, tail, this.dash)
  }

  stringify () {
    return this.map(x => `${x}`)
  }
}