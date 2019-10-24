import { iterateStaticMethod } from './utils/iterateStaticMethod'
import { MapXTest } from './tasks/brief.test/test.MapX'
import { VecXTest } from './tasks/brief.test/VecX.test'
import { TypTest } from './tasks/typ.test/typ.test'
import { ArrayBriefTest } from './tasks/brief.test/array.brief.test'

it('Array brief it', () => {
  ArrayBriefTest.it()
})

it('Test MapX', () => {
  iterateStaticMethod(MapXTest)
})

it('Test VecX', () => {
  iterateStaticMethod(VecXTest)
})

it('Test Typ', () => {
  iterateStaticMethod(TypTest)
})

it('arr concat', () => {
  const arr = [1]
  const brr = [2, 3, 4]
  arr.concat(...brr) |> console.log;

  ([1, ...brr]) |> console.log;

  ([1] + [2, 3, 4]) |> console.log;
})