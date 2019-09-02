import { VecX, Typ } from '../../../src/index'

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
    const type_results = candidates.map(
      it => [!!it ? it.toString() : it, Typ.inferObject(it)]
    )
    VecX.vBrief(type_results).wL()
  }

}

export {
  TypTest
}