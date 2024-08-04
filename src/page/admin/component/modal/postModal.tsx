import scss from '../../scss/modal/postModal.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom';

import type { Content, User } from "@/global.type";

import DateParser from '@/lib/date-parser/dateParser';

import SimpleData from '../data-render/simpleData';
import Empty from '@/component/empty/empty';
import DataModalWrapper from '../data-render/dataModalWrapper';
import DataBurgerWrapper from '../data-render/dataBurgerWrapper';
import PaginationList from '@/component/pagination-list/paginationList';
import AdminActionButton from '../adminActionButton';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

export default function PostModal() {
  const searchParams = useSearchParams()

  const currViewPage: number = parseInt(searchParams.get('views-page') || '0')
  const currLikePage: number = parseInt(searchParams.get('likes-page') || '0')

  const viewsStart: number = currViewPage * 10
  const viewsEnd: number = viewsStart + 10

  const likesStart: number = currLikePage * 10
  const likesEnd: number = likesStart + 10

  return(
    <DataModalWrapper<Content> Component={props => {
      const currViews: User[] = (props.data.viewedBy?.slice(viewsStart, viewsEnd) || []) as unknown as User[]
      const currLikes: User[] = (props.data.likedBy.slice(likesStart, likesEnd) || []) as unknown as User[]

      const maxViewsPage: number = Math.ceil(currViews.length / 10)
      const maxLikesPage: number = Math.ceil(currLikes.length / 10)

      const createdAtDifferenceUser: string = DateParser
        .getDifference(props.data.author?.createdAt)
        .getSortDate({
          year: '[year] years [month] months ago!',
          month: '[month] months [day] days ago!',
          day: '[day] days [hour] hours ago!',
          hour: '[hour] hours [minute] minutes ago!',
          minute: '[minute] minutes [second] seconds ago!',
          second: '[second] seconds ago!'
        })
        
      const createdAtDifferencePost: string = DateParser
        .getDifference(props.data.author?.createdAt)
        .getSortDate({
          year: '[year] years [month] months ago!',
          month: '[month] months [day] days ago!',
          day: '[day] days [hour] hours ago!',
          hour: '[hour] hours [minute] minutes ago!',
          minute: '[minute] minutes [second] seconds ago!',
          second: '[second] seconds ago!'
        })
      
      const updatedAtDifferencePost: string = DateParser
        .getDifference(props.data.author?.createdAt)
        .getSortDate({
          year: '[year] years [month] months ago!',
          month: '[month] months [day] days ago!',
          day: '[day] days [hour] hours ago!',
          hour: '[hour] hours [minute] minutes ago!',
          minute: '[minute] minutes [second] seconds ago!',
          second: '[second] seconds ago!'
        })

      return(
        <div style={{ width: '50rem', position: 'relative' }} className='flex-column-normal-normal-small'>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', position: 'absolute', right: '-7%', zIndex: '-1', top: '-1.3%' }} className='flex-column-normal-normal-small'>
            <AdminActionButton optionAction={{ actionType: 'remove' }}/>
            <AdminActionButton optionAction={{ actionType: 'edit' }} contentData={props.data}/>
          </div>
          <DataBurgerWrapper propKey='Auhor:'>
            {!props.data.author ? 
              <div><Empty option={{ size: 'SMALL' }} label='No author found!'/></div> :
              <Link to={`/admin/user?id=${props.data.author._id}`} className={`${scss.post_auhtor_container} flex-row-normal-normal-medium`}>
                <img src={props.data.author.avatar} alt={props.data.author.name} />
                <div className={`${scss.post_author_data_body} flex-column-normal-normal-none`}>
                  <p>{props.data.author.name}</p>
                  <p>{props.data.author.role}</p>
                  <p>{createdAtDifferenceUser}</p>
                  <p>{props.data.author.email}</p>
                </div> 
              </Link>}
          </DataBurgerWrapper>
          <DataBurgerWrapper propKey='Views:'>
              <div className={`${scss.post_list_container} flex-column-normal-normal-none`}>
                {maxViewsPage > 1 ?  <PaginationList pagesCount={maxViewsPage} listKey='views'/> : null}
                {currViews.length === 0 ? 
                  <Empty option={{ size: 'SMALL' }} label='No body have viewed!'/> :
                  <ul className={scss.post_list_body}>
                    {currViews?.map(view => <Link to={`/admin/user?id=${view._id}`}><li key={`${view._id + Math.random() * 100}`} className='flex-row-center-normal-medium'><img src={view.avatar} alt={view.name}/><p>{view.name}</p></li></Link>)} 
                  </ul>}
              </div>
          </DataBurgerWrapper>
          <DataBurgerWrapper propKey='Likes:'>
              <div className={`${scss.post_list_container} flex-column-normal-normal-none`}>
                {maxLikesPage > 1 ? <PaginationList pagesCount={maxLikesPage} listKey='likes'/> : null}
                {currLikes.length === 0 ? 
                <Empty option={{ size: 'SMALL' }} label='No body have liked!'/> :
                <ul className={scss.post_list_body}>
                  {currLikes?.map(like => <Link to={`/admin/user?id=${like._id}`}><li key={`${like._id + Math.random() * 100}`} className='flex-row-center-normal-medium'><img src={like.avatar} alt={like.name}/><p>{like.name}</p></li></Link>)} 
                </ul>}
              </div>
          </DataBurgerWrapper>
          <SimpleData propKey='ID:' propValue={props.data._id} useCopyBoard/>
          <SimpleData propKey='Title:' propValue={props.data.title}/>
          <SimpleData propKey='Is hidden:' propValue={props.data.isHidden ?  'Yes' : 'No'}/>
          <SimpleData propKey='Tags:' propValue={props.data.tags?.join(', ') || 'No tags'}/>
          <SimpleData propKey='Created at:' propValue={createdAtDifferencePost}/>
          <SimpleData propKey='Updated at:' propValue={updatedAtDifferencePost}/>
          <SimpleData propKey='Content:' propValue={`/post/${props.data._id}`} useLink/>
        </div>
      )
    }}/>
  )
}