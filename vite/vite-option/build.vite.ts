import type { BuildOptions, UserConfig } from 'vite'

import { IMG_REGEXP } from '../../const'

type Param = {
	isDev: boolean
	outDir: string
	input: string
	target?: BuildOptions['target']
	minify?: 'terser' | 'esbuild'
}

export default (param: Param): UserConfig => {
	return {
		build: {
			target: param.target || 'esnext',
			minify: param.isDev ? undefined : (param.minify || 'esbuild'),
			cssMinify: param.isDev ? undefined : 'esbuild',
			sourcemap: param.isDev ? false : 'hidden',
			outDir: param.outDir,
			emptyOutDir: true,
			chunkSizeWarningLimit: 200,
			reportCompressedSize: false,
			terserOptions: param.isDev ? undefined : {
				ecma: 2020,
				compress: {
					arguments: true,
					drop_console: true,
					drop_debugger: true,
					expression: true,
				},
			},
			rollupOptions: {
				input: param.input,
				output: {
					chunkFileNames: 'assets/js/[name].js',
					entryFileNames: 'assets/js/[name].js',
					assetFileNames: (assetInfo: any) => {
						let ext: string = assetInfo.name.split('.')[1]!

						if (IMG_REGEXP.test(ext)) ext = 'img'
		
						return `assets/${ext}/[name][extname]`
					},
				},
			},
		}
	}
}