import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss'
import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-import-css";

export default {
    input: "src/index.tsx",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        // resolve(),
        commonjs(),
        css(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: './types',
            jsx:
                process.env.NODE_ENV === 'development' ? 'react-jsxdev' : 'react-jsx',
        }),
        image(),
        postcss({
            extensions: [".css"],
        }),
        nodeResolve({
            // extensions: [".js"],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
            presets: ["@babel/preset-react"/*, '@babel/preset-env', '@babel/preset-typescript'*/],
        }),
        serve({
            open: false,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: 3000,
        }),
        livereload({ watch: "dist" }),
    ]
};
