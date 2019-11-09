import { superlativeTrees } from '../../asset/superlativTrees.json'
import { CrosTabX, MagFm, MapX } from '../../../src/index'
import { Chrono } from 'elprimero'

class MapXTest {
  static vTest () {
    const paramsList = {
      populations: [new Map([
        ['Lagos', 861],
        ['Dhaka', 8906],
        ['Lima', 9174],
        ['Ankara', 5271],
        ['Nagpur', 2405],
        ['Isfahan', 2101]
      ])],
      superlativeTrees: [new Map(
        Object.entries(superlativeTrees)
      )]
    }
    const MF = new MagFm(2, 3)
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+4,
      paramsList,
      funcList: {
        stable: MapX.vBrief,
        dev: (_ => MapX.vBrief(_, {
            showIndex: true,
            // abstract: x => `"${x}"`,
            abstract: x => MF.form(x),
            // visual: false,
            head: 0,
            tail: 5
          }
        )),
      }
    })
    'lapse' |> console.log
    lapse |> (_ => CrosTabX.brief(_, { ansi: true })) |> console.log
    '' |> console.log
    'result' |> console.log
    // result |> (_ => CrosTabX.brief(_, { ansi: true })) |> console.log
    for (let key of Object.keys(paramsList)) {
      key |> console.log
      result.queryCell(key, 'dev') |> console.log
      '' |> console.log
    }
  }
}

export {
  MapXTest
}
