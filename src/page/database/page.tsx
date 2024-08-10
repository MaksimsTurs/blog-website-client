import scss from './page.module.scss'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

import { URL_SEARCH_PARAMS } from '@/conts'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/_useRequest'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import DatabaseItem from './component/databaseItem'
import InsertItemForm from './component/insertItemForm'
import Loader from '../galery/loader'
import Error from '@/component/error/error'

import type { Database } from '@/global.type'

import fetcher from '@/lib/fetcher/fetcher'

export default function Page() {
  useMetadata({ title: 'Database' })

  const [isInsertMode, setIsInsertMode] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const { data, isFetching, error } = useRequest<Database[]>({ deps: ['database'], request: async () => await fetcher.get('/get/ruzzkyi-mir') })

  const itemID: string | null = searchParams.get(URL_SEARCH_PARAMS['DATABASE-ID'])

  const selectedItem: Database | undefined = data?.find(galery => galery._id === itemID)

  const changeInsertMode = (): void => {
    setIsInsertMode(true)
  }

  const openSelectedItem = (id: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['DATABASE-ID']]: id })
  }

  return(
    <Fragment>
      {isFetching ? <Loader/> :
      error ? <Error code={error?.code} message={error?.message}/> :
      isInsertMode ? <InsertItemForm setIsInsertMode={setIsInsertMode}/> :
      itemID && selectedItem ?
      <DatabaseItem item={selectedItem}/> :
      <Fragment>
        <div className={scss.personal_database_container}>
          {isAdmin && <button onClick={changeInsertMode} className={`${scss.personal_database_insert_button} flex-row-center-center-none`}><Plus /></button>}
          {data && data.map(item => {
            return(
              <div onClick={() => openSelectedItem(item._id)} className={scss.personal_database_body} key={item._id} style={{ background: `url(${item.thumbnail})` }}>
                <div className={`${scss.personal_database_title} flex-row-center-center-none`}>{item.title}</div>
              </div>
            )
          })}
        </div>
      </Fragment>}
    </Fragment>
  )
}