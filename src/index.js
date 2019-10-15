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
export { Xr, Ink } from './brief/Ink'
export { VecX } from './brief/VecX'
export { MatX } from './brief/MatX'
export { MapX } from './brief/MapX'
export { TabX } from './brief/TabX'
export { CrosTabX } from './brief/CrosTabX'
export { deco } from './brief/deco'
export { Typ } from './typ/Typ'
export { MoneyForm, PercentForm, MagnitudeForm, toPercent } from './formos/form'
export { noop } from './utils/str'
export { Preci } from './utils/Preci'
