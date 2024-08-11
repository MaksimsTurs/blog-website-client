import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

import { URL_SEARCH_PARAMS } from '@/conts'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/use-request/useRequest'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import DatabaseItem from './component/databaseItem'
import InsertItemForm from './component/insertItemForm'
import Loader from '../galery/loader'
import PageError from '@/component/errors/page-error/pageError'
import { GridWrapper, GridButton, GridItem } from '@/component/grid/grid'

import type { Database } from '@/global.type'

import fetcher from '@/lib/fetcher/fetcher'

export default function Page() {
  useMetadata({ title: 'Database' })

  const [isInsertMode, setIsInsertMode] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const { data, isFetching, error } = useRequest<Database[]>({ deps: ['database'], request: async () => await fetcher.get('/get/ruzzkyi-mir') })

  const itemID: string | null = searchParams.get(URL_SEARCH_PARAMS['DATABASE-ID'])

  const selectedItem: Database | undefined = data?.find(items => items._id === itemID)

  const changeInsertMode = (): void => {
    setIsInsertMode(true)
  }

  const openSelectedItem = (id: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['DATABASE-ID']]: id })
  }

  return(
    <Fragment>
      {isFetching ? <Loader/> :
      error ? <PageError error={error}/> :
      isInsertMode ? <InsertItemForm setIsInsertMode={setIsInsertMode}/> :
      itemID && selectedItem ?
      <DatabaseItem item={selectedItem}/> :
      <Fragment>
        <GridWrapper size='10rem' gap='0.5rem'>
          {isAdmin && <GridButton onClick={changeInsertMode}><Plus/></GridButton>}
          {data && data.map(item => <GridItem key={item._id} onClick={() => openSelectedItem(item._id)} icon={item.thumbnail}>{item.title}</GridItem>)}
        </GridWrapper>
      </Fragment>}
    </Fragment>
  )
}