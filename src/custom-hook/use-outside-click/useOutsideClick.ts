import { useEffect } from "react";

import type { RefObject } from "react";

import { useSearchParams } from "react-router-dom";

export default function useOutsideClick(key: string, modalContainer: RefObject<HTMLElement>): boolean {
  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    modalContainer.current?.addEventListener('click', (event: any) => {
      if(event.target === event.currentTarget) {
        setSearchParams(prev => {
          prev.set(key, String(!prev.get(key)))
          return prev
        })
      }
    })
  }, [])

  return JSON.parse(searchParams.get(key) || 'false')
}