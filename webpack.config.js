const {
	resolve
} = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

const config = {
	devtool: 'cheap-module-eval-source-map',

	entry: [
		'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './main.js', './assets/scss/main.scss'
	],

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: ''
	},

	context: resolve(__dirname, 'app'),

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'build'),
		historyApiFallback: true,
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},

	module: {
		rules: [{
			enforce: "pre",
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "eslint-loader",
			options: {
				fix: true
			}
		}, {
			test: /\.jsx?$/,
			loaders: ['babel-loader', 'babel-loader?compact=false'],
			exclude: /node_modules/
		}, {
			test: /(\.module\.scss)/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: true,
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
			test: /\.json$/,
			loader: 'json-loader'
		}]
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({
			test: /\.jsx?$/,
			options: {
				eslint: {
					configFile: resolve(__dirname, '.eslintrc'),
					cache: false
				}
			}
		}),
		new webpack
			.optimize
			.ModuleConcatenationPlugin(),
		new ExtractTextPlugin({
			filename: './styles/style.css',
			disable: false,
			allChunks: true
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
};

module.exports = config;