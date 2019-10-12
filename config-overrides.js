/* config-overrides.js */

// const { injectBabelPlugin } = require("react-app-rewired");


// module.exports = function override(config, env) {

//   // 在默认配置基础上注入,// 插件名，插件配置

//   config = injectBabelPlugin(
//     ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
//     config
//   );

//   config = injectBabelPlugin(
//     ["@babel/plugin-proposal-decorators", { legacy: true }],
//     config
//   );



//   //do stuff with the webpack config...
//   return config;
// }




const {
  override,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra');

module.exports = override(

  //load on demand antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),

  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

);