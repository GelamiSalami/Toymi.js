
import terser from '@rollup/plugin-terser';

const builds = [
{
	input: "src/Toymi.js",
	output: {
		file: "build/toymi.module.js",
		format: "esm"
	},
	plugins: [
	]
},
{
	input: "src/Toymi.js",
	output: {
		file: "build/toymi.js",
		name: "Toymi",
		format: "cjs"
	},
	plugins: [
	]
},
{
	input: "src/Toymi.js",
	output: {
		file: "build/toymi.module.min.js",
		format: "esm"
	},
	plugins: [
		terser()
	]
},
{
	input: "src/Toymi.js",
	output: {
		file: "build/toymi.min.js",
		format: "cjs"
	},
	plugins: [
		terser()
	]
}];

export default builds;