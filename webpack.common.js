module.exports = {
  entry: './src/index.ts',

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
