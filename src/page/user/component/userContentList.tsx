import scss from '../scss/userContentList.module.scss'

import type { UserContentListProps } from '../page.type'

import Empty from '@/component/empty/empty'
import PaginationList from '@/component/pagination-list/paginationList'

import { MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserContentList({ userContent, user }: UserContentListProps) {
  return(
    <ul className={`${scss.user_data_user_content} main-content-container flex-column-normal-normal-small`}>
      <li className='flex-row-center-normal-medium'><MessageSquareText />{user.name} content</li>
      {(userContent.content || []).length > 0 ? <PaginationList pagesCount={userContent.pagesCount || 0}/> : null}
      {(userContent.content || []).length === 0 ? 
      <Empty option={{ size: 'SMALL', flexCenterCenter: true }} label='This author have no content!'/> : 
      userContent.content!.map(content => {
        const isPost: boolean = Boolean(content.title)
        const contentURL: string = isPost ? `/post/${content._id}` : `/post/${content.post?._id}#${content._id}`
        const contentContent: string = (content.post?.content || content.content)

        return(
          <li className='flex-column-normal-normal-small' key={content._id}>
            <Link className={scss.user_data_link} to={contentURL}>
              <p>{content.title || content.post?.title}</p>
              <p>{contentContent}</p>
            </Link>
         </li>
        )
      })}
      {(userContent.content || []).length > 0 ? <PaginationList pagesCount={userContent.pagesCount || 0}/> : null}
    </ul>
  )
}