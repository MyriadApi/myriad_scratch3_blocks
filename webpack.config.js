module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'blocks.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts'
    ]
  }
};
