import { totx } from '../../../../src'

export class PreciDev {
  constructor (ar, head, tail, dash) {
    this.ar = ar
    this.head = head
    this.tail = tail
    this.dash = dash
  }

  reboot (ar) {
    this.ar = ar
    return this
  }

  copy (ar) {
    return new PreciDev(ar, this.head, this.tail, this.dash)
  }

  static fromArr (ar, head, tail) {
    let dash = true
    if (!ar || !ar.length) [head, tail, dash] = [0, 0, false]
    const length = ar.length
    if (!head || head >= length) [head, tail, dash] = [length, 0, false]
    // if (!tail || tail >= length) [head, tail, dash] = [head, 0, true]
    // if (head + tail >= length) [head, tail, dash] = [head, -1, true]
    const ht = ar?.length, _ar = Array(ht)
    for (let i = 0; i < head; i++) _ar[i] = ar[i]
    for (let i = ht - tail; i < ht; i++) _ar[i] = ar[i]
    return new PreciDev(_ar, head, tail, dash)
  }

  map (fn, mutate = false) {
    return mutate
      ? this.reboot(this.ar.map(fn))
      : this.copy(this.ar.map(fn))
  }

  toList (el) {
    const
      { ar, head, tail } = this,
      ht = ar.length,
      df = ht - (head + tail),
      _ar = ar.slice()
    this.dash && el
      ? _ar.splice(head, df, el)
      : _ar.splice(head, df)
    return _ar
  }

  /**
   *
   * @param {function} abstract
   * @param {boolean} [mutate]
   * @return {PreciStable}
   */
  stringify (abstract, mutate = true) {
    const brief = abstract ? (_ => String(abstract(_))) : totx
    return this.map(brief, mutate)
  }
}
