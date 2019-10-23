import { StrX, ArrX } from '../../../src/index'
import { GP } from 'elprimero'

const superlativeTrees = {
  coastRedwood: 'Sequoia sempervirens',
  mountainAsh: 'Eucalyptus regnans',
  coastDouglasFir: 'Pseudotsuga menziesii var. menziesii',
  yellowMeranti: 'Shorea faguetiana',
  sitkaSpruce: 'Picea sitchensis',
  giantSequoia: 'Sequoiadendron giganteum',
  mannaGum: 'Eucalyptus viminalis',
  southernBlueGum: 'Eucalyptus globulus',
  nobleFir: 'Abies procera',
  alpineAsh: 'Eucalyptus delegatensis',
  brownTopStringbark: 'Eucalyptus obliqua',
  mengaris: 'Koompassia excelsa',
}

const arrSet = {
  nullArray: [],
  singleElementArray: [1],
  arithmetic: [1, 2, 3, 4, 5, 6, 7, 8],
  trees: Object.keys(superlativeTrees)
}

const paramSet = [
  {},
  {
    delimiter: '|',
    abstract: (x) => StrX.jv2py(`${x}`),
    head: 2,
    tail: 1
  },
  {
    delimiter: ', ',
    abstract: undefined,
    head: 5,
    tail: 1
  },
  {
    head: 3,
    tail: 0
  },
  {
    head: 0,
    tail: 3
  }
]

class VecXTest {
  static determineArray () {
    const candidates = [
      null,
      undefined,
      [],
      [1, 2, 3],
      new Map([[1, 'a'], [2, 'b']]),
      new Set([1, 2, 3, 2, 1]),
      { 1: 'a', 2: 'b', 3: 'c' }
    ]
    GP.now().tag(`${VecXTest.name}.${VecXTest.determineArray.name}`).wL()
    for (let [i, candidate] of candidates.entries()) {
      `${i}`.tag('isArray and length').wL()
      console.log(candidate);
      `${candidate} isArray`.tag(Array.isArray(candidate)).wL();
      `${candidate} isSolidArray`.tag(Array.isArray(candidate) && !!candidate.length).wL()
      ''.wL()
    }
  }

  static hBriefTest () {
    ''.tag(`${VecXTest.name}.${VecXTest.hBriefTest.name}`).wL()
    for (let [i, param] of paramSet.entries()) {
      `  ${i}`.tag(JSON.stringify(param)).wL()
      for (let [key, arr] of Object.entries(arrSet)) {
        `    ${key}`.tag(ArrX.hBrief.call(null, arr, param)).wL()
      }
      ''.wL()
    }
  }

  static vBriefTest () {
    ''.tag(`${VecXTest.name}.${VecXTest.vBriefTest.name}`).wL()
    for (let [i, param] of paramSet.entries()) {
      `  ${i}`.tag(JSON.stringify(param)).wL()
      for (let [key, arr] of Object.entries(arrSet)) {
        `    ${key}`.tag(ArrX.vBrief.call(null, arr, param)).wL()
      }
      ''.wL()
    }
  }

  static vBriefTestParam () {
    const trees = Object.keys(superlativeTrees).map(name => name|>StrX.jv2py)
    'trees'.tag(ArrX.vBrief(trees, { abstract: it => `${it}` })).wL()
  }
}

// it('ArrayTest.vBriefTest', () => {
//   VecXTest.vBriefTest()
//   // expect(sum(1, 2)).toBe(3);
// })

export { VecXTest }
