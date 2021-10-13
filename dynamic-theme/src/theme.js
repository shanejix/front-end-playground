let lessNodesAppended;

const updateTheme = primaryColor => {
  if (!primaryColor) {
    return;
  }

  function buildIt() {
    // 正确的判定less是否已经加载less.modifyVars可用
    if (!window.less || !window.less.modifyVars) {
      console.info(`no less!`)
      return;
    }

    console.info(`正在编译主题! 主题色：${primaryColor}`)

    // less.modifyVars可用
    window.less.modifyVars({
      '@primaryColor': primaryColor,
    })
      .then(() => {
        console.log(`成功`);
      })
      .catch((error) => {
        console.error(`失败`, error);
      });
  }

  // buildIt();

  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    // 下方这个color.less位置大家也可以按需修改
    // lessStyleNode.setAttribute('href', __webpack_public_path__ + 'static/color.less')
    lessStyleNode.setAttribute('href', 'static/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    // less的src地址也可以是cdn地址
    lessScriptNode.src = 'static/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

export { updateTheme }
