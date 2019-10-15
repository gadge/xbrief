import { Chrono } from 'elprimero'
import { printChronoCross } from './helper/printChronoCross'
import chalk from 'chalk'
import { palette } from 'spettro'

const
  repeat = 1000000,
  getPipeline = (paramsList) => result => result
    .map(it => it || chalk.hex(palette.red.base)(it))
    .unshiftCol('[parseFloat]', Object.values(paramsList).map(([it]) => parseFloat(it)))

const
  _typeof = (x) => typeof x === 'number',
  notNaN = (x) => !isNaN(x),
  additive = (x) => !!(+x),
  additive2 = (x) => !!(+x) || parseFloat(x) === 0,
  angular = (x) => !isNaN(x - parseFloat(x)),
  hamzeen = (x) => !isNaN(parseFloat(x)) && isFinite(x)

export class TypInferNumStrStrategiesTest {
  static testMisc = () => {
    const paramsList = {
      Boo_true: [true],
      Boo_false: [false],
      null: [null],
      undefined: [undefined],
    }
    const funcList = {
      _typeof,
      notNaN,
      additive,
      angular,
      hamzeen,
    }
    const { lapse, result } = Chrono.crossByParamsAndFuncs({ repeat, paramsList, funcList })
    printChronoCross({ lapse, result, pipeline: getPipeline(paramsList) })
  }

  static testNumeric = () => {
    const paramsList = {
      Num_zero: [0],
      Num_one: [1],
      Num_frac: [.42],
      Num_positive: [1024],
      Num_negative: [-1024],
      Num_EPSILON: [Number.EPSILON],
      Num_NaN: [Number.NaN],
      Num_POS_INF: [Number.POSITIVE_INFINITY],
      Num_NEG_INF: [Number.NEGATIVE_INFINITY],
    }
    const funcList = {
      notNaN,
      angular,
      hamzeen,
      notNaN2: x => !isNaN(x) && isFinite(x),
      notNaN3: x => !isNaN(x - x)
    }
    const { lapse, result } = Chrono.crossByParamsAndFuncs({ repeat, paramsList, funcList })
    printChronoCross({ lapse, result, pipeline: getPipeline(paramsList) })
  }

  static testString = () => {
    const paramsList =
      {

        'Str: 0': ['0'],
        'Str: -1': ['-1'],
        'Str: -1.5': ['-1.5'],
        'Str: 0.42': ['0.42'],
        'Str: .42': ['.42'],
        'Str: sci': ['1.2e+9'],
        'Str: 0xFF': ['0xFF'],
        'Str: empty': [''],
        'Str: 99,999': ['99,999'],
        'Str: date': ['2077-06-04'],
        'Str: #abcdef': ['#abcdef'],
        'Str: 1.2.3': ['1.2.3'],
        'Str: blah': ['blah'],
      }
    const funcList = {
      notNaN,
      additive,
      additive2,
      angular,
      hamzeen,
    }
    const { lapse, result } = Chrono.crossByParamsAndFuncs({ repeat, paramsList, funcList })
    printChronoCross({ lapse, result, pipeline: getPipeline(paramsList) })
  }

  static testArr = () => {
    const paramsList = {
      Arr_empty: [[]],
      Arr_zero: [[0]],
      Arr_one: [[1]],
      Arr_misc: [[16, 64, 128]]
    }
    const funcList = {
      _typeof,
      notNaN,
      additive,
      _parseFloat,
      angular,
      hamzeen,
    }
    const { lapse, result } = Chrono.crossByParamsAndFuncs({ repeat, paramsList, funcList })
    printChronoCross({ lapse, result, pipeline: getPipeline(paramsList) })
  }
}

describe(
  'Typ Infer Num Str Strategies Test'
  ,

  function () {
    this.timeout(1000 * 60)
    it('Typ Infer Num Str Strategies Test: test Misc ', () => {
      TypInferNumStrStrategiesTest.testMisc()
    })
    it('Typ Infer Num Str Strategies Test: test Numeric ', () => {
      TypInferNumStrStrategiesTest.testNumeric()
    })
    it('Typ Infer Num Str Strategies Test: test String ', () => {
      TypInferNumStrStrategiesTest.testString()
    })
    it('Typ Infer Num Str Strategies Test: test Arr ', () => {
      TypInferNumStrStrategiesTest.testArr()
    })
  }
)