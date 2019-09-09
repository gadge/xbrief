class MagnitudeForm {
  constructor (fracDigit = 2, magniSep = 3) {
    this.fracDigit = fracDigit
    this.numRegex = new RegExp(
      `\\d(?=(\\d{${magniSep || 3}})+${fracDigit > 0 ? '\\.' : '$'})`, 'g')
  }

  format (num) {
    return num.toFixed(this.fracDigit).replace(this.numRegex, '$&,')
  }
}

class PercentForm {
  constructor (fracDigit = 0) {
    this.formos = new Intl.NumberFormat(undefined,
      { style: 'percent', minimumFractionDigits: fracDigit })
  }

  format (num) {
    return this.formos.format(num)
  }
}

class MoneyForm {
  constructor (region) {
    let config = MoneyForm.getCurrencyConfig(region)
    this.formos = new Intl.NumberFormat(config.locale, config.options)
  }

  format (num) {
    return this.formos.format(num)
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
        currency: MoneyForm.localeToCurrency.get(locale),
        currencyDisplay: 'symbol'
      }
    }
  }
}

function toPercent (num, fracDigit = 0) {
  return (num * 100).toFixed(fracDigit) + '%'
}

export {
  MoneyForm,
  PercentForm,
  MagnitudeForm,
  toPercent
}

// '123456789.01234'.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, '_')
