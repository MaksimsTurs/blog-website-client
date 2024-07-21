import scss from './contentViewer.module.scss'
import './content.scss'
import '@/scss/global.scss'

import type { ContentViewerProps } from "./contentViewer.type";

import { useMemo } from "react";
import { Pencil } from 'lucide-react'

import parseContent from "@/component/content-viewer/parser/parseContent";

export default function ContentViewer({ content, className }: ContentViewerProps) {
  const parsedContent = useMemo(() => parseContent(content || ''), [content])

  return(
    <div className={`${scss.content_viewer_container} ${className} flex-column-flex-start-normal-none`} dangerouslySetInnerHTML={parsedContent ? { __html: parsedContent } : undefined}>
      {parsedContent.length === 0 ? <div className={`${scss.content_viewer_post_empty} flex-row-center-center-big`}><Pencil /><p>Post is empty</p></div> : null}
    </div>
  )
}