import { isNumeric } from '../utils/isNumeric'

export class FinFm {
  constructor (region) {
    let config = FinFm.getCurrencyConfig(region)
    this.fm = new Intl.NumberFormat(config.locale, config.options)
  }

  form (any) {
    return isNumeric(any) ? this.fm.format(any) : String(any)
  }

  format (num) {
    return this.fm.format(num)
  }

  static get localeToCurrency () {
    return new Map([
      ['en-US', 'USD'],
      ['en-GB', 'GBP'],
      ['de-DE', 'EUR'],
      ['es-ES', 'EUR'],
      ['en-IN', 'INR'],
      ['zh-CN', 'CNY'],
      ['ja-JP', 'JPY'],
      ['ru-RU', 'RUB']
    ])
  }

  static getCurrencyConfig (locale) {
    // currencyDisplay: "symbol"}};//'symbol','code','name'
    return {
      locale: locale,
      options: {
        style: 'currency',
        currency: FinFm.localeToCurrency.get(locale),
        currencyDisplay: 'symbol'
      }
    }
  }
}
