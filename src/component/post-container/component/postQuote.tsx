import scss from '../scss/postQuotes.module.scss'
import '@/scss/global.scss'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import ContentViewer from '@/component/content-viewer/contentViewer'

import type { PostQuotesProps } from '../postContainer.type'

export default function PostQuotes({ content }: PostQuotesProps) {
  const [isExpandend, setIsExpandend] = useState<boolean>(false)

  const changeQuoteState = (): void => {
    setIsExpandend(prev => !prev)
  }

  return(
    <div className={`${scss.post_quotes_container} main-content-container`}>
      <div className={`${scss.post_quotes_header} flex-row-center-space-between-medium`} onClick={changeQuoteState}>
        <p>Zitate von {content.author?.name}</p>
        {isExpandend ? <ChevronDown/> : <ChevronRight/>}
      </div>
      <div className={isExpandend ? `${scss.post_quote_container_expanded} ${scss.post_quote_content_container}` : scss.post_quote_content_container}>
        <ContentViewer content={content.content}/>
      </div> 
    </div>
  )
}