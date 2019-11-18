import { indexNaTab, rn, tabify, totx } from '../utils/str'

export const Xr = (label, ...items) => new Ink(label, ...items)

export class Ink {
  constructor (label, ...items) {
    label = (label || '')|> totx
    const i = label |> indexNaTab
    if (!!i) {
      const block = label.substring(0, i)
      this.blocks = [block]
      this.list = [block + (i < label.length ? `[${label.substring(i)}]` : '')]
    } else {
      this.blocks = []
      this.list = label.length ? [`[${label}]`] : []
    }
    if (items.length) this.list.push(`(${items.map(totx).join(',')})`)
  }

  get indent () {
    return this.blocks.length
  }

  get tabs () {
    return this.blocks.join('')
  }

  get tx () {
    return this.toString()
  }

  get say () {
    return this.toString()
  }

  increaseIndent (block = '  ') {
    this.blocks.push(block)
    return this
  }

  decreaseIndent () {
    this.blocks.pop()
    return this
  }

  tag (key, ...items) {
    this.list.push(key |> totx |> tabify)
    if (items.length) this.list.push(`(${items.map(totx).join(',')})`)
    return this
  }

  line (key, ...items) {
    this.list.push(rn + ((this.tabs + totx(key)) |> tabify))
    if (items.length) this.list.push(`(${items.map(totx).join(',')})`)
    return this
  }

  br (...items) {
    if (items.length) this.list.push(items.map(x => `(${x})`).join(','))
    return this
  }

  p (...items) {
    if (items.length) this.list.push(...items.map(totx))
    return this
  }

  pline (...items) {
    const lines = [rn, ...items.map(item => this.tabs + totx(item) + rn)]
    if (items.length) this.list.push(...lines)
    return this
  }

  toString () {
    return this.list.join(' ')
  }

  static log (msg) {
    console.log(msg)
    console.log('')
  }

}

