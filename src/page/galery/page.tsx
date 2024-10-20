import usePermitor from "@/custom-hook/use-permitor/useHavePermission"
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/use-request/useRequest'

import { Plus } from "lucide-react"
import { useState, Fragment } from 'react'

import fetcher from '@/lib/fetcher/fetcher'
import Array from "@/lib/array/array"

import { URL_SEARCH_PARAMS } from '@/conts'

import SlideModal from './component/slideModal'
import InsertSlidesGaleryModal from "./component/insertSlidesGaleryModal"
import PageError from "@/component/errors/page-error/pageError"
import Loader from './loader'
import GaleryContent from './component/galeryContent'
import MutatingLoader from "@/component/loader/mutatig-loader/mutatingLoader"
import { GridWrapper, GridButton, GridItem } from '@/component/grid/grid'

import type { Galery } from '@/global.type'

export default function Page() {
  const permitor = usePermitor(),
        searchParams = useSearchParams(),
        [currentSlide, setCurrentSlide] = useState<number | undefined>()

  const galeryID: string | null = searchParams.get(URL_SEARCH_PARAMS['GALERY-ID']),
        isAdmin: boolean = permitor.role(['Admin']).permited()

  const { data, error, isFetching, isMutating } = useRequest<Galery[]>({ deps: [`galery`], request: async () => await fetcher.get('/get/galery') })

  const selectedGalery: Galery | undefined = data?.find(galery => galery._id === galeryID)

  const openGalery = (id: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['GALERY-ID']]: id })
  }

  const openInsertModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-ADD-GALERY-MODAL-OPEN']]: true })
  }

  return(
    <Fragment>
      <InsertSlidesGaleryModal modalKey='IS-ADD-GALERY-MODAL-OPEN' title="Neue Galerie erstellen"/>
      {isMutating && <MutatingLoader/>}
      {isFetching ? <Loader/> :
      error ? <PageError error={error}/> :
      <Fragment>
        {(typeof currentSlide !== 'undefined' && selectedGalery) && <SlideModal setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} galery={selectedGalery}/>}
        {!galeryID ?
        <GridWrapper size='10rem' gap='0.5rem'>
          {isAdmin && <GridButton onClick={openInsertModal}><Plus/></GridButton>}
          {data && data.map(galery => {
            const icon: string = Array.getImage(galery.content.map(content => content.url))
            return <GridItem key={galery._id} onClick={() => openGalery(galery._id)} icon={icon}>{galery.title}</GridItem>
          })}
        </GridWrapper> :
        <GaleryContent galery={selectedGalery} setCurrentSlide={setCurrentSlide}/>}
      </Fragment>}
    </Fragment>
  )
} 