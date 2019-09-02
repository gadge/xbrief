import { superlativeTrees } from '../../asset/superlativTrees.json'
import { Preci } from '../../../src/misc/Preci'

export class PreciTest {
  static test () {
    const arr = [...Object.keys(superlativeTrees)]
    const params = [
      { head: 0, tail: 0 },
      { head: 0, tail: 1 },
      { head: 1, tail: 0 },
      { head: 1, tail: 1 },
      { head: 10, tail: 10 }
    ]
    params.forEach(param => {
      console.log(param)
      const preci = Preci.fromArr(arr, param.head, param.tail)
      console.log(preci)
      console.log('')
    })
  }
}