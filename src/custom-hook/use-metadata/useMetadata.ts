import { useEffect } from "react"

import type { Metadata } from "./useMetadata.type"

export default function useMetadata(metadata: Metadata): void {
  useEffect(() => {
    if(metadata.title) document.title = metadata.title
  }, [metadata])

  useEffect(() => {
    delete metadata.title

    const metaEntries: [string, string][] = Object.entries(metadata)
  
    for(let [key, value] of metaEntries) {
      const metadataEl: HTMLMetaElement = document.createElement('meta')
      
      metadataEl.name = key
      metadataEl.content = value
  
      document.head.appendChild(metadataEl)
    }
  }, [])
}