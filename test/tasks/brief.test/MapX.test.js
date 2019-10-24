import { superlativeTrees } from '../../asset/superlativTrees.json'
import { deco, MapX } from '../../../src/index'
import { GP } from 'elprimero'

const maps = {
  populations: new Map(new Map([
      ['Lagos', 861],
      ['Dhaka', 8906],
      ['Lima', 9174],
      ['Ankara', 5271],
      ['Nagpur', 2405],
      ['Isfahan', 2101]
    ]),
  ),
  superlativeTrees: new Map(
    Object.entries(superlativeTrees)
  )
}

const paramsList = {
  basic: {
    abstract: undefined,
  },
  headOnly: {
    abstract: undefined,
    head: 3
  },
  tailOnly: {
    abstract: undefined,
    head: 0,
    tail: 1,
  },
  headTail: {
    abstract: null,
    head: 2,
    tail: 1
  },
}

class MapXTest {
  static hBriefTest () {
    GP.now().tag(`${MapXTest.name}.${MapXTest.vBriefTest.name}`) |> console.log
    for (let [paramLabel, params] of Object.entries(paramsList)) {
      'param'.tag(paramLabel) |> console.log
      // paramLabel.tag(params |> deco)  |> console.log
      for (let [name, dict] of Object.entries(maps)) {
        '  name'.tag(name) |> console.log
        MapX.hBrief(dict, params) |> console.log
        '' |> console.log
      }
    }
  }

  static vBriefTest () {
    GP.now().tag(`${MapXTest.name}.${MapXTest.vBriefTest.name}`) |> console.log
    for (let [paramLabel, params] of Object.entries(paramsList)) {
      'param'.tag(paramLabel) |> console.log
      // paramLabel.tag(params |> deco)  |> console.log
      for (let [name, dict] of Object.entries(maps)) {
        '  name'.tag(name) |> console.log
        MapX.vBrief(dict, params) |> console.log
        '' |> console.log
      }
    }
  }
}

// describe('MapX test', function () {
//   it('Test Map X: v Brief Test ', () => {
//     MapXTest.vBriefTest()
//   })
// })

export {
  MapXTest
}
