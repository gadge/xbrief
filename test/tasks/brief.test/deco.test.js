import axios from 'axios/index'
import { Xio } from '../../utils/axios-ext'
import { deco, Typ, StrX, MoneyForm } from '../../../src'
import { superlativeTrees } from '../../asset/superlativTrees.json'
import { Player } from '../../asset/Player'

axios.defaults.withCredentials = true

class DecoTest {
  static decoTestGet () {
    const arr = [1, 2, 3, 4, 5]
    axios
      .get(`http://10.0.1.17:8083/realtime`)
      .then(response => {
        let jso = response.data
        console.log(jso)
        // deco(jso).wL()
      })
      .catch(Xio.logErr)
    const message = 'Hello ES6!'
// arr.vBrief().wL()
    deco(message).wL()
    arr.vBrief().wL()
  }

  static decoTest () {
    const simple_array = [1, 2, 3, 4, 5]
    const objects = {
      boolean: true,
      string: 'Shakespeare',
      number: 128,
      null: null,
      undefined: undefined,
      simple_array: simple_array,
      empty_matrix: [[]],
      one_row_matrix: [simple_array],
      simple_set: new Set([1, 1, 1, 2, 2, 3, 3, 3]),
      simple_matrix: Array.from({ length: 3 }, (_, x) =>
        Array.from({ length: 12 }, (_, y) =>
          x + y + 1
        )
      ),
      superlativeTrees_map: superlativeTrees,
      simple_lambda: (x) => `${x}`,
      simple_func: StrX.wL,
      class_ins: new MoneyForm('zh-CN'),
      class: MoneyForm,
      class_ins2: new Player('Messi', '001'),
      class2: Player
    }
    objects |> deco |> console.log
    // for (let [k, v] of Object.entries(objects)) {
    //   // v |> Typ.check |> console.log
    //   k.tag(deco(v)).wL()
    // }
  }
}

// it('deco test', () => {
//   DecoTest.decoTest()
// })

export { DecoTest }



