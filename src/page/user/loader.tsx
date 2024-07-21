import '@/scss/global.scss'

import UserHeaderLoader from './component/userHeaderLoader'
import UserContentLoader from './component/userContentLoader'

export default function Loader() {
  return(
    <div style={{ width: '100%' }} className='flex-column-center-center-medium'>
      <UserHeaderLoader/>
      <UserContentLoader/>
    </div>
  )
}