import scss from '../scss/userDataHeader.module.scss'
import '@/scss/global.scss'

import type { UserDataHeaderProps } from '../page.type'

import { Settings, ShieldHalf, UserRound } from 'lucide-react'

import DateParser from '@/lib/date-parser/dateParser'
import ImageComponent from '@/component/image-component/image'

export default function UserDataHeader({ user, setIsVisible }: UserDataHeaderProps) {
  const isAdmin: boolean = user?.role === 'Admin'
  const roleIcon: JSX.Element = isAdmin ? <ShieldHalf /> : <UserRound />
  const roleColor: string = isAdmin ? "#F48023" : "#1682FD"

  const openUpdateModal = (): void => {
    setIsVisible(true)
  }

  return(
    <div className={`${scss.user_data_header} main-content-container flex-column-normal-normal-small`}>
      <div className={`${scss.user_data_header_top} flex-row-normal-center-none`}>
        <div className={`${scss.user_data_img_container} flex-column-normal-normal-small`}>
          <ImageComponent classNames={{ img: scss.user_data_img, loader: scss.user_data_img_loader }} src={user.avatar} alt={user.name}/>
          <div style={{ color: roleColor }} className={`${scss.user_data_role_container} flex-row-center-normal-small`}>{roleIcon}<p>{user.role}</p></div>
        </div>
        <Settings className={scss.user_data_header_edit_button} size={30} onClick={openUpdateModal}/>
      </div>
      <div className={scss.user_data_header_bottom}>
        <section>
          <p>Name</p>
          <p>{user.name}</p>
        </section>
        <section>
          <p>Registrated</p>
          <p>{DateParser.getDifference(user.createdAt)}</p>
        </section>
        <section>
          <p>Contents</p>
          <p>{user.myContent.length}</p>
        </section>
      </div>
    </div>
  )
}