import { boxoffice } from '../../asset/boxoffice.190227.json.rows'
import { deco, MatX, StrX } from '../../../src'
import { greys, palette, shades, Visual } from 'spettro'
import { Stat, StatMx } from 'borel'
import { ArrX } from '../../../src/brief/ArrX'
// import { GP, Chrono } from 'elprimero'

const matrixSet = {
  empty_matrix: [[]],
  one_row_matrix: [[1, 2, 3, 4, 5]],
  matrix_lack: [
    [1, , 3, 4, 5],
    [1, 2, , 4, 5],
    [1, 2, 3, , 5],
  ],
  simpleMatrix: [
    [5, 2, 0, 1],
    [3, 3, 2, 5],
    [0, 1, 11, 7],
    [6, 4, 4, 0]
  ],
  // boxOffice: boxoffice.map(row => Object.values(row).slice(0, 5))
}

const paramSet = {
  simple1: {
    abstract: (x) => StrX.py2jv(`${x}`),
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

// it('MatrixTest.xBriefTest', () => {
//   TestMatX.xBriefTest()
//   // expect(sum(1, 2)).toBe(3);
// })

export class MatXTest {
  static xBriefTest () {
    ''.tag(`${MatXTest.name}.${MatXTest.xBriefTest.name}`)  |> console.log
    for (let [paramName, param] of Object.entries(paramSet)) {
      `  ${paramName}`.tag(JSON.stringify(param))  |> console.log
      for (let [key, matrix] of Object.entries(matrixSet)) {
        `    ${key}`.tag(MatX.xBrief(matrix, param))  |> console.log
      }
      ''  |> console.log
    }
  }

  static xBriefTestColorize () {
    for (let [key, matrix] of Object.entries(matrixSet)) {
      `    ${key}`.tag(
        matrix
          |> (_ => MatX.xBrief(_, {
          visual: {
            direct: 0
          }
        }))
      )  |> console.log
    }
  }
}

// describe('Mat X Test', function () {
//   this.timeout(1000 * 60)
//   it('Mat X Test: x Brief Test ', () => {
//     MatXTest.xBriefTest()
//   })
// })
