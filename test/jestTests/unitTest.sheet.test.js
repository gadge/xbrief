import { iterateStaticMethod } from '../utils/iterateStaticMethod'
import { TestMapX } from '../tasks/brief.test/test.MapX'
import { TestVecX } from '../tasks/brief.test/test.VecX'
import { TypTest } from '../tasks/typ.test/typ.test'

test('Test MapX', () => {
  iterateStaticMethod(TestMapX)
})

test('Test VecX', () => {
  iterateStaticMethod(TestVecX)
})

test('Test Typ', () => {
  iterateStaticMethod(TypTest)
})