import type { Content } from "@/global.type"

export type SortOption = {
  [key: string]: 'ascending' | 'descending' | undefined
}

export type SortedPosts = {
  pagesCount: number
  posts: Content[]
}

export type SortData = {
  title: string
  content: string
  author: string
}

export type SortInputProps = {
  sortDataName: keyof SortData
  sortData: SortData
  changeSortData: (name: string, value: any) => void
}

export type SortTagsProps = {
  removeTag: (tag: string) => void
  tags: string[]
}