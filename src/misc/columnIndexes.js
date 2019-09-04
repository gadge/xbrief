/**
 *
 * @param {*[][]} matrix
 * @returns {number[]}
 */
export function columnIndexes (matrix) {
  if (!!matrix) {
    const firstRow = matrix[0]
    return !!firstRow ? [...firstRow.keys()] : []
  }
  return []
}
