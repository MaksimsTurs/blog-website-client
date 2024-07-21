import scss from '../loader.module.scss'
import '@/scss/global.scss'

export default function UserContentLoader() {
  return(
    <div className={`${scss.user_loader_body} main-content-container`}>
      <div style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }} className='flex-row-center-normal-small'>
        <div style={{ borderRadius: '5px', width: '1.5rem', height: '1.5rem' }} className={scss.user_loader_animation}></div>
        <div style={{ borderRadius: '5px', width: '9rem', height: '1.5rem' }} className={scss.user_loader_animation}></div>
      </div>
      <div className='flex-column-normal-normal-small'>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.user_loader_animation}></div>
      </div>
    </div>
  )
}