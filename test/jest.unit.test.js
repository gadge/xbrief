import { iterateStaticMethod } from './utils/iterateStaticMethod'
import { TestMapX } from './tasks/brief.test/test.MapX'
import { TestVecX } from './tasks/brief.test/test.VecX'
import { TypTest } from './tasks/typ.test/typ.test'
import { ArrayBriefTest } from './tasks/brief.test/array.brief.test'

test('Array brief test', () => {
  ArrayBriefTest.test()
})

test('Test MapX', () => {
  iterateStaticMethod(TestMapX)
})

test('Test VecX', () => {
  iterateStaticMethod(TestVecX)
})

test('Test Typ', () => {
  iterateStaticMethod(TypTest)
})

test('arr concat', () => {
  const arr = [1]
  const brr = [2, 3, 4]
  arr.concat(...brr) |> console.log;

  ([1, ...brr]) |> console.log;

  ([1] + [2, 3, 4]) |> console.log;
})