import scss from './page.module.scss'
import '@/scss/global.scss'

import usePermitor from "@/custom-hook/use-permitor/useHavePermission"
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/_useRequest'

import { Plus } from "lucide-react"
import { Fragment } from 'react/jsx-runtime'

import fetcher from '@/lib/fetcher/fetcher'

import { MODALS_KEYS } from '@/conts'

import SlideModal from './component/slideModal'
import ModalError from '@/component/modal-error/modalError'
import Loader from './loader'

import type { Galery } from '@/global.type'

export default function Page() {
  const permitor = usePermitor()
  const searchParams = useSearchParams()

  const galeryID: string | null = searchParams.get(MODALS_KEYS['GALERY-ID'])
  const isAdmin: boolean = permitor.role(['Admin']).permited()

  const { data, error, isFetching } = useRequest<Galery[]>({ deps: [`galery`], request: async () => await fetcher.get('/get/galeries') })

  const selectedGalery: Galery | undefined = data?.find(galery => galery._id === galeryID)

  const openSlideModal = (id: string): void => {
    searchParams.set({ [MODALS_KEYS['GALERY-ID']]: id, [MODALS_KEYS['CURRENT-SLIDE']]: 0 })
  }

  return(
    <Fragment>
      {isFetching ? <Loader/> :
      <Fragment>
        {(galeryID && !isFetching && !selectedGalery) || error ? <ModalError error={error || { code: 404, message: 'Galery not found!' }}/> : <SlideModal galery={selectedGalery}/>}      
        <div className={scss.galery_container}>
          {isAdmin ? <button className={`${scss.galery_insert_button} flex-row-center-center-none`}><Plus /></button> : null}
          {data && data.map(galery => (
            <div key={galery._id} onClick={() => openSlideModal(galery._id)} style={{ backgroundImage: `url(${galery.content[0].url})` }} className={scss.galery_body}>
              <div className={`${scss.galery_title} flex-row-center-center-none`}>{galery.title}</div>
            </div>
          ))}
        </div>
      </Fragment>}
    </Fragment>
  )
}