module.exports = {
	entry: "./js/myown",
	output:{
		filename: "bundle.js"
	},
		module: {
			loaders: [
			{
				test: /\.scss$/,
				loaders: ["style","css","sass"]
			}
			]
		}
};