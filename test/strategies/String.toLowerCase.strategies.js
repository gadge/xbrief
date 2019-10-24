import { Chrono } from 'elprimero'

const charCodeToLower = n => {
  return n > 64 ? n ^ 0x20 : n
}

class StringToLowerCaseStrategies {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+6,
      paramsList: {
        Shakespeare: ['Shakespeare'],
        Number: ['Array'],
        A: ['A'],
        'null': ['null']
      },
      funcList: {
        bench: x => x,
        stable: x => x.toLowerCase(),
        edge: x => x.substring(0,3).toLowerCase(),
        dev: x => String.fromCharCode(charCodeToLower(x.charCodeAt(0))) + x[1] + x[2]
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log

  }
}

describe('String To Lower Case Strategies', function () {
  this.timeout(1000 * 60)
  it('String To Lower Case Strategies: test', () => {
    StringToLowerCaseStrategies.test()
  })
})