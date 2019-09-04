import { boxoffice } from '../../asset/boxoffice.190227.json.rows'
import { MatX, Str } from '../../../src'
import { ArrayTest } from './array.test'
// import { GP, Chrono } from 'elprimero'

const matrixSet = {
  nullMatrix: [[]],
  simpleMatrix: [
    [5, 2, 0, 1],
    [3, 3, 2, 5],
    [0, 1, 11, 7],
    [6, 4, 4, 0]
  ],
  boxOffice: boxoffice.map(row => [...Object.values(row)])

}

const paramSet = {
  simple1: {
    abstract: (x) => Str.py2jv(`${x}`),
    rows: {
      head: 2,
      tail: 1
    },
    columns: {
      head: 2,
      tail: 1
    }
  },
  simple2: {
    rows: {
      head: 2,
      tail: 2
    },
    columns: {
      head: 2,
      tail: 2
    }
  },
  headRowsOnly: {
    abstract: (x) => `${x}`.slice(0, 32),
    rows: {
      head: 2,
    },
    columns: {
      head: 2,
      tail: 2
    },
  },
  tailRowsOnly: {
    abstract: (x) => `${x}`.slice(0, 32),
    rows: {
      tail: 2,
    },
    columns: {
      head: 2,
      tail: 2
    },
  },
  headColsOnly: {
    abstract: (x) => `${x}`.slice(0, 32),
    rows: {
      head: 2,
      tail: 2
    },
    columns: {
      head: 2,
    },
  },
  tailColsOnly: {
    abstract: (x) => `${x}`.slice(0, 32),
    rows: {
      head: 2,
      tail: 2
    },
    columns: {
      tail: 2,
    },
  }
}

test('MatrixTest.xBriefTest', () => {
  MatrixTest.xBriefTest()
  // expect(sum(1, 2)).toBe(3);
})

export class MatrixTest {
  static xBriefTest () {
    ''.tag(`${MatrixTest.name}.${MatrixTest.xBriefTest.name}`).wL()
    for (let [paramName, param] of Object.entries(paramSet)) {
      `  ${paramName}`.tag(JSON.stringify(param)).wL()
      for (let [key, matrix] of Object.entries(matrixSet)) {
        `    ${key}`.tag(MatX.xBrief.call(null, matrix, param)).wL()
      }
      ''.wL()
    }
  }

  // static test () {
  //   const matrix = boxoffice.map(jso => Object.values(jso).slice(0, 6))
  //
  //   const funcSet = {
  //     'boxoffice': () => {
  //       return MatX.xBrief(matrix, (x) => Typ.isNumeric(x) ? x : `"${x}"`, 5)
  //     },
  //     'empty matrix': () => {
  //       return MatX.xBrief([[]], (x) => Typ.isNumeric(x) ? x : `"${x}"`)
  //     }
  //   }
  //
  //   for (let [k, v] of Object.entries(funcSet)) {
  //     GP.now().tag(k).wL()
  //     '  brief'.tag(v.call()).wL()
  //   }
  //   ''.wL()
  //   'Chrono'.wL()
  //   Chrono.compareFuncsByRepeats([1, 100, 10000], funcSet).brief().wL()
  //   ''.wL()
  //   // console.log(matrix)
  // }

}
