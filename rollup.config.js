import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "sitewhere-ide-common",
      globals: {
        axios: "axios",
        vue: "Vue",
        moment: "moment",
        "vue-property-decorator": "vuePropertyDecorator"
      }
    },
    external: ["axios", "vue", "moment", "vue-property-decorator"],
    plugins: [typescript()]
  }
];
