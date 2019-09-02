import axios from 'axios/index'
import { Xio } from '../../misc/axios-ext'
import { deco } from '../../../src'

axios.defaults.withCredentials = true

function decoTest () {
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

export { decoTest }



