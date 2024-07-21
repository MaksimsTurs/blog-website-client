import scss from '../scss/postTags.module.scss'
import '@/scss/global.scss'

import type { PostTagsProps } from '../postContainer.type'

import { Link } from 'react-router-dom'

export default function PostTags({ tags }: PostTagsProps) {
  return <div className={`${scss.post_tags} flex-row-normal-normal-medium`}>{tags.map(tag => tag.trim() ? <Link to={`/search?tag=${tag}`} key={tag}>{tag}</Link> : null)}</div>
}