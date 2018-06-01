const path = require('path');

module.exports = {
  entry: "./app",
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
};
