import { isNumeric } from '../utils/isNumeric'

export class RatioFm {
  constructor (digit = 0) {
    this.fm = new Intl.NumberFormat(undefined,
      { style: 'percent', minimumFractionDigits: digit })
  }

  form (any) {
    return isNumeric(any) ? this.fm.format(any) : String(any)
  }

  format (num) {
    return this.fm.format(num)
  }
}
