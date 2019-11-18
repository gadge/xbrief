import { Chrono } from 'elprimero'

export class FunctionToStringStrategies {
  static test () {
    const fn = () => {}
    fn |> console.log
    '' + fn |> console.log
    fn.toString() |> console.log
    String(fn) |> console.log

    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [() => {}],
        // misc: [],
      },
      funcList: {
        classic: x => x,
        stable: x => String(x),
        beta: x => x.toString(),
        dev: x => '' + x,
        edge: x => `${x}`
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Function To String Strategies', function () {
  this.timeout(1000 * 60)
  it('Function To String Strategies: test ', () => {
    FunctionToStringStrategies.test()
  })
})
