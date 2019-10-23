import { CrosTab, CrosX } from 'crostab'
import chalk from 'chalk'
import { palette } from 'spettro'
import { Mx } from 'veho'
import {StrX} from '../../src'

const repl = x => x.replace('light ', 'l.').replace('deep ', 'd.')
const { jv2py: sep } = StrX

export class PaletteCrosTabTest {
  static test () {
    const crosTab = CrosTab.from({
      side: Object
        .keys(palette.red),
      banner: Object
        .entries(palette)
        .map(([name, { base }]) => name |> sep |>repl |> chalk.hex(base)),
      matrix: Object
        .values(palette)
        .map(tube => Object
          .values(tube)
          .map(x => x.toUpperCase() |> chalk.hex(x).inverse)
        )
        |> Mx.transpose
    })
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

// it('Palette Cros Tab Test: test', () => {
//   PaletteCrosTabTest.test()
// })