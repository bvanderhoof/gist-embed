const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const modeConfig = mode => require(`./build-utils/webpack.${mode}.js`)(mode);

module.exports = ({mode} = {mode: 'production'}) => {
  return webpackMerge(
    {
      entry: './src/index.ts',
      mode,
      plugins: [new webpack.ProgressPlugin()],
      module: {
        rules: [
          {
            test: /\.(ts)$/,
            loader: 'babel-loader',
          },
        ],
      },
      resolve: {extensions: ['.js', '.ts', '.json']},
    },
    modeConfig(mode),
  );
};
