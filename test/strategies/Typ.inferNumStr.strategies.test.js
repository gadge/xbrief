import { Chrono } from 'elprimero'
import { Typ } from '../../src/typ/Typ'
import { Jso } from 'veho'
import { printChronoCross } from './helper/printChronoCross'

const _entries = [
  ['foo', 12],
  ['bar', 12 * 2],
  ['fiz', 12 * 4],
  ['baz', 12 * 8],
]
const
  _oc = Object.prototype.toString,
  _isStrNum = x => !!(+x) || parseFloat(x) === 0,
  _isNumeric = v => !isNaN(v - parseFloat(v)),
  _isNaNNum = x => isNaN(x - x),
  _otype = x => _oc.call(x).slice(8, -1)

export class TypInferNumStrStrategiesTest {
  static test () {
    const { lapse, result } = Chrono.crossByParamsAndFuncs(
      {
        repeat: 800000,
        paramsList: {
          number: [1024],
          numNaN: [NaN],
          numInf: [Number.POSITIVE_INFINITY],
          string: ['Shakespeare'],
          numStr: ['-1024.2048'],
          // bigint: [BigInt(9007199254740991)],
          boolean: [false],
          null: [null],
          undefined: [undefined],
          array: [_entries.map(([k]) => k)],
          map: [new Map(_entries)],
          set: [new Set(_entries.map(([k]) => k))],
          object: [Jso.of(..._entries)],
          function: [(x) => console.log(x)],
        },
        funcList: {
          protoType: Typ.protoType,
          initial: Typ.initial,
          infer: Typ.infer,
          inferData0: (x) =>
            typeof x === 'number' && _isNaNNum(x)
              ? 'nan'
              : (typeof x === 'string')
              ? _isStrNum(x)
                ? 'numstr'
                : 'string'
              : _otype(x).toLowerCase(),
          inferData1: (x) => (typeof x === 'string')
            ? _isStrNum(x)
              ? 'numstr'
              : 'string'
            : typeof x === 'number' && _isNaNNum(x)
              ? 'nan'
              : _otype(x).toLowerCase(),
          inferData2: (x) => {
            const raw = typeof x
            if (raw === 'string' && Typ.isNumeric(x)) return 'numstr'
            if (raw === 'number' && _isNaNNum(x)) return 'nan'
            if (raw !== 'object') return raw
            return Typ.infer(x)
          },
          inferData3: (x) => {
            const raw = typeof x
            if (raw === 'string' && _isStrNum(x)) return 'numstr'
            if (raw === 'number' && _isNaNNum(x)) return 'nan'
            if (raw !== 'object') return raw
            return _otype(x)
          },
          inferData4: (x) => {
            const t = typeof x
            switch (t) {
              case 'string':
                return _isStrNum(x) ? 'numstr' : t
              case 'number':
                return _isNaNNum(x) ? 'nan' : t
              case 'object':
                return _otype(x)
              default:
                return t
            }
          }
        }
      }
    )
    printChronoCross({ lapse, result })
  }
}

describe('Typ Infer Num Str Strategies Test', function () {
  this.timeout(1000 * 60)
  it('Typ Infer Num Str Strategies Test: test ', () => {
    TypInferNumStrStrategiesTest.test()
  })
})
