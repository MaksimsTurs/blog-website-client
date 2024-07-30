import scss from '../../scss/modal/commentModal.module.scss'

import DataModalWrapper from '../data-render/dataModalWrapper'
import SimpleData from '../data-render/simpleData'
import AdminActionButton from '../adminActionButton'
import DataBurgerWrapper from '../data-render/dataBurgerWrapper'
import Empty from '@/component/empty/empty'
import PaginationList from '@/component/pagination-list/paginationList'

import type { Content, User } from '@/global.type'

import DateParser from '@/lib/date-parser/dateParser'

import { Link } from 'react-router-dom'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

export default function CommentModal() {
  const searchParams = useSearchParams()

  const currLikePage: number = parseInt(searchParams.get('comment-likes-page') || '0')

  const likesStart: number = currLikePage * 10
  const likesEnd: number = likesStart + 10

  return(
    <DataModalWrapper<Content> Component={props => {
      const currLikes: User[] = (props.data.likedBy.slice(likesStart, likesEnd) || []) as unknown as User[]

      const maxLikesPage: number = Math.ceil((props.data.likedBy?.length || 0) / 10)
    
      return (
        <div className='flex-column-normal-normal-small'>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', position: 'absolute', right: '-12.5%', zIndex: '-1', top: '-2%' }} className='flex-column-normal-normal-small'>
            <AdminActionButton optionAction={{ actionType: 'remove' }}/>
            <AdminActionButton optionAction={{ actionType: 'edit' }} contentData={props.data}/>
          </div>
          <SimpleData propKey='ID:' propValue={props.data._id} useCopyBoard/>
          <SimpleData propKey='Written at:' propValue={DateParser.getDifference(props.data.createdAt)}/>
          <SimpleData propKey='Is hidden:' propValue={props.data.isHidden ? 'Yes' : 'No'}/>
          <SimpleData propKey='Content:' propValue={props.data.content} useParser/>
          <DataBurgerWrapper propKey='Auhor:'>
          {!props.data.author ? 
            <div><Empty option={{ size: 'SMALL' }} label='No author found!'/></div> :
            <Link to={`/admin/user?id=${props.data.author._id}`} className={`${scss.comment_auhtor_container} flex-row-normal-normal-medium`}>
              <img src={props.data.author.avatar} alt={props.data.author.name} />
              <div className={`${scss.comment_author_data_body} flex-column-normal-normal-none`}>
                <p>{props.data.author.name}</p>
                <p>{props.data.author.role}</p>
                <p>{DateParser.getDifference(props.data.author.createdAt)}</p>
                <p>{props.data.author.email}</p>
              </div> 
            </Link>}
          </DataBurgerWrapper>
          <DataBurgerWrapper propKey='Likes:'>
            <div className={`${scss.comment_list_container} flex-row-normal-normal-none`}>
              {maxLikesPage > 1 ? <PaginationList pagesCount={maxLikesPage} listKey='coment-likes'/> : null}
              {currLikes.length === 0 ? 
              <Empty option={{ size: 'SMALL' }} label='No body have liked!'/> :
              <ul className={scss.comment_list_body}>
                {currLikes?.map(like => <Link to={`/admin/user?id=${like._id}`}><li key={like._id + Math.random() * 100} className='flex-row-center-normal-medium'><img src={like.avatar} alt={like.name}/><p>{like.name}</p></li></Link>)} 
              </ul>}
            </div>
          </DataBurgerWrapper>
        </div>
      )}}/>
  )
}