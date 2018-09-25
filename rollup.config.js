import babel from 'rollup-plugin-babel';

export default {
  input: 'esm/index.js',
  output: {
    file: 'index.js',
    format: 'iife',
    name: '$'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: ['@babel/preset-env']
    })
  ]
};