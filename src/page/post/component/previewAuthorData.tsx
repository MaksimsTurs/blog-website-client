import scss from '../scss/previewAuthorData.module.scss'
import '@/scss/global.scss'

import { Link } from "react-router-dom"
import { ShieldHalf } from 'lucide-react'

import DateParser from '@/lib/date-parser/dateParser'
import firstLetterToUpperCase from '@/lib/string/props/firstLetterToUpperCase'

import ImageComponent from '@/component/image-component/image'

import type { PreviewAuthorDataProps } from '../page.type'

export default function PreviewAuthorData({ author }: PreviewAuthorDataProps) {
  const color = author.role === 'ADMIN' ? '#F48023' : '#1682FD'

  const createdAtDifference: string = DateParser
    .getDifference(author.createdAt)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: 'days [minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <div style={{ height: 'fit-content', flexShrink: 0 }} className='flex-column-center-normal-none main-content-container'>
      <ImageComponent classNames={{ img: scss.author_avatar, svg: scss.author_avatar }} src={author.avatar} alt={author.name}/>
      <div className='flex-column-center-normal-none'>
        <Link to={`/user/${author._id}`} className={scss.author_name}>{author.name}</Link>
        <div className='flex-row-center-center-medium' style={{ color }}>
          <ShieldHalf size={17}/>
          <p className={scss.author_role}>{firstLetterToUpperCase(author.role.toLowerCase())}</p>
        </div>
        <p className={scss.author_registrate_data}>{createdAtDifference}</p>
      </div>
    </div>
  )
}