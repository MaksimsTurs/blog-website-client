import scss from '../scss/userPreview.module.scss'
import '@/scss/global.scss'

import DataWrapper from './data-render/dataWrapper'

import type { UserPreviewProps } from '../page.type'

import DateParser from '@/lib/date-parser/dateParser'

export default function UserPreview({ user }: UserPreviewProps) {
  const roleKeyColor: string = user.role === 'Admin' ? '#F48023' : '#1682FD'

  const createdAtDifference: string = DateParser
    .getDifference(user.createdAt)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: 'days [minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <DataWrapper id={user._id}>
      <div className='flex-column-normal-normal-none'>
        <div className='flex-row-normal-normal-medium'>
          <img className={scss.user_preview_author} src={user.avatar} alt={user.name} />
          <div>
            <p className={scss.user_preview_name}>{user.name}</p>
            <p className={scss.user_preview_registrated}>{createdAtDifference}</p>
          </div>
        </div>
        <div className={`${scss.user_preview_some_data} flex-row-normal-normal-none`}>
          <section className='flex-row-normal-normal-medium'>
            <p>Content:</p>
            <p>{(user.myContent || []).length}</p>
          </section>
          <section className='flex-row-normal-normal-medium'>
            <p>Liked:</p>
            <p>{(user.likedContent || []).length}</p>
          </section>
          <section className='flex-row-normal-normal-medium'>
            <p>Role:</p>
            <p style={{ color: roleKeyColor }}>{user.role}</p>
          </section>
        </div>        
      </div>
    </DataWrapper>
  )
}