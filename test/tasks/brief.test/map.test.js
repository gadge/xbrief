import { superlativeTrees } from '../../asset/superlativTrees.json'
import { MapX } from '../../../src'
import { GP } from 'elprimero'

const mapSet = {
  simple: new Map([
    ['a', 2],
    ['b', 4],
    ['c', 8],
    ['d', 16],
    ['e', 32]
  ]),
  superlativeTrees: new Map(
    Object.entries(superlativeTrees)
  )
}

const paramSet = {
  basic: {
    abstract: undefined,
    delimiter: ',',
    head: 0,
    tail: 1,
  },
  take5: {
    abstract: null,
    delimiter: ',',
    head: 2,
    tail: 1
  },
  inShort: {
    delimiter: ',',
    head: 2,
    tail: 1
  }
}
export class MapTest {
  static hBriefTest () {
    GP.now().tag(`${MapTest.name}.${MapTest.hBriefTest.name}`).wL()
    for (let [paramKey, param] of Object.entries(paramSet)) {
      paramKey.tag(JSON.stringify(param)).wL()
      for (let [k, lex] of Object.entries(mapSet)) {
        `  ${k}`.tag(lex.hBrief.apply(lex, [...Object.values(param)])).wL()
      }
      ''.wL()
    }
  }

  static vBriefTest () {
    GP.now().tag(`${MapTest.name}.${MapTest.vBriefTest.name}`).wL()
    for (let [paramKey, paramEntity] of Object.entries(paramSet)) {
      paramKey.tag(JSON.stringify(paramEntity)).wL()
      paramKey.deco(paramEntity).wL()
      for (let [dictName, dictEntity] of Object.entries(mapSet)) {
        `  ${dictName}`.tag(MapX.vBrief.call(null, dictEntity, paramEntity)).wL()
      }
      ''.wL()
    }
  }
}
