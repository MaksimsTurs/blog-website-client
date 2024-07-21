import { createHtmlPlugin } from 'vite-plugin-html'

export default () => {
  return createHtmlPlugin({ 
    minify: true
  })
}