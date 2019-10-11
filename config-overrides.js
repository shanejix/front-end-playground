/* config-overrides.js */

// const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {

  // 在默认配置基础上注入,// 插件名，插件配置

  // config = injectBabelPlugin(
  //   ["@babel/plugin-proposal-decorators", { legacy: true }],
  //   config
  // );



  //do stuff with the webpack config...
  return config;
}