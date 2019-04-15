import resolve from "rollup-plugin-node-resolve";
import commonJS from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "sitewhere-ide-common"
    },
    plugins: [
      resolve(),
      commonJS({
        include: "node_modules/**"
      }),
      typescript({ clean: true }),
      vue()
    ]
  }
];
