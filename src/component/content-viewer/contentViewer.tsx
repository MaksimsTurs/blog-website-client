import scss from './contentViewer.module.scss'
import './content.scss'
import '@/scss/global.scss'

import type { ContentViewerProps } from "./contentViewer.type";

import { useEffect, useState } from "react";
import { Pencil, X } from 'lucide-react'

import ContentParseError from './parser/contentParseError';
import parse from './parser/parse';

export default function ContentViewer({ content, className }: ContentViewerProps) {
  const [parsed, setParsed] = useState<string>('')
  const [parseError, setParseError] = useState<string>('')

  useEffect(() => {
    try {
      console.time('Parsing time')
      setParsed(parse(content || ''))
      console.timeEnd('Parsing time')
      setParseError('')
    } catch(error) {
      setParseError((error as ContentParseError).message)
    }
  }, [])

  return(
    <div className={`${scss.content_viewer_container} ${className}`} dangerouslySetInnerHTML={parsed ? { __html: parsed } : undefined}>
      {parseError ? <div className={`${scss.content_view_parse_error} flex-row-center-center-medium`}><X/>{parseError}</div> :
       parsed.length === 0 ? <div className={`${scss.content_viewer_post_empty} flex-row-center-center-big`}><Pencil /><p>Post is empty</p></div> : null}
    </div>
  )
}