import nbaPlayers from 'funfact/dist/data/nba/players'
import { TabX } from '../../../src/brief/TabX'

class TabXTest {

  static test () {
    const { head, rows } = nbaPlayers
    'nbaPlayers' |> console.log
    '' |> console.log

    TabX.brief({ head, rows }, { matrix: { head: 10, tail: 2 }, banner: { head: 10, tail: 2 } }) |> console.log
    '' |> console.log

    const { side, banner, matrix } = {
      side: ['foo', 'bar', 'baz'],
      banner: ['Shake', 'Shack', 'Drake', 'Drack'],
      matrix: [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
    }
    TabX.briefCrosTab(
      { side, banner, matrix },
      {
        side: { head: 2, tail: 1 },
        banner: { head: 2, tail: 1 }
      }) |> console.log
  }
}

test('TabXTest test', () => {
  TabXTest.test()
})

export {
  TabXTest
}