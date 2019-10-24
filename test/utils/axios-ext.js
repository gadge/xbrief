import '../../src'
import { nowTM } from './elprimero'
import { deco } from '../../src'

class Xio {

  static logErr (error) {
    if (error.response) {
      nowTM().tag('axios.log-err').tag(
        (new Map([
          ['data', error.data],
          ['status', error.status],
          ['headers', error.headers]
        ])).vBrief()
      )  |> console.log
    } else {
      'error'.tag(error)  |> console.log
    }
    'error.config'.tag(deco(error.config))  |> console.log
  }
}

export {
  Xio
}
