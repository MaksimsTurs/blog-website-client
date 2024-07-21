import scss from './page.module.scss'
import '@/scss/global.scss'

import useRequest from '@/custom-hook/_use-request/_useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

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
import ModalError from '@/component/modal-error/modalError'

import { useParams, Navigate } from 'react-router-dom'

export default function Admin() {
  const { tab } = useParams()
  const searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get('page') || '0')

  const { isMutating, isPending, data, prev, error } = useRequest<ContentData<Content | User>>({ 
    deps: [`${tab}-${currPage}`], 
    prev: [`${tab}-${currPage === 0 ? currPage : currPage - 1}`], 
    request: async () => await fetcher.get(`/admin/${tab}/${currPage}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) 
  })

  const pagesCount: number = data?.pagesCount || prev?.pagesCount || 0
  const isRenderUser: boolean = inObject(data?.data?.[0] || {}, ['avatar', 'email'])

  return(
    <div className='flex-row-normal-normal-none'>
      <ModalError error={error}/>
      <Modals/>
      {isMutating ? <MutatingLoader/> : null}
      {error?.code === 500 ? null :
      error?.code === 403 || !data ? <Navigate to={'/'}/> :
      <div style={{ paddingRight: '11rem', width: '100%' }} className='flex-column-normal-normal-medium'>
        {isPending ? <PaginationLoader/> : <Pagination pagesCount={pagesCount}/>}        
        {data?.data.length === 0 && <Empty option={{ flexCenterCenter: true }} label={`Nothing found...`}/>}
        {isPending ? 
         <DataLoader/> : 
         <div className={scss.admin_list_container}>
           {data && data.data.map(item => isRenderUser ? <UserPreview key={item._id} user={item as User}/> : <ContentPreview key={item._id} contentData={item as Content} authorData={(item as Content).author}/>)}
         </div>}
        {isPending ? <PaginationLoader/> : <Pagination pagesCount={pagesCount}/>}        
      </div>}
      <AdminSideMenu/>
    </div>
  )
}