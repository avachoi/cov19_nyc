const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: "eval-source-map",

	entry: ["./src/index"],

	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/public/",
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
			},
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			},
		}),
		new ExtractTextPlugin({
			filename: "style.css",
			disable: false,
			allChunks: true,
		}),
	],

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				include: path.join(__dirname, "src"),
			},
			{
				test: /.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"],
				}),
			},
			{ test: /\.png$/, use: "file" },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: "file" },
		],
	},
};
