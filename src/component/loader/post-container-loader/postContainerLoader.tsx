import scss from './postContainerLoader.module.scss'
import '@/scss/global.scss'

export default function PostContainerLoader() {
  return(
    <div className={`${scss.post_loader_container} main-content-container flex-column-normal-normal-medium`}>
      <div className='flex-row-normal-normal-medium'>
        <div className={scss.post_loader_avatar}></div>
        <div className='flex-column-normal-normal-medium'>
          <div style={{ width: '4rem' }} className={scss.post_loader_text}></div>
          <div style={{ width: '7rem' }} className={scss.post_loader_text}></div>
        </div>
      </div>
      <div style={{ width: '11rem' }} className={scss.post_loader_text}></div>
      <div className='flex-column-normal-normal-medium'>
        <div style={{ width: '50%' }} className={scss.post_loader_text}></div>
        <div style={{ width: '20%' }} className={scss.post_loader_text}></div>
      </div>
      <div  className='flex-row-normal-space-between-none'>
        <div className='flex-row-normal-normal-medium'>
          <div className={scss.post_loader_tag}></div>
          <div className={scss.post_loader_tag}></div>
          <div className={scss.post_loader_tag}></div>
        </div>
        <div className='flex-row-normal-normal-medium'>
          <div className={scss.post_loader_tag}></div>
          <div className={scss.post_loader_tag}></div>
          <div className={scss.post_loader_tag}></div>          
        </div>
      </div>
    </div>
  )
}