import scss from './page.module.scss'
import '@/scss/global.scss'

import { useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import useRequest from '@/custom-hook/use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'

import fetcher from '@/lib/fetcher/fetcher'

import type { User } from '@/global.type'
import type { UserContentData } from './page.type'

import UserDataHeader from './component/userDataHeader'
import EditUser from './component/editUser'
import LocalError from '@/component/errors/local-error/localError'
import PageError from '@/component/errors/page-error/pageError'
import UserHeaderLoader from './component/userHeaderLoader'
import UserContentLoader from './component/userContentLoader'
import UserContentList from './component/userContentList'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function User() {
  const { id } = useParams()

  const searchParams = useSearchParams()

  const page: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['LIST-PAGE']) || '0')

  const user = useRequest<User>({ deps: [`user-${id}`], request: async () => fetcher.get<User>(`/user/${id}`) })
  const userContent = useRequest<UserContentData>({ prev: [`user-${id}-content-${page > 0 ? page - 1 : page}`], deps: [`user-${id}-content-${page}`], request: async () => await fetcher.get(`/user/${id}/content/${page}`) })

  useMetadata({ title: user.data?.name, description: `Hier kannst du detalierte daten von ${user.data?.name} ansehen.` })

  return(
    <Fragment>
      {user.error ? 
       <PageError error={user.error}/> :
       <Fragment>
         {user.data && <EditUser _id={user.data._id}/>}
         <div className='flex-row-normal-center-none'>
           <div className={`${scss.user_data_body} flex-column-normal-normal-medium`}>
             {(!user.isFetching && user.data) ? <UserDataHeader user={user.data}/> : <UserHeaderLoader/>}
             {userContent.error ? <LocalError error={userContent.error.message}/> : (!userContent.isFetching && user.data && userContent.data) ? <UserContentList user={user.data} userContent={userContent.data}/> : <UserContentLoader/>}
          </div>
        </div>      
      </Fragment>}
    </Fragment>
  )
}