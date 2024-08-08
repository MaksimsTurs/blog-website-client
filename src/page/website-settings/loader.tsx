import scss from './loader.module.scss'
import '@/scss/global.scss'

import useMetadata from '@/custom-hook/use-metadata/useMetadata'

export default function Loader() {
  useMetadata({ title: 'Einstellung' })
  return(
    <div className='flex-column-normal-normal-medium'>
      <div className={`${scss.loader_container}`}>
        <div className={`${scss.loader_header} flex-column-normal-normal-small`}>
          <div style={{ height: '2rem', width: '8rem' }} className={scss.loader_animation}></div>
          <div style={{ height: '1.25rem', width: '15rem' }} className={scss.loader_animation}></div>
        </div>
        <div className='flex-column-normal-normal-small'>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '7rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '83%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '8rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '99%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '5rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '75%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '10rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '100%' }} className={scss.loader_animation}></div>          
          </div>
        </div>
      </div>
      <div className={`${scss.loader_container}`}>
        <div className='flex-row-normal-space-between-medium'>
          <div style={{ height: '2rem', width: '7rem' }} className={scss.loader_animation}></div>
          <div style={{ height: '2rem', width: '50%' }} className={scss.loader_animation}></div>          
        </div>
      </div>
      <div className={`${scss.loader_container}`}>
        <div className='flex-row-normal-space-between-medium'>
          <div style={{ height: '2rem', width: '7rem' }} className={scss.loader_animation}></div>
          <div style={{ height: '2rem', width: '86%' }} className={scss.loader_animation}></div>          
        </div>
      </div>
      <div className={`${scss.loader_container}`}>
        <div className={`${scss.loader_header} flex-column-normal-normal-small`}>
          <div style={{ height: '2rem', width: '8rem' }} className={scss.loader_animation}></div>
          <div style={{ height: '1.25rem', width: '15rem' }} className={scss.loader_animation}></div>
        </div>
        <div className='flex-column-normal-normal-small'>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '7rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '83%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '8rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '99%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '5rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '75%' }} className={scss.loader_animation}></div>          
          </div>
          <div className='flex-row-normal-space-between-medium'>
            <div style={{ height: '2rem', width: '10rem' }} className={scss.loader_animation}></div>
            <div style={{ height: '2rem', width: '100%' }} className={scss.loader_animation}></div>          
          </div>
        </div>
      </div>
    </div>
  )
}