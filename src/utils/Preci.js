export class Preci {
  /**
   *
   * @param {*[]|null} head
   * @param {*[]|null} tail
   */
  constructor (head, tail) {
    this.head = head
    this.tail = tail
  }

  /**
   *
   * @param {*[]} arr
   * @param {number} head
   * @param {number} tail
   * @return {Preci}
   */
  static fromArr (arr, head, tail) {
    // let [h, tailCount] = Array.isArray(arr) && !!arr.length
    //   ? head > 0 && tail > 0 && (head + tail < arr.length)
    //     ? [arr.slice(0, head), arr.slice(-tail)]
    //     : [arr, null]
    //   : [null, null]
    let [h, t] = !!arr && !!arr.length
      ? !!head && head > 0 && head <= arr.length
        ? !!tail && tail > 0 && tail <= arr.length
          ? [arr.slice(0, head), arr.slice(-tail)]
          : [arr.slice(0, head), null]
        : !!tail && tail > 0 && tail <= arr.length
          ? [null, arr.slice(-tail)]
          : [arr, null]
      : [null, null]
    return new Preci(h, t)
  }

  /**
   *
   * @param {*}element
   * @return {*[]}
   */
  toList (element = undefined) {
    return !!this.head
      ? !!this.tail
        ? !!element
          ? [...this.head, element, ...this.tail]
          : [...this.head, ...this.tail]
        : [...this.head]
      : !!this.tail
        ? [...this.tail]
        : []
  }

  /**
   *
   * @param {*[]}elements
   * @return {*[]}
   */
  fillSomeToList (elements) {
    return !!this.head
      ? !!this.tail
        ? [...this.head, ...elements, ...this.tail]
        : [...this.head]
      : !!this.tail
        ? [...this.tail]
        : []
  }

  jectHead (ject) {
    this.head = !!this.head && !!ject
      ? ject(this.head)
      : this.head
    return this
  }

  jectTail (ject) {
    this.tail = !!this.tail && !!ject
      ? ject(this.tail)
      : this.tail
    return this
  }

  ject (ject, jectTail = undefined) {
    return this.jectHead(ject).jectTail(!!jectTail ? jectTail : ject)
  }

  /**
   *
   * @param {?function} abstract
   * @param {?function} [abstractTail]
   * @return {Preci}
   */
  map (abstract, abstractTail) {
    const head = !!this.head && !!abstract
      ? this.head.map(abstract)
      : this.head
    const tail = !!this.tail
      ? !!abstractTail
        ? this.tail.map(abstractTail)
        : !!abstract
          ? this.tail.map(abstract)
          : this.tail
      : this.tail
    return new Preci(head, tail)
  }

  // vehoCol (abstract) {
  //   const list = this.toList()
  //   const columnIndexes = [...list[0].keys()]
  //   const cols = columnIndexes.
  // }

  stringify () {
    return this.map(x => `${x}`)
  }
}