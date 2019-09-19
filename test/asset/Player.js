import { VecX } from 'xbrief'

class Identity {
  constructor (name, id) {
    this.name = name
    this.id = id
  }

  static planet = 'Earth'

  static fromName (name) {
    return new Identity(name, Math.round(Math.random() * 1000).toString())
  }

  get brief () {
    return this.id.tag(this.name)
  }

}

class Player extends Identity {

  constructor (name, id) {
    super(name, id)
    this._score = 0
    this._log = []
  }

  get score () {
    return this._score
  }

  get brief () {
    return `${this.name} with score: ${this._score}`
  }

  get log () {
    return VecX.vBrief(this._log)
  }

  set log (val) {
    this._log = [...this._log, val]
  }

  incre () {
    this._score++
  }

  static license = 'Apache'

  static fromArr (arr) {
    return new Player(arr[0])
  }
}

export {
  Identity,
  Player
}