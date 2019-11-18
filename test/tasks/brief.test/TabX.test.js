import nbaPlayers from 'funfact/dist/data/nba/players'
import { CrosTabX, MagFm, TableX} from '../../../src'
import { Chrono } from 'elprimero'

class TabXTest {

  static testSimpleCrosTab () {
    // const { head, rows } = nbaPlayers
    // 'nbaPlayers' |> console.log
    // '' |> console.log
    //
    // TableX.brief(
    //   { head, rows },
    //   {
    //     rows: {
    //       head: 10, tail: 2
    //     },
    //     head: {
    //       head: 10, tail: 2
    //     },
    //     ansi: true,
    //   }) |> console.log
    // '' |> console.log

    let { side, banner, matrix } = {
      side: ['foo', 'bar', 'baz'],
      banner: ['Shake', 'Shack', '院线', 'Drack'],
      matrix: [[1, '二', 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
    }
    'CrosTab' |> console.log
    const mag = new MagFm(2, 3)
    CrosTabX.brief(
      { side, banner, matrix },
      {
        abstract: x => mag.form(x),
        side: { head: 2, tail: 1 },
        banner: { head: 3, tail: 1 },
        ansi: true,
        chinese: true
      }) |> console.log
    '' |> console.log
  }

  static testSimpleTable () {
    const paramsList = {
      empty: [{
        banner: ['foo', 'bar'],
        matrix: [[]]
      }],
      simple: [{
        banner: ['Shake', 'Shack', 'Drake', 'Drack'],
        matrix: [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [5, 6, 7, 8]]
      }],
    }
    const funcList = {
      stable: _ => TableX.brief(_, {
        head: { head: 2, tail: undefined },
        rows: { head: 2, tail: undefined },
      }),
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0,
      paramsList,
      funcList
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
  }

  static testSimpleChineseTable () {
    let { banner, matrix } = {
      banner: ['Shake', '词缀', 'Drake', 'Drack'],
      matrix: [['沉鱼', 2, 3, 4], [2, '落雁', 4, 5], [3, 4, '闭月', 6], [5, 6, 7, '羞花']]
    }
    // matrix = matrix.map(row => row.map(x => chalk.hex(palette.orange.base)(x)))

    TableX.brief(
      { banner, matrix },
      {
        head: { head: 2, tail: 1 },
        rows: { head: 2, tail: 1 },
        chinese: true
      }) |> console.log

  }
}

// describe('Tab X Test', function () {
//   this.timeout(1000 * 60)
//   it('Tab X Test: test Simple Cros Tab ', () => {
//     TabXTest.testSimpleCrosTab()
//   })
// })

export {
  TabXTest
}
