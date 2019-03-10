const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = () => ({
  output: {
    filename: 'index.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    hot: true,
    compress: true,
    watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: './tsconfig.json',
      async: false,
    }),
  ],
});
