
import terser from '@rollup/plugin-terser';

export default {
	input: "src/Toymi.js",
	output: {
		file: "build/toymi.min.js",
		format: "cjs"
	},
	plugins: [
		terser()
	]
};