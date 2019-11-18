import { Pal } from '../utils/palette'

export const deFn = (fn) => {
  fn = `${fn}`
  fn = fn.startsWith('function') ? fn.slice(9) : fn
  return fn |> Pal.fnc
}
