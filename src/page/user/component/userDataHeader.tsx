import scss from '../scss/userDataHeader.module.scss'
import '@/scss/global.scss'

import type { UserDataHeaderProps } from '../page.type'

import { Settings, ShieldHalf, UserRound } from 'lucide-react'

import DateParser from '@/lib/date-parser/dateParser'
import ImageComponent from '@/component/image-component/image'

import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function UserDataHeader({ user }: UserDataHeaderProps) {
  const isCurrentUser: boolean = usePermitor().equal('_id', user._id).permited()
  const isAdmin: boolean = user?.role === 'Admin'
  
  const roleColor: string = isAdmin ? "#F48023" : "#1682FD"
  const roleIcon: JSX.Element = isAdmin ? <ShieldHalf /> : <UserRound />
  
  const searchParams = useSearchParams()

  const createdAtDifference: string = DateParser
    .getDifference(user.createdAt)
    .getSortDate({
      year: 'Vor [year] jahren [month] monat(en)!',
      month: 'Vor [month] monaten [day] tag(en)!',
      day: 'Vor [day] tagen [hour] stunden!',
      hour: 'Vor [hour] stunden [minute] minuten!',
      minute: 'Vor [minute] minuten [second] sekunden!',
      second: 'Vor [second] sekunden!'
    })

  const openUpdateModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-EDIT-USER-MODAL-OPEN']]: true })
  }

  return(
    <div className={`${scss.user_data_header} main-content-container flex-column-normal-normal-small`}>
      <div className={`${scss.user_data_header_top} flex-row-normal-center-none`}>
        <div className={`${scss.user_data_img_container} flex-column-normal-normal-small`}>
          <ImageComponent classNames={{ img: scss.user_data_img, loader: scss.user_data_img_loader, svg: scss.user_data_img }} src={user.avatar} alt={user.name}/>
          <div style={{ color: roleColor }} className={`${scss.user_data_role_container} flex-row-center-normal-small`}>{roleIcon}<p>{user.role}</p></div>
        </div>
        {isCurrentUser && <Settings className={scss.user_data_header_edit_button} size={30} onClick={openUpdateModal}/>}
      </div>
      <div className={scss.user_data_header_bottom}>
        <section>
          <p>Name</p>
          <p>{user.name}</p>
        </section>
        <section>
          <p>Registrated</p>
          <p>{createdAtDifference}</p>
        </section>
        <section>
          <p>Content</p>
          <p>{user.myContent.length}</p>
        </section>
      </div>
    </div>
  )
}