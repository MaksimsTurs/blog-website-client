import scss from './contentViewer.module.scss'
import './content.scss'
import '@/scss/global.scss'

import type { ContentViewerProps } from "./contentViewer.type";

import { useMemo } from "react";
import { Pencil } from 'lucide-react'

import parse from "@/component/content-viewer/parser/parse";

export default function ContentViewer({ content, className }: ContentViewerProps) {
  console.time('Parsing time')
  const parsedContent = useMemo(() => parse(content || ''), [content])
  console.timeEnd('Parsing time')

  return(
    <div className={`${scss.content_viewer_container} ${className}`} dangerouslySetInnerHTML={parsedContent ? { __html: parsedContent } : undefined}>
      {parsedContent.length === 0 ? <div className={`${scss.content_viewer_post_empty} flex-row-center-center-big`}><Pencil /><p>Post is empty</p></div> : null}
    </div>
  )
}