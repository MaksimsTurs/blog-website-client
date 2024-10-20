import { useEffect, useState } from "react";
import { CheckImageState } from "./useCheckImageURL.type";
import { KeyValueObject } from "@/global.type";
import localStorage from "@/lib/local-storage/localStorage";

export default function useCheckImageURL(url?: string) {
  const [imageState, setImageState] = useState<CheckImageState>({ isLoading: true })

  const LOCAL_STORAGE_KEY: string = 'checked-urls',
        UNDEFINED_URL_PLACEHOLDER: string = 'NO URL'
  
  let checkedURLsObject: KeyValueObject<boolean> | null = localStorage.get<KeyValueObject<boolean>>(LOCAL_STORAGE_KEY, 'null')
  
  if(!checkedURLsObject) checkedURLsObject = {}

  useEffect(() => {
    const check = async () => {
      if(checkedURLsObject[url!]) {
        setImageState({ isLoading: false, imageSrc: url! })
        return
      } else if((typeof checkedURLsObject[url || UNDEFINED_URL_PLACEHOLDER] === 'boolean') && !checkedURLsObject[url || UNDEFINED_URL_PLACEHOLDER]) {
        setImageState({ isLoading: false })
        return
      }
  
      try {
        const checked = await fetch(url || '')
  
        if(!checked.ok) {
          checkedURLsObject[url || UNDEFINED_URL_PLACEHOLDER] = false
          setImageState({ isLoading: false })
          return
        }
  
        checkedURLsObject[url!] = true
        setImageState({ isLoading: false, imageSrc: url! })
      } catch(error) {
        checkedURLsObject[url || UNDEFINED_URL_PLACEHOLDER] = false
        setImageState({ isLoading: false })
      } 
    }

    check().then(() => localStorage.set(LOCAL_STORAGE_KEY, checkedURLsObject))
  }, [])

  return imageState
}