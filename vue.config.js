const fs = require('fs')

module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        disableHostCheck: true,
        host: 'localdev.loe.june07.com',
        port: 443,
        https: {
            crt: fs.readFileSync('localdev.crt'),
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
