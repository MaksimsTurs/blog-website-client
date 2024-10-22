import scss from './userView.module.scss'

import Empty from "@/component/empty/empty";
import PaginationList from "@/component/pagination-list/paginationList";
import DataBurgerWrapper from "../../data-render/dataBurgerWrapper";
import SimpleData from "../../data-render/simpleData";
import ViewWrapper from '../viewWrapper';
import UserViewEdit from './userViewEdit';
import LocalError from '@/component/errors/local-error/localError';

import type { Content, User } from "@/global.type";
import type { ViewComponentProps } from "@/page/admin/page.type";

import DateParser from "@/lib/date-parser/dateParser";
import Objects from "@/lib/object/object";

import { Link } from "react-router-dom";

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import ImageComponent from '@/component/image-component/image';

export default function UserView({ data }: ViewComponentProps<User>) {
  const searchParams = useSearchParams()

  if(!data) return <LocalError error='Not found!'/>

  const currMyContentPage: number = parseInt(searchParams.get('user-content') || '0')
  const currMyLikesPage: number = parseInt(searchParams.get('my-likes') || '0')

  const myContentStart: number = currMyContentPage * 10
  const myContentEnd: number = myContentStart + 10

  const myLikesStart: number = currMyLikesPage * 10
  const myLikesEnd: number = myLikesStart + 10

  const currMyContent: Content[] = (data.myContent?.slice(myContentStart, myContentEnd) || []) as unknown as Content[]
  const currMyLikes: Content[] = (data.likedContent.slice(myLikesStart, myLikesEnd) || []) as unknown as Content[]
  
  const maxMyContentPage: number = Math.ceil(currMyContent.length / 10)
  const maxMyLikesPage: number = Math.ceil(currMyLikes.length / 10)
  
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

  const banedToTime: string = DateParser
    .getDifference(data.ban)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: 'days [minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <ViewWrapper title={data.name} form={<UserViewEdit defaultValue={data}/>}>
      <ImageComponent classNames={{ img: scss.user_data_avatar, svg: scss.user_data_avatar, loader: scss.user_data_avatar }} src={data.avatar} alt={`Avatar von ${data.name}`}/>
      <SimpleData propKey="ID:" propValue={data._id} useCopyBoard/>
      <SimpleData propKey="Email:" propValue={data.email} useCopyBoard/>
      <SimpleData propKey="Name:" propValue={data.name}/>
      <SimpleData propKey="Role:" propValue={data.role}/>
      <SimpleData propKey="Registrated:" propValue={createdAtDifference}/>
      <SimpleData propKey="Ban for:" propValue={banedToTime}/>
      <DataBurgerWrapper propKey={`${data.name} content:`}>
        <ul className={scss.user_user_content}>
          {maxMyContentPage > 1 ? <PaginationList pagesCount={maxMyContentPage} listKey='user-content'/> : null}
          {currMyContent.length === 0 ? <Empty option={{ flexCenterCenter: true, size: 'SMALL' }} label='User have no content!'/> :
          currMyContent.map(content => 
          <Link key={Math.random() * 99999} to={`/admin/${Objects.inObject<Content>(content, ['viewedBy']) ? 'post' : 'comment'}?id=${content._id}`}>
            <li key={content._id} className='flex-column-normal-normal-none'>
              <h5>{content.title}</h5>
              <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Likes:</p><p>{content.likedBy.length}</p></section>
              {content.viewedBy ? <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Views:</p><p>{content.viewedBy.length}</p></section> : null}
              {content.comments ? <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Comments:</p><p>{content.comments.length}</p></section> : null}
            </li>
          </Link>)}
        </ul>
      </DataBurgerWrapper>
      <DataBurgerWrapper propKey={`${data.name} likes:`}>
        <ul className={scss.user_user_content}>
          {maxMyLikesPage > 1 ? <PaginationList pagesCount={maxMyLikesPage} listKey='my-likes'/> : null}
          {currMyLikes.length === 0 ? <Empty option={{ flexCenterCenter: true, size: 'SMALL' }} label='User have not liked some one content!'/> :
          currMyLikes.map(content => 
          <li key={content._id} className='flex-column-normal-normal-none'>
            <h5>{content.title}</h5>
            <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Likes:</p><p>{content.likedBy.length}</p></section>
            <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Views:</p><p>{content.viewedBy!.length}</p></section>
            <section className={`${scss.user_data_container} flex-row-normal-normal-big`}><p>Comments:</p><p>{content.comments!.length}</p></section>
          </li>)}
        </ul>
      </DataBurgerWrapper>
    </ViewWrapper>
  )
}