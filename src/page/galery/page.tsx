import usePermitor from "@/custom-hook/use-permitor/useHavePermission"
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/useRequest'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'

import { Plus } from "lucide-react"
import { useState, Fragment } from 'react'

import fetcher from '@/lib/fetcher/fetcher'
import findImage from '@/lib/find-image/findImage'

import { URL_SEARCH_PARAMS } from '@/conts'

import SlideModal from './component/slideModal'
import ModalError from '@/component/modal-error/modalError'
import InsertGaleryModal from './component/insertGaleryModal'
import Loader from './loader'
import GaleryContent from './component/galeryContent'
import { GridWrapper, GridButton, GridItem } from '@/component/grid/grid'

import type { Galery } from '@/global.type'
import Error from "@/component/error/error"

export default function Page() {
  useMetadata({ title: 'Galery' })

  const permitor = usePermitor()
  const searchParams = useSearchParams()

  const [currentSlide, setCurrentSlide] = useState<number | undefined>()

  const galeryID: string | null = searchParams.get(URL_SEARCH_PARAMS['GALERY-ID'])

  const isAdmin: boolean = permitor.role(['Admin']).permited()

  const { data, error, isFetching } = useRequest<Galery[]>({ deps: [`galery`], request: async () => await fetcher.get('/get/galeries') })

  const selectedGalery: Galery | undefined = data?.find(galery => galery._id === galeryID)

  const openGalery = (id: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['GALERY-ID']]: id })
  }

  const openInsertModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-ADD-GALERY-MODAL-OPEN']]: true })
  }

  return(
    <Fragment>
      <InsertGaleryModal/>
      {isFetching ? <Loader/> :
      error ? <Error code={error.code} message={error.message}/> :
      <Fragment>
        {(typeof currentSlide !== 'undefined' && selectedGalery) && <SlideModal setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} galery={selectedGalery}/>}
        {!galeryID ?
        <GridWrapper size='10rem' gap='0.5rem'>
          {isAdmin && <GridButton onClick={openInsertModal}><Plus/></GridButton>}
          {data && data.map(galery => {
            const icon: string = findImage(galery.content.map(content => content.url))
            return <GridItem key={galery._id} onClick={() => openGalery(galery._id)} icon={icon}>{galery.title}</GridItem>
          })}
        </GridWrapper> :
        (galeryID && !selectedGalery) || error ? 
        <ModalError error={error || { code: 404, message: 'Galery not found!' }}/> : 
        <GaleryContent galery={selectedGalery} setCurrentSlide={setCurrentSlide}/>}
      </Fragment>}
    </Fragment>
  )
} 