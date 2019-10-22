import { Typ } from '../../../src/index'
import { MapX } from '../../../src/brief/MpX'

class TypTest {
  static simpleTest () {
    const candidates = [
      20,
      5.5,
      true,
      undefined,
      null,
      'Shakes',
      [''],
      new Map([[1, 1], [2, 2]]),
      new Set(['']),
      { 'foo': 'bar' },
    ]
    const results = new Map(candidates.map(
      it => [it, Typ.infer(it)]
    ))
    MapX.vBrief(results).wL()
  }

}

test('TypTest simpleTest', () => {
  TypTest.simpleTest()
})

export {
  TypTest
}