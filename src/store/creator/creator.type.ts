export type CreatorState = { 
  contentDraft: ContentDraft[] 
}

export type ContentDraft = { 
  _id: string
  content: string
  tags?: string[]
  title?: string
  isHidden?: boolean
}