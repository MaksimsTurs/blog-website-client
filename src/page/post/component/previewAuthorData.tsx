import scss from '../scss/previewAuthorData.module.scss'
import '@/scss/global.scss'

import { Link } from "react-router-dom"

import DateParser from '@/lib/date-parser/dateParser'

import type { PreviewAuthorDataProps } from '../page.type'
import { ShieldHalf } from 'lucide-react'

export default function PreviewAuthorData({ author }: PreviewAuthorDataProps) {
  const color = author.role === 'Admin' ? '#F48023' : '#1682FD'

  return(
    <div style={{ height: 'fit-content', flexShrink: 0 }} className='flex-column-center-normal-none main-content-container'>
      <img src={author.avatar} alt={author.name} />
      <div className='flex-column-center-normal-none'>
        <Link to={`/user/${author._id}`} className={scss.author_name}>{author.name}</Link>
        <div className='flex-row-center-center-medium' style={{ color }}>
          <ShieldHalf size={17}/>
          <p className={scss.author_role}>{author.role}</p>
        </div>
        <p className={scss.author_registrate_data}>{DateParser.getDifference(author.createdAt)}</p>
      </div>
    </div>
  )
}