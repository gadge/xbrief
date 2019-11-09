import { boxoffice } from '../../asset/boxoffice.190227.json.rows'
import { MatX } from '../../../src'
import { Chrono } from 'elprimero'
import { greys, palette } from 'spettro'

const paramsList = {
  empty_matrix: [[[]]],
  one_row_matrix: [[[1, 2, 3, 4, 5]]],
  // one_col_matrix: [[[1], [2], [3], [4], [5]]],
  matrix_lack: [[
    [, 3, 4,],
    [2, , 4,],
    [2, 3, ,],
  ]],
  simpleMatrix: [[
    [5, 2, 0, 1],
    [3, 3, 2, 5],
    [0, 1, 11, 7],
    [6, 4, 4, 0]
  ]],
  boxOffice: [boxoffice.map(row => Object.values(row).slice(0, 5))]
}

export class MatXTest {
  static xTest () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0,
      paramsList,
      funcList: {
        stable: (_ => MatX.xBrief(_, {
          // abstract: (x) => StrX.py2jv(`${x}`),
          rows: {
            head: 3,
            tail: 2
          },
          columns: {
            head: 2,
            tail: 1
          },
          visual: {
            on: true,
            mark: {
              max: palette.lightGreen.accent_3,
              min: palette.orange.accent_2,
              na: greys.blueGrey.lighten_3,
            },
            direct: 2
          }
        }))
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    for (let key of Object.keys(paramsList)) {
      key |> console.log
      result.queryCell(key, 'stable') |> console.log
      '' |> console.log
    }
    // result.brief() |> console.log
  }
}
