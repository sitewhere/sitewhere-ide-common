import typescript from "rollup-plugin-typescript2";
import pkg from './package.json';

export default [
  {
    input: "src/index.ts",
    output: [{
      file: pkg.main,
      format: "cjs",
      exports: "named",
      globals: {
        axios: "axios"
      }
    }, {
      file: pkg.module,
      format: "es",
      exports: "named",
      globals: {
        axios: "axios"
      }
    }],
    external: [
      "axios",
      "moment",
      "sitewhere-rest-api",
      "vue",
      "vue-router",
      "vuelidate",
      "vuex"
    ],
    plugins: [typescript()]
  }
];
