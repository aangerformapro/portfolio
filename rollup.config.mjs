// rollup.config.js
import path from "node:path";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';

export default {

    input: path.resolve('src/mjs/index.mjs'),
    context: 'globalThis',
    output: [
        {
            format: 'es',
            sourcemap: true,
            file: path.resolve('public/assets/bundle.js')
        }
    ],
    plugins: [
        babel({ presets: ['@babel/preset-env'], babelHelpers: 'bundled' }),
        postcss(),

        resolve({
            moduleDirectories: ['node_modules'],
            extensions: ['.js', '.mjs', '.cjs'],
            // preferBuiltins: false,
        }),
        commonjs(),

    ],
    watch: {
        exclude: 'node_modules/**',
        include: 'src/mjs/**'
    }
};