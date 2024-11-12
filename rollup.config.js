import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const name = '__nsx5_app'
const banner = `/*!
 * Built by NOuSantx <nousantx@gmail.com>
 * Copyright (c) 2024-present NOuSantx
 *
 * Latest built: ${new Date().toISOString()}
 */`

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: `app/dist/script.js`,
      format: 'umd',
      name
    }
  ],
  plugins: [
    typescript(),
    resolve(),
    // commonjs(),
    terser({
      format: {
        comments: false,
        preamble: banner,
        preserve_annotations: true
      },
      compress: {
        defaults: true,
        passes: 2
      },
      toplevel: true,
      keep_classnames: false,
      keep_fnames: false
    })
  ]
}

export default config
