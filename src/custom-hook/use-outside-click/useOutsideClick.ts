import { useEffect } from "react";

import type { RefObject } from "react";

import { useSearchParams } from "react-router-dom";

export default function useOutsideClick(key: string, modalContainer: RefObject<HTMLElement>): boolean {
  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    const outsideModalClick = (event: any): void => {
      if(event.target === event.currentTarget) {
        setSearchParams(prev => {
          prev.delete(key)
          return prev
        }, { replace: true })
      }
    }

    modalContainer.current?.addEventListener('click', outsideModalClick)

    return () => {
      modalContainer.current?.removeEventListener('click', outsideModalClick)
    }
  }, [searchParams.get(key)])

  return JSON.parse(searchParams.get(key) || 'false')
}