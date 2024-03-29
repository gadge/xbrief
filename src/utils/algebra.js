/**
 *
 * @param {*[][]} mx
 * @returns {number[]}
 */
export function coins (mx) {
  if (!mx || !mx.length) return []
  const [x] = mx
  if (!x) return []
  return x.map((_, i) => i)
}

/**
 * Transpose a 2d-array.
 * @param {*[][]} mx
 * @returns {*[][]}
 */
export function transpose (mx) {
  return coins(mx).map(n => mx.map(r => r[n]))
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
  for (let i = 0; i < length; i++) arr[i] = zipper(a[i], b[i], i)
  return arr
  // return Array.from({ length: size }, (v, i) => zipper(vec[i], another[i], i))
  // return vec.map((x, i) => zipper(x, another[i]))
}
