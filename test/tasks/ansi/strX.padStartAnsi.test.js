import * as chalk from 'chalk'
import stringLength from 'string-length'
import { ArrX } from '../../../src/brief/ArrX'
import { StrX } from '../../../src/brief/StrX'

describe('Test padStart concerning Ansi', function () {
  it('pad Start Ansi: test', () => {
    String.prototype.tag = function (val) {
      return StrX.tag(this, val)
    }
    const { log } = console
    const candidates = {
      style_normal: (chalk.blue('Hello') + ' World' + chalk.red('!')),
      chainable: (chalk.blue.bgRed.bold('Hello world!')),
      multiple_arg: (chalk.blue('Hello', 'World!', 'Foo', 'bar')),
      nest_style: (chalk.red('Hello', chalk.underline.bgBlue('world') + '!')),
      nest_even: (chalk.green(`A green ${chalk.blue.underline.bold('Shakespare')} emerged.`))
    }
    const maxLen = ArrX.maxLen(Object.values(candidates))
    'maxLen'.tag(maxLen) |> console.log
    '' |> console.log
    for (let [name, text] of Object.entries(candidates)) {
      name.tag(text).tag(stringLength(text)).tag(text.length) |> console.log
    }
    '' |> console.log
    'Padded by maxLen' |> console.log
    const nameLen = ArrX.maxLen(Object.keys(candidates))
    for (let [name, text] of Object.entries(candidates)) {
      name.padStart(nameLen).tag(text.padStart(text.length + maxLen - stringLength(text))) |> console.log
    }
  })
})
