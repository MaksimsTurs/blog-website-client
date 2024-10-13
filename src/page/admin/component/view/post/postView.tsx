import scss from './postView.module.scss'

import type { Content, User } from "@/global.type";
import type { ViewComponentProps } from "../../../page.type";

import Empty from "@/component/empty/empty";
import PaginationList from "@/component/pagination-list/paginationList";
import DateParser from "@/lib/date-parser/dateParser";
import DataBurgerWrapper from "../../data-render/dataBurgerWrapper";
import SimpleData from "../../data-render/simpleData";
import ImageComponent from '@/component/image-component/image';
import PostViewEdit from './postViewEdit';
import ViewWrapper from '../viewWrapper';
import LocalError from '@/component/errors/local-error/localError';

import { Link } from "react-router-dom";

import useSearchParams from "@/custom-hook/use-search-params/useSearchParams";

export default function PostView({ data }: ViewComponentProps<Content>) {
  const searchParams = useSearchParams()

  if(!data) return <LocalError error='Not found!'/>

  const currViewPage: number = parseInt(searchParams.get('views-page') || '0')
  const currLikePage: number = parseInt(searchParams.get('likes-page') || '0')

  const viewsStart: number = currViewPage * 10
  const viewsEnd: number = viewsStart + 10

  const likesStart: number = currLikePage * 10
  const likesEnd: number = likesStart + 10
  
  const currViews: User[] = (data.viewedBy?.slice(viewsStart, viewsEnd) || []) as unknown as User[]
  const currLikes: User[] = (data.likedBy.slice(likesStart, likesEnd) || []) as unknown as User[]

  const maxViewsPage: number = Math.ceil(currViews.length / 10)
  const maxLikesPage: number = Math.ceil(currLikes.length / 10)
    
  const createdAtDifference: string = DateParser
    .getDifference(data.createdAt)
    .getSortDate({
      year: '[year] years [month] months ago!',
      month: '[month] months [day] days ago!',
      day: '[day] days [hour] hours ago!',
      hour: '[hour] hours [minute] minutes ago!',
      minute: '[minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })
  
  const updatedAtDifference: string = DateParser
    .getDifference(data.updatedAt)
    .getSortDate({
      year: '[year] years [month] months ago!',
      month: '[month] months [day] days ago!',
      day: '[day] days [hour] hours ago!',
      hour: '[hour] hours [minute] minutes ago!',
      minute: '[minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <ViewWrapper title={data.title!} form={<PostViewEdit defaultValue={data}/>}>
      <div className={`${scss.post_body} flex-column-normal-normal-small`}>
        <DataBurgerWrapper propKey='Auhor:'>
          {!data.author ? <Empty option={{ size: 'SMALL' }} label='No author found!'/> :
          <Link to={`/admin/user?id=${data.author._id}`} className={`${scss.post_auhtor_container} flex-row-normal-normal-medium`}>
            <ImageComponent classNames={{ svg: scss.post_user_avatar, img: scss.post_user_avatar }} src={data.author.avatar} alt={data.author.name} />
            <div className={`${scss.post_author_data_body} flex-column-normal-normal-none`}>
              <p>{data.author.name}</p>
              <p>{data.author.role}</p>
              <p>{data.author.email}</p>
            </div> 
          </Link>}
        </DataBurgerWrapper>
        <DataBurgerWrapper propKey='Views:'>
          <div className={`${scss.post_list_container} flex-column-normal-normal-none`}>
            {maxViewsPage > 1 ?  <PaginationList pagesCount={maxViewsPage} listKey='views'/> : null}
            {currViews.length === 0 ? <Empty option={{ size: 'SMALL' }} label='No body have viewed!'/> :
            <ul className={scss.post_list_body}>
              {currViews?.map(view => 
              <Link to={`/admin/user?id=${view._id}`}>
                <li key={`${view._id + Math.random() * 100}`} className='flex-row-center-normal-medium'>
                  <ImageComponent classNames={{ svg: scss.post_user_avatar, img: scss.post_user_avatar }} src={view.avatar} alt={view.name}/>
                  <p>{view.name}</p>
                </li>
              </Link>)} 
            </ul>}
          </div>
        </DataBurgerWrapper>
        <DataBurgerWrapper propKey='Likes:'>
          <div className={`${scss.post_list_container} flex-column-normal-normal-none`}>
            {maxLikesPage > 1 ? <PaginationList pagesCount={maxLikesPage} listKey='likes'/> : null}
            {currLikes.length === 0 ? <Empty option={{ size: 'SMALL' }} label='No body have liked!'/> :
            <ul className={scss.post_list_body}>
              {currLikes?.map(like => 
              <Link to={`/admin/user?id=${like._id}`}>
                <li key={`${like._id + Math.random() * 100}`} className='flex-row-center-normal-medium'>
                  <ImageComponent classNames={{ svg: scss.post_user_avatar, img: scss.post_user_avatar }} src={like.avatar} alt={like.name}/>
                  <p>{like.name}</p>
                </li>
              </Link>)} 
            </ul>}
          </div>
        </DataBurgerWrapper>
        <SimpleData propKey='ID:' propValue={data._id} useCopyBoard/>
        <SimpleData propKey='Title:' propValue={data.title}/>
        <SimpleData propKey='Is hidden:' propValue={data.isHidden ?  'Yes' : 'No'}/>
        <SimpleData propKey='Tags:' propValue={data.tags?.join(', ') || 'No tags'}/>
        <SimpleData propKey='Created at:' propValue={createdAtDifference}/>
        <SimpleData propKey='Updated at:' propValue={updatedAtDifference}/>
        <SimpleData propKey='Link to post:' propValue={`/post/${data._id}`} useLink/>
      </div>
    </ViewWrapper>
  )
}