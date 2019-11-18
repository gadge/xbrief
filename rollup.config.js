import pkg from './package.json'
import { BabelLocal } from './build/BabelLocal'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'

const input = 'functions/index.js'

const externalDependencies = Object.keys(pkg.dependencies)

export default [
  // {
  //   input,
  //   output: {
  //     name: pkg.name,
  //     file: pkg.browser,
  //     format: 'umd' // browser-friendly UMD build
  //   },
  //   plugins: [
  //     resolve(),
  //     babel({
  //       ...BabelLocal.base,
  //       presets: BabelLocal.presets,
  //       plugins: BabelLocal.plugins
  //     }),
  //     // commonjs()
  //   ]
  // },
  {
    input,
    external: externalDependencies,
    output: [
      { file: pkg.main, format: 'cjs' },  // CommonJS (for Node) build.
      { file: pkg.module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins: [
      resolve(),
      babel({
        ...BabelLocal.base,
        plugins: BabelLocal.plugins
      })
    ]
  }
]
