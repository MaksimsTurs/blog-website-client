import { useEffect, useState } from "react"

import type { RefObject } from "react"

export default function useOutsideClick(mainContainerRef: RefObject<HTMLElement>, buttonsRefs: RefObject<HTMLElement>[]) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener('click', (event) => {
      if(mainContainerRef.current?.contains(event.target as Node)) {
        for(let index: number = 0; index < buttonsRefs.length; index++) {
          if(buttonsRefs[index].current === event.target) setIsVisible(prev => !prev)
        }
        return
      } else {
        setIsVisible(false)
      }
    })
  }, [])

  return { isVisible, setIsVisible }
}