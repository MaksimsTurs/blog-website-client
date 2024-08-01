import scss from './scrollTo.module.scss'
import '@/scss/global.scss'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollTo() {
  const [isOnTop, setIsOnTop] = useState<boolean>(window.scrollX === 0)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setIsOnTop(document.body.getBoundingClientRect().top === 0)
    })
  }, [])

  const scrollTo = (to: 'top' | 'bottom'): void => {
    const top: number = to === 'top' ? 0 : document.body.scrollHeight
    window.scrollTo({ behavior: 'smooth', top })
  }

  return <div className={`${scss.scroll_to_container} flex-row-center-center-none`}>{isOnTop ? <ChevronDown onClick={() => scrollTo('bottom')}/> : <ChevronUp onClick={() => scrollTo('top')}/>}</div>
}