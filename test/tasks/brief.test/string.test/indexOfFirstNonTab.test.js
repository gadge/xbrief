import { Chrono } from 'elprimero'

const _isTab = (c) => c === '\t' || c === ' '
const indexOfFirstNonTab_classic = tx => {
  let i = 0
  while (tx.startsWith('\t', i) || tx.startsWith(' ', i)) i++
  return i
}

const indexOfFirstNonTab_1 = tx => {
  let i = -1
  while (_isTab(tx[++i])) {}
  return i
}

const indexOfFirstNonTab_2 = tx => {
  let i = 0 //, c = tx.charAt(i)
  while (_isTab(tx[i])) i++ //c = tx.charAt(++i)
  return i
}

const indexOfFIrstNonTab_3 = tx => {
  let i = 0
  for (let { length } = tx; i < length; i++) if (!_isTab(tx.charAt(i))) return i
  return i
}

class IndexOfFirstNonTabTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+6,
      paramsList: {
        space: ['  Hemingway'],
        tab: ['\tFitzgerald'],
        mixed: [' \t かわばた やすなり'],
        every: [' \t\t '],
        none: ['Higashino Keigo'],
        empty: ['']
      },
      funcList: {
        classic: indexOfFirstNonTab_classic,
        dev_1: indexOfFirstNonTab_1,
        dev_2: indexOfFirstNonTab_2,
        dev_3: indexOfFIrstNonTab_3
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log

  }
}

describe('Index Of First Non Tab Test', function () {
  this.timeout(1000 * 60)
  it('Index Of First Non Tab Test: test ', () => {
    IndexOfFirstNonTabTest.test()
  })
})