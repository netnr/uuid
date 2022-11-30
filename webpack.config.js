const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const releaseRoot = path.join(__dirname, "dist");

var config = {
    entry: './src/js/index.js',
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(releaseRoot),
        publicPath: '/', //引用资源前缀
        clean: true, //删除
    },
    // Set devServer
    devServer: {
        static: {
            directory: path.join(__dirname, './src'),
        },
        port: 9800,
        historyApiFallback: true, //history
    },
    module: {
        // Bundle styles
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css",
            experimentalUseImportModule: true,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, './src/favicon.ico'),
                    to: path.resolve(releaseRoot)
                },
                {
                    from: path.join(__dirname, './src/convertbookmarks.html'),
                    to: path.resolve(releaseRoot)
                },
                {
                    from: path.join(__dirname, './src/deno.ts'),
                    to: path.resolve(releaseRoot)
                },
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(releaseRoot, 'assets')
                },
                {
                    from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets/icons/info-circle.svg'),
                    to: path.resolve(releaseRoot, 'assets/icons')
                }
                // {
                //     from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
                //     to: path.resolve(releaseRoot, 'assets')
                // }
            ]
        }),
    ]
};

module.exports = (env, argv) => {
    console.debug(env, argv);
    console.debug(`Release: ${releaseRoot}`);

    if (argv.mode == 'development') {
        config.mode = 'development';
        config.optimization.minimize = false;
    } else {
        config.mode = 'production';
        config.optimization.minimize = true;

        config.plugins.push(new WorkboxPlugin.GenerateSW({
            swDest: '/sw.js',
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 1024 * 1024 * 10
        }))
    }
    return config;
}