import scss from '../scss/adminActionButton.module.scss'
import '@/scss/global.scss'

import { Pencil, Trash2 } from "lucide-react"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import type { AdminActionButtonProps, ContentData } from '../page.type'
import type { Content } from '@/global.type'
import type { SyntheticEvent } from 'react'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/_useRequest'

import fetcher from '@/lib/fetcher/fetcher'
import coockie from '@/lib/coockie/coockie'
import firstLetterToUpperCase from '@/lib/first-letter-to-upper/firstLetterToUpper'
import localStorage from '@/lib/local-storage/localStorage'

export default function AdminActionButton({ optionAction, contentData }: AdminActionButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const redirect = useNavigate()
  const { tab } = useParams()

  const tabs: string[] = ['user', 'comment', 'post']

  const toPreview: string = !tabs.includes(tab || '') ? 'post' : tab!
  const toPreviewID: string = searchParams.get('id')!
  const currPage: number = parseInt(searchParams.get('page') || '0')

  const { mutate } = useRequest({ deps: [] })

  const action = (): void => {
    if(optionAction.actionType === 'edit') {
      if(!contentData) return searchParams.set({ 'user-edit-modal': true })

      localStorage.set(contentData._id!, {...contentData, isEdit: true, isFromAdmin: true, contentType: toPreview, onPage: currPage })
      return redirect(`/write-post?content-id=${contentData._id}`)
    }
    
    mutate<ContentData<Content>>({
      key: [`${toPreview}-${currPage}`],
      request: async (option) => {
        const content = await fetcher.post<Content>(`/admin/remove/${firstLetterToUpperCase(tab!)}/${toPreviewID}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })

        if(option.state?.data.length === 1) redirect(`/admin/${tab}?page=${currPage - 1 <= 0 ? 0 : currPage - 1}`)
        else redirect(`/admin/${tab}?page=${currPage}`)
        return { pagesCount: option.state?.pagesCount || 0, data: option.state?.data.filter(item => item._id !== content._id) || [] }
      }
    })
  }
    
  const actions = {
    remove: { icon: <Trash2 color={isHovered ? '#8a0000' : 'white'}/>, color: '#8a0000' },
    edit:   { icon: <Pencil color={isHovered ? '#F48023' : 'white'}/>, color: '#F48023' }
  }

  const buttonColors = {
    backgroundColor: actions[optionAction.actionType].color,
    border: `1px solid ${actions[optionAction.actionType].color}`
  }

  const hover = (event: SyntheticEvent): void => {
    if(event.type === 'mouseleave') setIsHovered(false)
    else setIsHovered(true)
  }

  return (
    <button 
      onMouseEnter={hover} 
      onMouseLeave={hover} 
      onClick={action} 
      style={buttonColors} 
      className={`${scss.admin_action_button}`}>
        <section className='flex-row-center-center-none'>{actions[optionAction.actionType].icon}</section>
    </button>
  )
}