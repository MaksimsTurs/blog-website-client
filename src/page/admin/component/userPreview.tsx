import scss from '../scss/userPreview.module.scss'
import '@/scss/global.scss'

import DataWrapper from './data-render/dataWrapper'

import type { UserPreviewProps } from '../page.type'

import DateParser from '@/lib/date-parser/dateParser'

export default function UserPreview({ user }: UserPreviewProps) {
  const roleKeyColor: string = user.role === 'Admin' ? '#F48023' : '#1682FD'

  return(
    <DataWrapper id={user._id}>
      <div className='flex-column-normal-normal-none'>
        <div className='flex-row-normal-normal-medium'>
          <img className={scss.user_preview_author} src={user.avatar} alt={user.name} />
          <div>
            <p className={scss.user_preview_name}>{user.name}</p>
            <p className={scss.user_preview_registrated}>{DateParser.getDifference(user.createdAt)}</p>
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