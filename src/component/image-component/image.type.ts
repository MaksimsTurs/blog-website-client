import type { CSSProperties } from "react"

export type ImageComponentProps = { src: string, classNames?: { img?: string, loader?: string }, styles?: { img?: CSSProperties, loader?: CSSProperties }, alt: string }

export type ImageLoaderProps = { className?: string, style?: CSSProperties }