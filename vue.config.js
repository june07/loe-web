const fs = require('fs')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
	transpileDependencies: ['vuetify'],
	devServer: {
		disableHostCheck: true,
		host: 'localdev.loe.june07.com',
		port: 443,
		https: {
			pfx: fs.readFileSync('20211114_90961a95.pfx'),
		}
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
				},
			],
		},
        plugins: [
            new InjectManifest({
                swSrc: './src/sw.js'
            })
        ]
	},
	chainWebpack: (config) => {
		config.resolve.symlinks(false)
	}
}
