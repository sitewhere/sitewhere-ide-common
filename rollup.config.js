export default {
  input: "dist/sitewhere-ide-common.js",
  output: {
    name: "sitewhere-ide-common",
    file: "dist/sitewhere-ide-common.umd.js",
    format: "umd"
  },
  external: ["vue", "vue-property-decorator", "moment"]
};
