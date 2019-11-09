import stringLength from 'string-length'
import { numPad } from './str'
import { Ar } from 'veho'

export const mapAr = Ar.map

/**
 *
 * @param {Array<?string>} arr
 * @param ansi
 */
export function maxLen (arr, ansi = false) {
  return ansi
    ? Math.max(...arr.map(x => !!x ? stringLength(x) : 0))
    : Math.max(...arr.map(x => !!x ? x.length : 0))
}

/**
 *
 * @param {string[]} words
 * @param {*[]} raws
 * @param {Chalk[]} pals
 * @param {number[]|number} pads
 * @param {boolean=false} [ansi]
 * @param {number} len
 * @return {string[]}
 */
export function vecPalPad (words, raws, pals, pads, ansi, len) {
  return mapAr(words, (tx, i) => numPad(tx, raws[i], pads[i], ansi) |> pals[i], len)
}

/**
 *
 * @param {string[]} words
 * @param {*[]} raws
 * @param {number[]} [pads]
 * @param {boolean=false} [ansi]
 * @param {number} len
 * @return {string[]}
 */
export function vecPad (words, raws, pads, ansi, len) {
  return mapAr(words, (tx, i) => numPad(tx, raws[i], pads[i], ansi), len)
}


