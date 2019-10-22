import { toraja } from 'funfact'
import { Table, TabX } from 'crostab'
import { ArrX } from '../../../src/brief/ArrX'

export class VecXHeadTailTest {
  static test () {
    const { head: banner, rows: matrix } = toraja.NYTimes
    const keyWord = 'China'
    const table = Table.from({ banner, matrix }).filter([{
      column: 'geo_facet',
      crit: array => array.includes('China')
    }, {
      column: 'org_facet',
      crit: array => array.includes('National Basketball Assn')
    }]);
    `Found ${table.ht} pieces of news concerning [${keyWord}]` |> console.log
    TabX.brief(table,
      // { matrix: { head: 10, tail: 3 } }
    ) |> console.log
    const arr = table.column('title')
    const paramsList = {
      hN_tN: { head: null, tail: null },
      h8_tN: { head: 8, tail: null },
      h9_tN: { head: 9, tail: null },
      h0_t4: { head: 0, tail: 4 },
      hN_t8: { head: null, tail: 8 },
      hN_t9: { head: null, tail: 9 },
      h3_t1: { head: 3, tail: 1 },
    }
    for (let [name, { head, tail }] of Object.entries(paramsList)) {
      name |> console.log
      ArrX.vBrief(arr, { head, tail }) |> console.log
      '' |> console.log
    }

  }
}

describe('VecXHeadTailTest', function () {
  it('Vec X Head Tail Test: test ', () => {
    VecXHeadTailTest.test()
  })
})