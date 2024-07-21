import scss from './page.module.scss'
import '@/scss/global.scss'

import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

import useRequest from '@/custom-hook/_use-request/_useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import fetcher from '@/lib/fetcher/fetcher'

import type { User } from '@/global.type'
import type { UserContentData } from './page.type'

import UserDataHeader from './component/userDataHeader'
import EditUser from './component/editUser'
import Error from '@/component/error/error'
import UserHeaderLoader from './component/userHeaderLoader'
import UserContentLoader from './component/userContentLoader'
import UserContentList from './component/userContentList'

export default function User() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const page: number = parseInt(searchParams.get('list-page') || '0')

  const user = useRequest<User>({ deps: [`user-${id}`], request: async () => fetcher.get<User>(`/user/${id}`) })
  const userContent = useRequest<UserContentData>({ prev: [`user-${id}-content-${page > 0 ? page - 1 : page}`], deps: [`user-${id}-content-${page}`], request: async () => await fetcher.get(`/user/${id}/content/${page}`) })

  return(
    <Fragment>
      {(user.error || userContent.error) ? 
       <Error code={(user!.error || userContent!.error)!.code} message={(user!.error || userContent!.error)!.message}/> :
       <Fragment>
         {user.data ? <EditUser isVisible={isVisible} setIsVisible={setIsVisible} _id={user.data._id}/> : null}
         <div className='flex-row-normal-center-none'>
           <div className={`${scss.user_data_body} flex-column-normal-normal-medium`}>
             {(!user.isFetching && user.data) ? <UserDataHeader user={user.data} setIsVisible={setIsVisible}/> : <UserHeaderLoader/>}
             {(!userContent.isFetching && user.data && userContent.data) ? <UserContentList user={user.data} userContent={userContent.data}/> : <UserContentLoader/>}
          </div>
        </div>      
      </Fragment>}
    </Fragment>
  )
}