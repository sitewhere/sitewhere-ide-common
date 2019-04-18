export default {
  input: "dist/sitewhere-ide-common.js",
  output: {
    file: "dist/sitewhere-ide-common.cjs.js",
    format: "cjs"
  },
  external: ["vue", "vue-property-decorator", "moment"]
};
