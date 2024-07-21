import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

export default () => {
  return chunkSplitPlugin({
    strategy: 'default',
    useEntryName: true,
    customSplitting: {
      'react': [/react/, /lucide-react/, /react-dom/, /react-router-dom/],
    },
    customChunk(context) {
      const { file } = context
  
      const splitedString: string[] = file.split('/')
      const folderName: string = splitedString[1]
  
      if(splitedString.includes('page.tsx')) return `page/${folderName}`
    }
  })
}