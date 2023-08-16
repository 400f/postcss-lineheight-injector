const postcss = require('postcss');

module.exports = (userOptions = {}) => {
  const defaultOptions = {
    rules: {
      // like '10px': '16px',
      // like '1em' : '1.64em',
    },
    fallbackValue: '1.6',
  };

  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  return {
    postcssPlugin: 'postcss-lineheight-injector',
    Once (root, { result }) {
      root.walkDecls('font-size', (decl) => {
        let declaratedlineHeight;
        decl.parent.walkDecls('line-height', (decl) => {
          declaratedlineHeight = decl.value;
        });

        if (declaratedlineHeight !== undefined) return;
        decl.before(
          `line-height: ${options.rules[decl.value] || options.fallbackValue}`
        );
      });
    }
  }
}
