import { EntX } from '../../../src/brief/EntX'
import { Chrono } from 'elprimero'

export class EntXTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0,
      paramsList: {
        simple: [[['Lagos', 861], ['Dhaka', 8906], ['Lima', 9174], ['Ankara', 5271], ['Nagpur', 2405]]]
      },
      funcList: {
        stable: EntX.vBrief,
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    // result.brief() |> console.log
    result.queryCell('simple', 'stable') |> console.log
  }
}
