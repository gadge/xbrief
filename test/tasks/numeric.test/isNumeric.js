function isNumeric (value) {
  return !isNaN(value - parseFloat(value))
}

// 01. IsNumeric('-1')      => true
// 02. IsNumeric('-1.5')    => true
// 03. IsNumeric('0')       => true
// 04. IsNumeric('0.42')    => true
// 05. IsNumeric('.42')     => true
// 06. IsNumeric('99,999')  => false
// 07. IsNumeric('0x89f')   => false
// 08. IsNumeric('#abcdef') => false
// 09. IsNumeric('1.2.3')   => false
// 10. IsNumeric('')        => false
// 11. IsNumeric('blah')    => false

let arr = ['100F', NaN, null, undefined, 0, '0xFF', '128', '0', '0.0314E+2']

for (let [k, v] of arr.entries()) {
  console.log(`[${k}] (${v}) ${isNumeric(v)}`)
}
