import scss from './contentViewer.module.scss'
import './content.scss'
import '@/scss/global.scss'

import type { ContentViewerProps } from "./contentViewer.type";

import { CSSProperties, useEffect, useState } from "react";
import { Pencil, X } from 'lucide-react'

import ContentParseError from './parser/contentParsingError';
import ContentParser from './parser/contentParser';

import useWebsiteSetting from '@/custom-hook/use-website-setting/useWebsiteSetting';

export default function ContentViewer({ content, className }: ContentViewerProps) {
  const [parsed, setParsed] = useState<string>('')
  const [parseError, setParseError] = useState<string>('')

  const website = useWebsiteSetting()

  const style: CSSProperties = {
    fontFamily: website.setting.postFont,
    fontSize: website.setting.postFontSize
  }

  useEffect(() => {
    try {
      setParsed(ContentParser.benchmark.getParsingBenchmarkResultAndParsedContent(content || ''))
      setParseError('')
    } catch(error) {
      setParseError((error as ContentParseError).message)
    }
  }, [])

  return(
    <div style={style} className={`${scss.content_viewer_container} ${className}`} dangerouslySetInnerHTML={parsed ? { __html: parsed } : undefined}>
      {parseError ? <div className={`${scss.content_view_parse_error} flex-row-center-center-medium`}><X/>{parseError}</div> :
       parsed.length === 0 ? <div className={`${scss.content_viewer_post_empty} flex-row-center-center-big`}><Pencil /><p>Post is empty</p></div> : null}
    </div>
  )
}