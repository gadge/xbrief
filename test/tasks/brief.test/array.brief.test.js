export class ArrayBriefTest {
  static foo ({ x, y = 5 } = {}) {
    console.log(x, y)
  }

  static test () {
    ArrayBriefTest.foo({}) // undefined 5
    ArrayBriefTest.foo({ x: 1 }) // 1 5
    ArrayBriefTest.foo({ x: 1, y: 2 }) // 1 2
    ArrayBriefTest.foo() // TypeError: Cannot read property 'x' of undefined
  }
}
