import { Stat } from 'borel'

/**
 *
 * @param {CrosTab} lapse
 * @param {CrosTab} result
 * @param {function(CrosTab):CrosTab} [pipeline]
 */
export const printChronoCross = ({ lapse, result, pipeline }) => {
  'lapse' |> console.log
  lapse
    .brief()
    |> console.log
  '' |> console.log
  'result' |> console.log
  if (!!pipeline) result = result |> pipeline
  result
    .brief()
    |> console.log
  '' |> console.log
}