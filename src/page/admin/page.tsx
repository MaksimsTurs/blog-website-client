import scss from './page.module.scss'
import '@/scss/global.scss'

import useRequest from '@/custom-hook/use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import fetcher from '@/lib/fetcher/fetcher'
import inObject from '@/lib/object/props/inObject'

import type { ContentData } from './page.type'
import type { Content, User } from '@/global.type'

import AdminSideMenu from './component/adminSideMenu'
import Pagination from '@/component/pagination/pagination'
import PaginationLoader from '@/component/pagination/component/paginationLoader'
import ContentPreview from './component/contentPreview'
import UserPreview from './component/userPreview'
import Empty from '@/component/empty/empty'
import DataLoader from './component/data-render/dataLoader'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import DataViewOptions from './component/dataViewOptions'
import PageError from '@/component/errors/page-error/pageError'

import { useParams, Navigate } from 'react-router-dom'

import { URL_SEARCH_PARAMS, AUTHORIZATION_OBJECT } from '@/conts'
import { Fragment } from 'react/jsx-runtime'

export default function Admin() {
  const { tab } = useParams(),
        searchParams = useSearchParams(),
        permitor = usePermitor()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0'),
        isSomeItemSelected: boolean = Boolean(searchParams.get('id'))

  if(!permitor.role(['ADMIN']).permited()) return <Navigate to='/'/>

  const { isMutating, isPending, data, prev, error } = useRequest<ContentData<Content | User>>({ 
    deps: [`admin/${tab}/${currPage}`], 
    prev: [`admin/${tab}/${currPage === 0 ? currPage : currPage - 1}`], 
    request: async () => await fetcher.get(`/admin/${tab}/${currPage}`, AUTHORIZATION_OBJECT) 
  })

  const pagesCount: number = data?.pagesCount || prev?.pagesCount || 0,
        isRenderUser: boolean = inObject(data?.data?.[0] || {}, ['avatar'])

  return(
    <div style={{ height: '100%', paddingRight: '9.5rem', width: '100%' }} className='flex-row-normal-normal-none'>
      {(isSomeItemSelected && !isPending) ? <DataViewOptions/> :
      <Fragment>
        {isMutating && <MutatingLoader/>}
        {error ? <PageError error={error}/> :
        <div style={{ width: '100%' }} className='flex-column-normal-normal-medium'>
          {isPending ? <PaginationLoader/> : pagesCount > 1 && <Pagination pagesCount={pagesCount}/>} 
          {data?.data.length === 0 && <Empty option={{ flexCenterCenter: true, height: 'FULL' }} label={`Nothing found...`}/>}
          {isPending ? 
          <DataLoader/> : 
          <div className={scss.admin_list_container}>
            {data && data.data.map(item => isRenderUser ? <UserPreview key={item._id} user={item as User}/> : <ContentPreview key={item._id} contentData={item as Content} authorData={(item as Content).author}/>)}
          </div>}
          {isPending ? <PaginationLoader/> : pagesCount > 1 && <Pagination pagesCount={pagesCount}/>} 
          </div>}
        </Fragment>}
      <AdminSideMenu/>
    </div>
  )
}