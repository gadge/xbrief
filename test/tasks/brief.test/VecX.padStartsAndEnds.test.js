import { superlativeTrees } from '../../asset/superlativTrees.json'
import { VecX } from '../../../src/brief/VecX'

const trees = Object.keys(superlativeTrees)

test('padStarts test', () => {
  'I. padStarts' |> console.log
  '[1] no padWidths passed in' |> console.log
  VecX.padStarts(trees) |> console.log

  const len = 32;
  `[2] passed padWidths as a number: ${len}` |> console.log
  VecX.padStarts(trees, 32) |> console.log

  const lens = [12, 24, 36, 48];
  `[3] passed padWidths as an Array<number>: [${lens}]` |> console.log
  VecX.padStarts(trees, lens) |> console.log
})

test('padEnds test', () => {
  'I. padEnds' |> console.log
  '[1] no padWidths passed in' |> console.log
  VecX.padEnds(trees) |> console.log

  const len = 32;
  `[2] passed padWidths as a number: ${len}` |> console.log
  VecX.padEnds(trees, 32) |> console.log

  const lens = [12, 24, 36, 48];
  `[3] passed padWidths as an Array<number>: [${lens}]` |> console.log
  VecX.padEnds(trees, lens) |> console.log
})