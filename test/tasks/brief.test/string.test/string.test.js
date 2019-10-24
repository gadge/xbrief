export class StringTest {
  static test () {
    '1-1'.deco({ a: 1 })  |> console.log
    '  2-1'.deco([128, 256, 512, 1024])  |> console.log
    '    3-1'.deco({ a: 1, b: 2 })  |> console.log
    '      4-1'.deco('Shakespeare')  |> console.log
  }
}