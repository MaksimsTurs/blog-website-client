import scss from '../scss/contentPreview.module.scss'
import '@/scss/global.scss'

import DataWrapper from "./data-render/dataWrapper";

import type { ContentPreviewProps } from '../page.type';

import DateParser from '@/lib/date-parser/dateParser';

import { UserRoundX } from 'lucide-react';

export default function ContentPreview({ contentData, authorData }: ContentPreviewProps) {

  const createdAtDifference: string = DateParser
    .getDifference(contentData.createdAt)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: '[minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <DataWrapper id={contentData._id}>
      <div style={{ justifyContent: 'space-between' }} className='flex-column-normal-normal-medium'>
        {authorData ? 
        <div className='flex-row-normal-normal-medium'>
          <img className={scss.content_author_avatar} src={authorData.avatar} alt={authorData.name}/>
          <div className='flex-column-normal-norma-none'>
            <p className={scss.content_author_name}>{authorData.name}</p>
            <p className={scss.content_author_registrated}>{createdAtDifference}</p>
          </div>
        </div> : 
        <div className={`${scss.content_no_data_about_author} flex-row-center-normal-medium`}>
          <UserRoundX />
          <div>
            <p>Author not found!</p>
            <p className={scss.content_author_registrated}>{createdAtDifference}</p>
          </div>
        </div>}
        <p className={scss.content_content}>{contentData.content}</p>
      </div>
    </DataWrapper> 
  )
}