import viteWebFont from 'vite-plugin-webfont-dl'

type Params = {
  fonts?: string[]
}

export default (params?: Params) => {
  return viteWebFont(params?.fonts, { 
    injectAsStyleTag: false, 
    embedFonts: false,
  })
}