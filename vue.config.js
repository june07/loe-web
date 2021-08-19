const fs = require('fs')

module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        disableHostCheck: true,
        host: 'localdev.loe.june07.com',
        port: 443,
        https: {
            pfx: fs.readFileSync('20211114_90961a95.pfx'),
        },
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.worker.js$/,
                    loader: 'worker-loader',
                    options: {
                        /* ... */
                    },
                }
            ],
        },
    },
    chainWebpack: (config) => {
        config.resolve.symlinks(false)
    },
}
