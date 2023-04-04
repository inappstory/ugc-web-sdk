import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import semver from "semver";

import {default as packageConfig} from "./package.json" assert { type: "json" };

function generateVersionCode(versionName) {
    const version = semver.parse(versionName);
    return version.major * 10000 + version.minor * 100 + version.patch;
}

export default {
    input: ["src/index.ts"],
    output: [
        {
            dir: "dist",
            entryFileNames: "[name].mjs.js",
            format: "es",
            exports: "named"
        },
        {
            dir: "dist",
            entryFileNames: "[name].cjs.js",
            format: "cjs",
            exports: "named"
        },
    ],
    plugins: [
        replace({
            preventAssignment: true,
            values: {
                "process.env.SDK_VERSION": JSON.stringify(packageConfig.version || ""),
                "process.env.SDK_VERSION_CODE": generateVersionCode(packageConfig.version || "0.0.0"),
            }
        }),
        nodeResolve({
            extensions: [".js"],
            preferBuiltins: false
        }),
        typescript(),
        commonjs(),
    ],
    external: ["react"]
};
