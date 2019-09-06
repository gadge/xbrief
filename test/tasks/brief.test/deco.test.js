import axios from 'axios/index'
import { Xio } from '../../utils/axios-ext'
import { deco } from '../../../src'
import { superlativeTrees } from '../../asset/superlativTrees.json'

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
      simple_array: simple_array,
      empty_matrix: [[]],
      one_row_matrix: [simple_array],
      simple_matrix: Array.from({ length: 3 }, (_, x) =>
        Array.from({ length: 12 }, (_, y) =>
          x + y + 1
        )
      ),
      superlativeTrees_map: superlativeTrees
    }
    for (let [k, v] of Object.entries(objects)) {
      k.tag(deco(v)).wL()
    }
  }
}

export { DecoTest }



