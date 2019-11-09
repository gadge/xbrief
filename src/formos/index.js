import { FinFm } from './FinFm'
import { MagFm } from './MagFm'
import { RatioFm } from './RatioFm'

const toPercent = (num, dg = 0) => (num * 100).toFixed(dg) + '%'

export {
  FinFm,
  MagFm,
  RatioFm,
  toPercent
}

// '123456789.01234'.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, '_')
