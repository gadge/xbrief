import chalk from 'chalk'
import { greys, palette } from 'spettro'

const _hex = chalk.hex.bind(chalk)
/**
 *
 * @type {{str: Chalk, brc: Chalk, udf: Chalk, num: Chalk, brk: Chalk, idx: Chalk}}
 */
export const Pal = {
  idx: _hex(greys.brown.lighten_4),
  str: _hex(palette.lightGreen.accent_2),
  num: _hex(palette.deepOrange.accent_2),
  udf: _hex(palette.deepPurple.accent_2),
  brk: _hex(palette.blue.accent_2),
  brc: _hex(palette.amber.base),
  fnc: _hex(palette.green.accent_4),
}

const
  brkL = Pal.brk('[ '), brkR = Pal.brk(' ]'),
  brcL = Pal.brc('{ '), brcR = Pal.brc(' }')

export const bracket = content => brkL + content + brkR
export const brace = content => brcL + content + brcR
