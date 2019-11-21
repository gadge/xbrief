import { Chrono } from 'elprimero'
import { decoStable } from './src/deco.stable/deco.stable'
import { decoClassic } from './src/deco.classic/deco.classic'
import { superlativeTrees } from '../../asset/superlativTrees.json'
import { Mx, Ob } from 'veho'
import { deco } from '../../../src/deco/deco'

export class DecoStrategies {
  static test () {
    const paramsList = {
      boolean: true,
      string: 'Shakespeare',
      number: 128,
      null: null,
      undefined: undefined,
      simple_array: [1, 2, 3, 4, 5],
      empty_matrix: [[]],
      one_row_matrix: [[1, 2, 3, 4, 5]],
      simple_set: new Set([1, 1, 1, 2, 2, 3, 3, 3]),
      simple_matrix: Mx.ini(3, 12, (x, y) => x + y + 1),
      simple_map: new Map([['Lagos', 861], ['Dhaka', 8906], ['Lima', 9174], ['Ankara', 5271], ['Nagpur', 2405]]),
      superlativeTrees_map: superlativeTrees,
      simple_lambda: (x) => `${x}`,
      json: {
        foo: [1, 2, 3],
        bar: {
          kha: [1, 2, 3],
          mia: [[1, 2, 3]]
        },
        shake: [[[0, 1], [1, 0]]]
      }
    }
    const funcList = {
      classic: decoClassic,
      stable: decoStable,
      dev: o => deco(o, 8, 1),
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+3,
      paramsList: Ob.map(paramsList, ([k, v]) => [k, [v]]),
      funcList
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log

    const fn = 'dev';
    `result of ${fn}` |> console.log
    for (let key of Object.keys(paramsList)) {
      key |> console.log
      result.queryCell(key, fn) |> console.log
      '' |> console.log
    }
  }
}

// describe('Deco Strategies', function () {
//   this.timeout(1000 * 60)
//   it('Deco Strategies: test ', () => {
//     DecoStrategies.test()
//   })
// })
