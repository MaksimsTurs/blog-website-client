import scss from '../scss/adminSideMenu.module.scss'
import '@/scss/global.scss'

import { MessageCircleMore, User, Text } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

export default function AdminSideMenu() {
  const navigate = useNavigate()
  
  const changeTab = (tab: 'post' | 'comment' | 'user'): void => {
    navigate(`/admin/${tab}`)
  }

  return(
    <div className={scss.admin_side_menu_list_container}>
      <div className={scss.admin_side_menu_body}>
        <section onClick={() => changeTab('post')} className='flex-row-center-normal-medium'>
          <Text />
          <p>Posts</p>
        </section>
      </div>
      <div className={scss.admin_side_menu_body}>
        <section onClick={() => changeTab('comment')} className='flex-row-center-normal-medium'>
          <MessageCircleMore />
          <p>Comments</p>
        </section>
      </div>
      <div className={scss.admin_side_menu_body}>
        <section onClick={() => changeTab('user')} className='flex-row-center-normal-medium'>
          <User />
          <p>Users</p>
        </section>
      </div>
    </div>
  )
}