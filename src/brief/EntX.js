class EntX {
  /***
   *
   * @param {*} key
   * @param {*} value
   * @returns {string}
   */
  static brief ([key, value]) {
    return `${key}`.tag(value)
  }

  /***
   *
   * @param {*} key
   * @param {*} value
   * @param {number} keyLen
   * @returns {string}
   */
  static briefPadded ([key, value], keyLen = 0) {
    return `${key}`.padStart(keyLen).tag(value)
  }
}

export {
  EntX
}