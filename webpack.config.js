const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: "./src/index.js",
	output: {
    path: path.resolve(__dirname,"dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["env", "react"]
				}
			},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
		]
	},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/assets/index.html'),
      path: path.resolve(__dirname, './dist')
    })
  ]
}







