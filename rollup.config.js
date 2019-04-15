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
    plugins: [typescript({ clean: true }), vue()]
  }
];
