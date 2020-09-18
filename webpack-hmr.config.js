// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StartServerPlugin = require('start-server-webpack-plugin');
require('dotenv').config();

module.exports = function(options) {
    return {
        ...options,
        entry: ['webpack/hot/poll?100', options.entry],
        watch: true,
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'],
            }),
        ],
        module: {
            rules: [{
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]
        },
        mode: 'development',
        // resolve: {
        //     alias: {
        //         '@extras': path.resolve(__dirname, './src/app/extras'),
        //         '@interfaces': path.resolve(__dirname, './src/app/interfaces'),
        //         '@models': path.resolve(__dirname, './src/app/models'),
        //         '@environments': path.resolve(__dirname, './src/app/environments'),
        //         '@services': path.resolve(__dirname, './src/app/services'),
        //         '@repositories': path.resolve(__dirname, './src/app/repositories'),
        //         '@controllers': path.resolve(__dirname, './src/app/controllers'),
        //         '@providers': path.resolve(__dirname, './src/app/providers'),
        //         '@view-models': path.resolve(__dirname, './src/app/view-models'),
        //         '@types': path.resolve(__dirname, './src/app/types'),
        //     },
        //     extensions: ['.tsx', '.ts', '.js']
        // },
        plugins: [
            ...options.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
            new StartServerPlugin({ name: options.output.filename }),
        ],
    };
};