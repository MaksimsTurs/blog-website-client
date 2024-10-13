import type { CSSProperties } from "react"

export type ImageComponentProps = { 
  src?: string
  alt: string 
  classNames?: { img?: string, loader?: string, svg?: string }
  styles?: { img?: CSSProperties, loader?: CSSProperties, svg?: CSSProperties }
}

export type ImageLoaderProps = { className?: string, style?: CSSProperties }

export type ImageCheckedUrlsMap = Map<string | undefined, string | undefined>