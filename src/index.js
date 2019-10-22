import { StrX } from './brief/StrX'

String.prototype.wL = function () {
  console.log(this)
}

String.prototype.tag = function (val) {
  return StrX.tag(this, val)
}

Number.prototype.tag = function (val) {
  return StrX.tag(`${this}`, val)
}

export { StrX }
export { totx } from './utils/str'
export { Xr, Ink } from './brief/Ink'
export { ArrX } from './brief/ArrX'
export { MatX } from './brief/MatX'
export { MapX } from './brief/MapX'
export { TableX } from './brief/TableX'
export { CrosTabX } from './brief/CrosTabX'
export { deco } from './brief/deco'
export { MoneyForm, PercentForm, MagnitudeForm, toPercent } from './formos/form'
export { noop } from './utils/str'
export { Preci } from './utils/Preci'
