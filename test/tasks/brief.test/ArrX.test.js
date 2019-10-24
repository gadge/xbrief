import { Chrono } from 'elprimero'
import { superlativeTrees } from '../../asset/superlativTrees.json'
import { ArrX } from '../../../src/brief/ArrX'
import { CrosTabX } from '../../../src/brief/CrosTabX'

export class ArrXTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+4,
      paramsList: {
        arithmetic: [[1, 2, 3, 4, 5, 6, 7, 8]],
        empty: [],
        singleElementArray: [[1]],
        textNum: [['032', '064', '128', '256', '512']],
        misc: [[null, undefined, NaN, 'Infinity','+',1.2E+1, 1.2E+2, 1.2E+3, 1.2E+4]]
      },
      funcList: {
        stable: ArrX.hBrief,
      }
    })
    'lapse' |> console.log
    lapse |> (_ => CrosTabX.brief(_, { ansi: true })) |> console.log
    '' |> console.log
    'result' |> console.log
    result |> (_ => CrosTabX.brief(_, { ansi: true })) |> console.log
  }
}