const postcss = require('postcss');
const plugin = require('.');

describe('postcss-linehight-injecter', () => {
  test('ルールにあるfont-sizeがあれば、ルールに設定されているline-heightを付与する', () => {
    const plugins = [
      plugin({
        rules: {
          '10px': '16px',
        },
        fallbackValue: '1.6',
      }),
    ];

    return postcss(plugins)
      .process(`p {font-size: 10px}`, { from: undefined })
      .then((result) => {
        expect(result.css).toMatch(/line-height:\s?16px/);
      });
  });

  test('ルールにないfont-sizeがあれば、fallbackValueに設定されているline-heightを付与する', () => {
    const plugins = [
      plugin({
        rules: {
          '10px': '16px',
        },
        fallbackValue: '1.6',
      }),
    ];

    return postcss(plugins)
      .process(`p {font-size: 12px}`, { from: undefined })
      .then((result) => {
        expect(result.css).toMatch(/line-height:\s?1\.6/);
      });
  });

  test('あらかじめline-heightがあれば、何もしない', () => {
    const plugins = [
      plugin({
        rules: {
          '10px': '16px',
        },
        fallbackValue: '1.6',
      }),
    ];

    const input = `p {font-size: 10px;line-height: 1.1;}`;

    return postcss(plugins)
      .process(input, { from: undefined })
      .then((result) => {
        expect(result.css).toMatch(input);
      });
  });
});
