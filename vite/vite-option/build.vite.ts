import type { UserConfig } from 'vite'

type Param = {
	isDev: boolean
	outDir: string
	input: string
}

export default (param: Param): UserConfig => {
	return {
		build: {
			target: 'esnext',
			minify: param.isDev ? 'esbuild' : 'terser',
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
					assetFileNames: (asset: any) => {
						let [fileName, fileExtention] = asset.name.split('.')

						if(/(jpeg|jpg|png|webp|gif)/.test(fileExtention))  fileExtention = 'img'
						if(/(woff|woff2|ttf)/.test(fileExtention)) 				 fileExtention = 'fonts'
						if(/css/.test(fileExtention))              				 fileExtention = 'css'
						if(/js/.test(fileExtention))                       fileExtention = 'js'
										
						return `assets/${fileExtention}/${fileName.replace(/js\//, '')}[extname]`
					},
					manualChunks: (path) => {
						let splitedPath: string[] = []
						let fileName: string = ''

						if(/page\.tsx/.test(path)) {
							splitedPath = path.split(/\//)
							fileName = splitedPath[splitedPath.length - 2]
							return `js/pages/${fileName}`
						}

						if(/index\.tsx/.test(path)) 	    return `${(Math.random() * 100).toString(16)}`
						if(/src\/component/.test(path))  	return 'js/components'
						if(/src\/custom-hook/.test(path)) return 'js/hooks'
						if(/src\/lib/.test(path)) 				return 'js/libs'			
						if(/react.+/.test(path))          return 'js/react-vendor'
						if(/src\/store/.test(path))       return 'js/stores'
					}
				}
			}
		}
	}
}