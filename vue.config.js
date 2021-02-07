module.exports = {
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'MINESIN - Our Private SMP';
				return args;
			});
	},
	// publicPath: "/minecraft/"
	publicPath: "/minecraft"
};