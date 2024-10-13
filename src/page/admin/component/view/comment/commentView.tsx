import scss from './commentView.module.scss'

import Empty from '@/component/empty/empty'
import PaginationList from '@/component/pagination-list/paginationList'
import ImageComponent from '@/component/image-component/image'
import ViewWrapper from '../viewWrapper'
import CommentViewEdit from './commentViewEdit'
import DataBurgerWrapper from '../../data-render/dataBurgerWrapper'
import SimpleData from '../../data-render/simpleData'
import LocalError from '@/component/errors/local-error/localError'

import type { Content, User } from '@/global.type'
import type { ViewComponentProps } from '@/page/admin/page.type'

import DateParser from '@/lib/date-parser/dateParser'

import { Link } from 'react-router-dom'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

export default function CommentView({ data }: ViewComponentProps<Content>) {
  const searchParams = useSearchParams()

  const currLikePage: number = parseInt(searchParams.get('comment-likes-page') || '0')

  const likesStart: number = currLikePage * 10
  const likesEnd: number = likesStart + 10

  if(!data) return <LocalError error='Not found!'/>

  const currLikes: User[] = (data.likedBy.slice(likesStart, likesEnd) || []) as unknown as User[]

  const maxLikesPage: number = Math.ceil((data.likedBy?.length || 0) / 10)

  const createdAtDifference: string = DateParser
    .getDifference(data.createdAt)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: 'days [minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <ViewWrapper title={data?.author?.name || 'NO AUTHOR'} form={<CommentViewEdit defaultValue={data}/>}>
      <div className={`${scss.comment_body} flex-column-normal-normal-small`}>
        <SimpleData propKey='ID:' propValue={data._id} useCopyBoard/>
        <DataBurgerWrapper propKey='Auhor:'>
          {!data.author ? <div><Empty option={{ size: 'SMALL' }} label='No author found!'/></div> :
          <Link to={`/admin/user?id=${data.author._id}`} className={`${scss.comment_auhtor_container} flex-row-normal-normal-medium`}>
            <ImageComponent src={data.author.avatar} alt={data.author.name} />
            <div className={`${scss.comment_author_data_body} flex-column-normal-normal-none`}>
              <p>{data.author.name}</p>
              <p>{data.author.role}</p>
              <p>{data.author.email}</p>
            </div> 
          </Link>}
        </DataBurgerWrapper>
        <SimpleData propKey='Written at:' propValue={createdAtDifference}/>
        <SimpleData propKey='Is hidden:' propValue={data.isHidden ? 'Yes' : 'No'}/>
        <SimpleData propKey='Content:' propValue={`/post/${data._id}`} useLink/>
        <DataBurgerWrapper propKey='Likes:'>
          <div className={`${scss.comment_list_container} flex-row-normal-normal-none`}>
            {maxLikesPage > 1 ? <PaginationList pagesCount={maxLikesPage} listKey='coment-likes'/> : null}
            {currLikes.length === 0 ? <Empty option={{ size: 'SMALL' }} label='No body have liked!'/> :
            <ul className={scss.comment_list_body}>
              {currLikes?.map(like => <Link to={`/admin/user?id=${like._id}`}><li key={like._id + Math.random() * 100} className='flex-row-center-normal-medium'><img src={like.avatar} alt={like.name}/><p>{like.name}</p></li></Link>)} 
            </ul>}
          </div>
        </DataBurgerWrapper>
      </div>
    </ViewWrapper>
  )
}