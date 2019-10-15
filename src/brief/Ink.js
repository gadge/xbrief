import { indexNaTab, rn, tabify, tx } from '../utils/str'

export const Xr = (label, ...items) => new Ink(label, ...items)

export class Ink {
  constructor (label, ...items) {
    label = (label || '')|> tx
    const i = label |> indexNaTab
    if (label.length) {
      if (!!i) {
        this.blocks = [label.substring(0, i)]
        this.list = [`${label.substring(0, i)}[${label.substring(i)}]`]
      } else {
        this.blocks = []
        this.list = [`[${label}]`]
      }
    } else {
      this.blocks = []
      this.list = []
    }

    if (items.length) this.list.push(`(${items.map(tx).join(',')})`)
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

  increaseIndent (block = '  ') {
    this.blocks.push(block)
    return this
  }

  decreaseIndent () {
    this.blocks.pop()
    return this
  }

  tag (key, ...items) {
    this.list.push(key |> tx |> tabify)
    if (items.length) this.list.push(`(${items.map(tx).join(',')})`)
    return this
  }

  line (key, ...items) {
    this.list.push(rn + ((this.tabs + key)|> tx |> tabify))
    if (items.length) this.list.push(`(${items.map(tx).join(',')})`)
    return this
  }

  p (...items) {
    if (items.length) this.list.push(...items.map(tx))
    return this
  }

  pline (...items) {
    const lines = [rn, ...items.map(item => this.tabs + tx(item) + rn)]
    if (items.length) this.list.push(...lines)
    return this
  }

  toString () {
    return this.list.join(' ')
  }

}

