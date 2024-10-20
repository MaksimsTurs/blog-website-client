import scss from './scrollTo.module.scss'
import '@/scss/global.scss'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollTo() {
  const [isOnTop, setIsOnTop] = useState<boolean>(window.scrollX === 0)

  useEffect(() => {
    document.addEventListener('scroll', (): void => {
      const documentHeight: number = document.body.scrollHeight / 2
      const viewMiddle: number = (window.scrollY + window.innerHeight)

      setIsOnTop(!(documentHeight <= viewMiddle))
    })
  }, [])

  const scrollTo = (to: 'top' | 'bottom'): void => {
    const top: number = to === 'top' ? 0 : document.body.scrollHeight
    window.scrollTo({ behavior: 'smooth', top })
  }

  return(
    <div className={scss.scroll_to_container}>
      <div className={`${scss.scroll_to_body} flex-row-center-center-none`}>
        {isOnTop ? <ChevronDown onClick={() => scrollTo('bottom')}/> : <ChevronUp onClick={() => scrollTo('top')}/>}  
      </div>
    </div>
  )
}