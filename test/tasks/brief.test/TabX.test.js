import nbaPlayers from 'funfact/dist/data/nba/players'
import { CrosTabX, TabX } from '../../../src'
import chalk from 'chalk'
import { palette } from 'spettro'

class TabXTest {

  static test () {
    const { head, rows } = nbaPlayers
    'nbaPlayers' |> console.log
    '' |> console.log

    TabX.brief(
      { head, rows },
      {
        matrix: {
          head: 10, tail: 2
        },
        banner: {
          head: 10, tail: 2
        }
      }) |> console.log
    '' |> console.log

    let { side, banner, matrix } = {
      side: ['foo', 'bar', 'baz'],
      banner: ['Shake', 'Shack', 'Drake', 'Drack'],
      matrix: [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
    }
    matrix = matrix.map(row => row.map(x => chalk.hex(palette.orange.base)(x)))
    CrosTabX.brief(
      { side, banner, matrix },
      {
        side: { head: 2, tail: 1 },
        banner: { head: 3, tail: 1 }
      }) |> console.log
  }

  static testSimpleTable () {
    let { banner, matrix } = {
      banner: ['Shake', 'Shack', 'Drake', 'Drack'],
      matrix: [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [5, 6, 7, 8]]
    }
    matrix = matrix.map(row => row.map(x => chalk.hex(palette.orange.base)(x)))
    TabX.brief(
      { banner, matrix },
      {
        banner: { head: 2, tail: 1 },
        matrix: { head: 2, tail: 1 }
      }) |> console.log

  }
}

it('TabXTest test', () => {
  TabXTest.testSimpleTable()
})

export {
  TabXTest
}