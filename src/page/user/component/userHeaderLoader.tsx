import scss from '../loader.module.scss'
import '@/scss/global.scss'

export default function UserHeaderLoader() {
  return(
    <div style={{ padding: '0rem' }} className={`${scss.user_loader_body} main-content-container`}>
      <div className={`${scss.user_loader_header} flex-row-normal-center-none`}>
        <div style={{ flexGrow: 1 }} className='flex-column-center-center-small'>
          <div style={{ width: '5rem', height: '5rem' }} className={`${scss.user_loader_animation}`}></div>
          <div style={{ width: '7rem', height: '1.5rem' }} className={`${scss.user_loader_animation}`}></div>
        </div>
        <div style={{ width: '2rem', height: '2rem' }} className={`${scss.user_loader_animation}`}></div>
      </div>
      <div className='flex-row-normal-normal-none'>
        <div className={`${scss.user_loader_data} flex-column-normal-normal-small`}>
          <div style={{ borderRadius: '5px', width: '4rem', height: '1rem' }} className={scss.user_loader_animation}></div>
          <div style={{ borderRadius: '5px', width: '5rem', height: '1rem' }} className={scss.user_loader_animation}></div>
        </div>
        <div className={`${scss.user_loader_data} flex-column-normal-normal-small`}>
          <div style={{ borderRadius: '5px', width: '3rem', height: '1rem' }} className={scss.user_loader_animation}></div>
          <div style={{ borderRadius: '5px', width: '8rem', height: '1rem' }} className={scss.user_loader_animation}></div>
        </div>
        <div className={`${scss.user_loader_data} flex-column-normal-normal-small`}>
          <div style={{ borderRadius: '5px', width: '6rem', height: '1rem' }} className={scss.user_loader_animation}></div>
          <div style={{ borderRadius: '5px', width: '6.5rem', height: '1rem' }} className={scss.user_loader_animation}></div>
        </div>
      </div>
    </div>
  )
}