export class StringTest {
  static test () {
    '1-1'.deco({ a: 1 }).wL()
    '  2-1'.deco([128, 256, 512, 1024]).wL()
    '    3-1'.deco({ a: 1, b: 2 }).wL()
    '      4-1'.deco('Shakespeare').wL()
  }
}