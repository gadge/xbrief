/**
 *
 * @param {*[][]} mx
 * @returns {number[]}
 */
export function columnKeys (mx) {
  return !!mx && mx.length
    ? !!mx[0]
      ? mx[0].map((_, i) => i)
      : []
    : []
}

/**
 * Transpose a 2d-array.
 * @param {*[][]} mx
 * @returns {*[][]}
 */
export function transpose (mx) {
  return columnKeys(mx).map(c => mx.map(r => r[c]))
}

/**
 *
 * @param {*[]} a
 * @param {*[]} b
 * @param {function(*,*,?number)} zipper
 * @return {any[]}
 */
export function zip (a, b, zipper) {
  const { length } = a, arr = Array(length)
  for (let [i, el] of a.entries()) {
    arr[i] = zipper(el, b[i], i)
  }
  return arr
  // return Array.from({ length: size }, (v, i) => zipper(vec[i], another[i], i))
  // return vec.map((x, i) => zipper(x, another[i]))
}
