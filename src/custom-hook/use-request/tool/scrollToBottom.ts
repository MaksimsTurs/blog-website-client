import type { MutableRefObject } from "react"

export default function scrollToBottom(isPending: boolean, isFirstRender: MutableRefObject<boolean>, slideOnRequestEnd?: boolean) {
  if(!isPending && slideOnRequestEnd) {
    if(!isFirstRender.current) setTimeout(() => window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight }), 100)
  }
}