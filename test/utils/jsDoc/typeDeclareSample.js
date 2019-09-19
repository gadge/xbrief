class TypeDeclareSample {

}

/** @type {function(string): number} */
/** @type {function(this: Object<string, string>, number): string} */

/** @type {{foo: number, bar: number}} */
/** @type {!Object<string, string>} */

/** @type {number|string} */


class MyClass {

  constructor () {
    /** @type {Number} some number value */
    this.someNumber = 0
    /** @type {String} some relevant string */
    this.someString = null
    /** @type {Map<Number, Set<String>>} map numbers to sets of strings */
    this.strSetByNumber = new Map()
  }

  /**
   * Some sample function.
   *
   * @param {Number} a - first value
   * @param {Number} b - second value
   * @return {Number} the resulting operation
   */
  someFunction (a, b) {
    return a + b
  }
}

/**
 *
 * @return {Object<string, number>}
 */
function f () {
  /**
   * A boy
   * @typedef {Object} garcon
   * @property {String} foo - this is some cool string
   * @property {Number} fizz - some number we also expect to receive
   * @property {Number} [bar] - an optional property
   */
  const garcon = {
    'foo': 1,
    'fizz': 42,
    'l': 1,
  }
  return garcon
}

