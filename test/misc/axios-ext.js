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
      ).wL()
    } else {
      'error'.tag(error).wL()
    }
    'error.config'.tag(deco(error.config)).wL()
  }
}

export {
  Xio
}
