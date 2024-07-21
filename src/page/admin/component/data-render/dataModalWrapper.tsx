import scss from '../../scss/data-render/dataModalWrapper.module.scss'
import '@/scss/global.scss'

import type { ContentData, DataModalWrapperProps } from '../../page.type'

import { X } from 'lucide-react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/_useRequest'

import firstLetterToUpperCase from '@/lib/first-letter-to-upper/firstLetterToUpper'

import ModalError from '@/component/modal-error/modalError'
import DataModalWrapperLoader from '../dataModalWrapperLoader'

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
      {(!itemToPreview && toPreviewID && !isPending) ? <ModalError error={{ code: 404, message: `${firstLetterToUpperCase(toPreview)} not found!` }}/> : null}
      {toPreviewID ? 
      <div className={`${scss.modal_wrapper_container} flex-row-center-center-none`}>
        <div className={`${scss.modal_wrapper_body} main-content-container flex-column-normal-normal-none`}>
          <section className={`${scss.modal_wrapper_header} flex-row-center-space-between-none`}>
            <p>{firstLetterToUpperCase(toPreview)}</p>
            <X onClick={closeModal} size={17}/>
          </section>
          {isPending ? <DataModalWrapperLoader/> : itemToPreview ? Component({ data: itemToPreview }) : null}
        </div>
      </div> : null}
    </Fragment>
  )
}