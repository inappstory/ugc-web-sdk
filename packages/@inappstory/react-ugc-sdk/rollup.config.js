import typescript from "rollup-plugin-typescript2";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: ["src/index.ts"],
        output: [
            {
                dir: "dist",
                entryFileNames: "[name].mjs.js",
                format: "es",
                exports: "named",
            },
            {
                dir: "dist",
                entryFileNames: "[name].cjs.js",
                format: "cjs",
                exports: "named",
            },
        ],
        plugins: [
            nodeResolve({
                extensions: [".js"],
            }),
            typescript(),
            commonjs(),
        ],
        external: ["react"],
    }
];
