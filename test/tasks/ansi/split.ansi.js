import isAnsi from 'ansi-regex'
import { Xr } from '../../../src'

// Removes the `g` flag
const regex = new RegExp(isAnsi())

const splitAnsi = str => {
  const parts = str.match(regex)
  if (!parts) return [str]
  const arr = []
  let p = 0
  const { length } = parts
  for (let i = 0, off = 0; i < length; i++) {
    off = str.indexOf(parts[i], off)
    if (off === -1) throw new Error('Could not split string')
    if (p !== off) arr.push(str.slice(p, off))
    if (p === off && arr.length) {
      arr[arr.length - 1] += parts[i]
    } else {
      if (off === 0) arr.push('')
      arr.push(parts[i])
    }
    p = off + parts[i].length
    Xr().tag('off', off).tag('p', p).tx |> console.log
  }
  arr.push(str.slice(p))
  return arr
}

class SplitAnsiTest {
  static test () {
    const index = ['_123456789_123456789_12345678']
    const texts = ['\u001b[38;5;152m落雁\u001b[39m']
    for (let text of texts) {
      // Xr(text).tag(splitAnsi(text)).tx |> console.log
      splitAnsi(text) |> console.log
      text.match(regex) |> console.log
    }
  }
}

describe('Split Ansi Test', function () {
  this.timeout(1000 * 60)
  it('Split Ansi Test: test ', () => {
    SplitAnsiTest.test()
  })
})