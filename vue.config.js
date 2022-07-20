const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: ['quasar'],
  publicPath: process.env.NODE_ENV === "production" ? "/xiaohanp.github.io/src" : "/",
},
);
