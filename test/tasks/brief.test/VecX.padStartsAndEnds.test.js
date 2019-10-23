import { superlativeTrees } from '../../asset/superlativTrees.json'
import { ArrX } from '../../../src/brief/ArrX'

const trees = Object.keys(superlativeTrees)

it('padStarts test', () => {
  'I. padStarts' |> console.log
  '[1] no padWidths passed in' |> console.log
  ArrX.padStarts(trees) |> console.log

  const len = 32;
  `[2] passed padWidths as a number: ${len}` |> console.log
  ArrX.padStarts(trees, 32) |> console.log

  const lens = [12, 24, 36, 48];
  `[3] passed padWidths as an Array<number>: [${lens}]` |> console.log
  ArrX.padStarts(trees, lens) |> console.log
})

it('padEnds test', () => {
  'I. padEnds' |> console.log
  '[1] no padWidths passed in' |> console.log
  ArrX.padEnds(trees) |> console.log

  const len = 32;
  `[2] passed padWidths as a number: ${len}` |> console.log
  ArrX.padEnds(trees, 32) |> console.log

  const lens = [12, 24, 36, 48];
  `[3] passed padWidths as an Array<number>: [${lens}]` |> console.log
  ArrX.padEnds(trees, lens) |> console.log
})