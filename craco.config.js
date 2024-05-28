// craco.config.js
module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.module.rules.push({
                test: /\.mjs$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules\/@react-aria\/utils/, // Exclude the problematic package
            });
            return webpackConfig;
        },
        ignoreWarnings: [
            {
                module: /@react-aria\/utils/, // Ignore warnings from this module
            },
        ],
    },
};
