import { useEffect } from "react"

export default function useMetadata(metadata: any): void {
  useEffect(() => {
    document.title = metadata.title
  
    for(let [key, value] of metadata?.meta) {
      const metadataEl = document.createElement('meta')
      metadataEl.name = key
      metadataEl.content = value
  
      document.head.appendChild(metadataEl)
    }
  }, [])
}