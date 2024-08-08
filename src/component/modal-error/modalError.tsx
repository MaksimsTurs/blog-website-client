import scss from './modalError.module.scss'
import '@/scss/global.scss'

import { OctagonAlert, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import type { ModalErrorProps } from './modalError.type'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function ModalError({ error, removeError }: ModalErrorProps) {
  const searchParams = useSearchParams()

  const isErrorModalOpen: boolean = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-ERROR-MODAL-OPEN']) || 'false')

  const closeErrorModal = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['IS-ERROR-MODAL-OPEN']])
    if(removeError) removeError()
  }

  const refreshPage = (): void => {
    window.location.reload()
  }

  useEffect(() => {
    if(error) searchParams.set({ [URL_SEARCH_PARAMS['IS-ERROR-MODAL-OPEN']]: true })
  }, [])

  return(
    <div style={{ display: (isErrorModalOpen && error) ? 'flex' : 'none' }} className={`${scss.modal_error_container} flex-row-center-center-none`}>
      <div className={`${scss.modal_error_body} flex-column-normal-normal-none`}>
        <div className={`${scss.modal_error_header} flex-row-center-space-between-none`}>
          <div className='flex-row-center-center-medium'>
            <OctagonAlert size={17}/>
            <p>Some error!</p>
          </div>
          <X onClick={closeErrorModal} size={17}/>
        </div>
        <div className={scss.modal_error_text}>
          <p className={scss.modal_error_code}>{error?.code}!</p>
          <p>{error?.message}</p>
          <div style={{ flexWrap: 'wrap', rowGap: '0rem' }} className='flex-row-normal-normal-small'>
            <button onClick={refreshPage}>Refresh</button>     
            <p>the page or write a</p>
            <Link to={`/`}>E-mail.</Link>
          </div> 
        </div>
      </div>
    </div>
  )
}