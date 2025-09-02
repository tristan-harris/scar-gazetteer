require = require('esm')(module);
const router = require('./src/routes/main.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    pluginOptions: {
        sitemap: {
            baseURL: 'https://placenames.aq',
            routes: router.default.options.routes,
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'SCAR Composite Gazetteer of Antarctica';
                return args;
            });
        config.plugins.delete('prefetch');
        config.plugin('CompressionPlugin').use(CompressionPlugin);
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
            '^/user/api': {
                target: 'https://data.aad.gov.au'
            }
        }
    }
}
