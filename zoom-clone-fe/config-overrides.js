const webpack = require('webpack');
const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@app': 'src',
  })(config);

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
