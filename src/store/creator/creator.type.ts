export type CreatorState = { 
  contentDraft: ContentDraft[] 
}

export type ContentDraft = { 
  _id: string
  content: string
  tags?: string[]
  title?: string
  isFromAdmin?: boolean
  isEdit?: boolean
  //Some infromation for updating post/comment in other pages
  contentType?: 'post' | 'comment'
  onPage?: number
  onPost?: string
  isHidden?: boolean
}