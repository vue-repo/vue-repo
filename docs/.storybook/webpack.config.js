const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var path = require('path')


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = (baseConfig, env, defaultConfig) => {

    defaultConfig.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')
    defaultConfig.resolve.alias['@'] = resolve('src')
    defaultConfig.resolve.alias['@pages'] = resolve('src/pages')
    defaultConfig.resolve.alias['@components'] = resolve('src/components')

    defaultConfig.module.rules.push({
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                },
            }
        ],
    })

    defaultConfig.module.rules.push({ test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] })

    defaultConfig.plugins.push(new ForkTsCheckerWebpackPlugin())

    return defaultConfig;
};
