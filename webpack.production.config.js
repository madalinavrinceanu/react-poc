const {
	resolve
} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	devtool: 'cheap-module-source-map',

	entry: [
		'./main.js', './assets/scss/main.scss'
	],

	context: resolve(__dirname, 'app'),

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/retaildashboard/'
	},

	plugins: [
		new webpack
			.optimize
			.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			template: `${__dirname}/app/index.html`,
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack
			.optimize
			.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		// new webpack   .optimize   .UglifyJsPlugin({beautify: false}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new ExtractTextPlugin({
			filename: './styles/style.css',
			disable: false,
			allChunks: true
		}),
		new CopyWebpackPlugin([{
			from: './vendors',
			to: 'vendors'
		}])
	],

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /(\.module\.scss)/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: false,
						importLoaders: 2,
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				},
					'sass-loader'
				]
			})
		}, {
			test: /^((?!\.module).)*\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
				},
					'sass-loader'
				]
			})
		}, {
			// Transform our own .css files with PostCSS and CSS-modules
			test: /\.css$/,
			exclude: /node_modules/,
			use: ['style-loader', 'css-loader']
		}, {
			// Do not transform vendor's CSS with CSS-modules The point is that they remain
			// in global scope. Since we require these CSS files in our JS or CSS files,
			// they will be a part of our compilation either way. So, no need for
			// ExtractTextPlugin here.
			test: /\.css$/,
			include: /node_modules/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimetype: 'image/png',
					name: '[name].[ext]',
					outputPath: './images/',
					publicPath: '../images/'
				}
			}]
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: './fonts/',
					publicPath: '../fonts/'
				}
			}]
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimetype: 'application/font-woff',
					name: '[name].[ext]',
					outputPath: './fonts/',
					publicPath: '../fonts/'
				}
			}]
		}, {
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimetype: 'application/octet-stream',
					name: '[name].[ext]',
					outputPath: './fonts/',
					publicPath: '../fonts/'
				}
			}]
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimetype: 'image/svg+xml',
					name: '[name].[ext]',
					outputPath: './images/',
					publicPath: '../images/'
				}
			}]
		}, {
			test: /\.js$/,
			loader: 'string-replace-loader',
			options: {
				search: 'localhost:9090',
				replace: 'db1cd793-1620-4b0a-a629-b04b4ca6408c'
			}
		}]
	}
};

module.exports = config;