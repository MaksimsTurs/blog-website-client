import type { Content } from "@/global.type"

export type SortOption = {
  [key: string]: 'ascending' | 'descending' | undefined
}

export type SortedPosts = {
  pagesCount: number
  posts: Content[]
}

export type FilterOptions = {
  title: string
  content: string
  author: string
  sortOption?: SortOption
}

export type FilterInputProps = {
  filterDataName: keyof FilterOptions
  filterData: FilterOptions
  changeFilterData: (name: string, value?: any) => void
}

export type SortTagsProps = {
  removeTag: (tag: string) => void
  tags: string[]
}