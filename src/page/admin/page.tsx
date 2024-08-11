import scss from './page.module.scss'
import '@/scss/global.scss'

import useRequest from '@/custom-hook/_use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import fetcher from '@/lib/fetcher/fetcher'
import inObject from '@/lib/in-object/inObject'
import coockie from '@/lib/coockie/coockie'

import type { ContentData } from './page.type'
import type { Content, User } from '@/global.type'

import AdminSideMenu from './component/adminSideMenu'
import Pagination from '@/component/pagination/pagination'
import PaginationLoader from '@/component/pagination/component/paginationLoader'
import ContentPreview from './component/contentPreview'
import UserPreview from './component/userPreview'
import Empty from '@/component/empty/empty'
import DataLoader from './component/data-render/dataLoader'
import Modals from './component/modal/modals'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Error from '@/component/error/error'

import { useParams, Navigate } from 'react-router-dom'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function Admin() {
  const { tab } = useParams()

  const searchParams = useSearchParams()
  const permitor = usePermitor()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')

  const { isMutating, isPending, data, prev, error } = useRequest<ContentData<Content | User>>({ 
    deps: [`${tab}-${currPage}`], 
    prev: [`${tab}-${currPage === 0 ? currPage : currPage - 1}`], 
    request: async () => await fetcher.get(`/admin/${tab}/${currPage}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) 
  })

  if(!permitor.role(['Admin']).permited() || error?.code === 403) return <Navigate to='/'/>

  const pagesCount: number = data?.pagesCount || prev?.pagesCount || 0
  const isRenderUser: boolean = inObject(data?.data?.[0] || {}, ['avatar', 'email'])

  return(
    <div style={{ height: '100%',paddingRight: '11rem', }} className='flex-row-normal-normal-none'>
      <Modals/>
      {isMutating ? <MutatingLoader/> : null}
      {error ? <Error code={error.code} message={error.message}/> :
      <div style={{ width: '100%', height: '100%' }} className='flex-column-normal-normal-medium'>
        {isPending ? <PaginationLoader/> : pagesCount > 1 ? <Pagination pagesCount={pagesCount}/> : null}        
        {data?.data.length === 0 && <Empty option={{ flexCenterCenter: true, height: 'FULL' }} label={`Nothing found...`}/>}
        {isPending ? 
         <DataLoader/> : 
         <div className={scss.admin_list_container}>
           {data && data.data.map(item => isRenderUser ? <UserPreview key={item._id} user={item as User}/> : <ContentPreview key={item._id} contentData={item as Content} authorData={(item as Content).author}/>)}
         </div>}
         {isPending ? <PaginationLoader/> : pagesCount > 1 ? <Pagination pagesCount={pagesCount}/> : null}        
        </div>}
      <AdminSideMenu/>
    </div>
  )
}