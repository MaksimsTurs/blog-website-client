import scss from '../../scss/data-render/dataModalWrapper.module.scss'
import '@/scss/global.scss'

import type { ContentData, DataModalWrapperProps } from '../../page.type'

import { X } from 'lucide-react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/use-request/useRequest'

import CharacterArray from '@/lib/string/strings'

import DataModalWrapperLoader from '../dataModalWrapperLoader'
import LocalError from '@/component/errors/local-error/localError'
import XButton from '@/component/buttons/x-button/xbutton'

export default function DataModalWrapper<T>({ Component }: DataModalWrapperProps<T>) {
  const searchParams = useSearchParams()
  const { tab } = useParams()

  const tabs: string[] = ['comment', 'post', 'user']

  const toPreview: string = !tabs.includes(tab || '') ? 'post' : tab!
  const toPreviewID: string = searchParams.get('id')!
  const currPage: string = searchParams.get('page') || '0'

  const { data, isPending } = useRequest<ContentData<T & { _id: string }>>({ deps: [`${toPreview}-${currPage}`] })

  const itemToPreview: T | undefined = data?.data && data.data.find(item => item._id === toPreviewID)

  const closeModal = (): void => {
    searchParams.remove(['id'])
  }

  return(
    <Fragment>
      {toPreviewID ? 
      <div className={`${scss.modal_wrapper_container} flex-row-center-center-none`}>
        <div className={`${scss.modal_wrapper_body} main-content-container flex-column-normal-normal-none`}>
          <section className={`${scss.modal_wrapper_header} flex-row-center-space-between-none`}>
            <p>{CharacterArray.firstLetterToUpperCase(toPreview)}</p>
            <XButton onClick={closeModal}/>
          </section>
          {(!itemToPreview && toPreviewID && !isPending) &&
          <div style={{ padding: '1rem' }}>
            <LocalError error={`${CharacterArray.firstLetterToUpperCase(toPreview)} with id "${toPreviewID}" not found!`}/>
          </div>}
          {isPending ? <DataModalWrapperLoader/> : itemToPreview ? Component({ data: itemToPreview }) : null}
        </div>
      </div> : null}
    </Fragment>
  )
}