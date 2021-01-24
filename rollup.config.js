import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import babel from "rollup-plugin-babel"

// console.log(!undefined)
// console.log(process.env)
// console.log(process.env.ROLLUP_WATCH)
// console.log(process.env.IS_LEGACY_BUILD)
require('dotenv').config()
// console.log(process.env.ROLLUP_WATCH)
// console.log(process.env.IS_LEGACY_BUILD)

const production = !process.env.ROLLUP_WATCH;
const legacy = !!process.env.IS_LEGACY_BUILD;
console.log("production: ", production)
console.log("legacy: ", legacy)

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			},
		}),
		production &&
      babel({
        extensions: [".js", ".mjs", ".html", ".svelte"],
        runtimeHelpers: true,
        exclude: ["node_modules/@babel/**"],
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          [
            "@babel/plugin-transform-runtime",
            {
              useESModules: true,
            },
          ],
        ],
      }),
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
