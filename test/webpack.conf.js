const CONF = require('@ideadesignmedia/config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require('path')
const fs = require('fs')
let build = path.join(process.cwd(), process.env.STATIC || './static')
let directory = path.join(process.cwd(), './src')
let inferredIndex = path.join(directory, 'index.html')
let htmlOptions = {title: process.env.TITLE || 'APP', hash: false, }
if (fs.existsSync(inferredIndex)) htmlOptions.template = inferredIndex
module.exports =  {
    entry: process.env.ENTRY || './src/index.js',
    output: {
        path: build,
        filename: 'index.js',
    },
    module: {
        rules: [
                {
                    test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                    exclude: /node_modules/, //folder to be excluded
                    use:  'babel-loader' //loader which we are going to use
                },
            {
                test: /.(sa|sc|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", ],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin(htmlOptions), new MiniCssExtractPlugin(),    new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, ".")
    }),],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    extractComments: 'all',
                    parallel: false,
                    toplevel: true,
                }
            })
        ],
    },
    devtool: "eval-cheap-source-map",
    devServer: {
      historyApiFallback: true,
        static: {
            directory,
            watch: {
                ignored: '*.txt',
                usePolling: false,
            }
        },
        compress: true,
        hot: true ,
        liveReload: true,
        port: process.env.DEVPORT || 3000,
        open: {
            target: ['index.html'],
            app: {
                name: 'google-chrome',
                arguments: ['--incognito', '--new-window'],
            },
        },
        webSocketServer: 'ws'
    },
    resolve: {
        extensions: ['.js','.jsx','.json'] 
    },
    experiments: {
        asyncWebAssembly: true
   }
};