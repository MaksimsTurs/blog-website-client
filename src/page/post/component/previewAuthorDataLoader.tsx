import scss from '../scss/previewAuthorDataLoader.module.scss'
import '@/scss/global.scss'

export default function PreviewAuthorDataLoader() {
  return(
    <div className='main-content-container flex-column-center-center-medium'>
      <div className={scss.author_preview_loader_avatar}></div>
      <div style={{ width: '6rem', height: '1rem' }} className={scss.author_preview_loader_text}></div>
      <div style={{ width: '4rem', height: '1rem'  }} className={scss.author_preview_loader_text}></div>
      <div style={{ width: '12rem', height: '1rem'  }} className={scss.author_preview_loader_text}></div>
    </div>
  )
}