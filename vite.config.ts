import { defineConfig as viteConfig } from 'vite'

import path from 'node:path'

import buildOption from './vite/vite-option/build.vite'
import resolveOption from './vite/vite-option/resolve.vite'
import serverOption from './vite/vite-option/server.vite'
import cssOption from './vite/vite-option/css.vite'

import chunksplitVite from './vite/vite-plugin/chunksplit.vite'
import duplicatescriptVite from './vite/vite-plugin/duplicatescript.vite'
import htmlpluginVite from './vite/vite-plugin/htmlplugin.vite'
import imageminVite from './vite/vite-plugin/imagemin.vite'
import optimizecssVite from './vite/vite-plugin/optimizecss.vite'
import reactswcVite from './vite/vite-plugin/reactswc.vite'
import webfontVite from './vite/vite-plugin/webfont.vite'

import { APP_TYPE, ASSETS_INCLUDE_EXTENSTIONS } from './const'

export default viteConfig(({ mode }) => {
	const isDev: boolean = mode === 'development' ? true : false
	const srcPath: string = path.resolve(__dirname, 'src')

	function resolve(_path: string): string {
		return path.resolve(__dirname, _path)
	}

	const DEV_PLUGINS = [
		webfontVite({	fonts: ['https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Sans:wght@400;700&display=swap'] }),
		reactswcVite()
	]

	const PROD_PLUGINS = [
		webfontVite({ fonts: ['https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Sans:wght@400;700&display=swap'] }),
		reactswcVite(),
		chunksplitVite(),
		imageminVite(),
		optimizecssVite(),
		htmlpluginVite(),
		duplicatescriptVite()
	]

	return {
		...resolveOption({ path: srcPath }),
		...serverOption({ open: false, path: resolve('src/**/*.*') }),
		...buildOption({ isDev, outDir: resolve('output'), input: resolve('src/index.html'), minify: 'terser', target: 'esnext' }),
		...cssOption(),
		publicDir: resolve('public'),
		appType: APP_TYPE,
		assetsInclude: ASSETS_INCLUDE_EXTENSTIONS,
		root: srcPath,
		clearScreen: false,
		plugins: isDev ? DEV_PLUGINS : PROD_PLUGINS
	}
})