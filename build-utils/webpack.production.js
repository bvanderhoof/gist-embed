module.exports = env => ({
  devtool: env.shouldUseSourceMap ? 'source-map' : false,
  output: {
    filename: 'gist-embed.min.js',
  },
});
