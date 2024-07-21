import scss from '../scss/dataModalWrapperLoader.module.scss'
import '@/scss/global.scss'

import AdminActionButton from './adminActionButton'

export default function DataModalWrapperLoader() {
  return(
    <div className={`${scss.data_modal_wrapper_container} flex-column-normal-normal-medium`}>
      <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', position: 'absolute', right: '-15%', zIndex: '-1', top: '-2%' }} className='flex-column-normal-normal-small'>
        <AdminActionButton optionAction={{ actionType: 'remove' }}/>
        <AdminActionButton optionAction={{ actionType: 'edit' }}/>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '2rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '11rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '5rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '9rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '3rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '6rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '4rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '11rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '3.5rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '5rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
      <div className={`${scss.data_modal_wrapper_data_body} flex-row-normal-space-between-none`}>
        <div style={{ width: '4rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
        <div style={{ width: '3rem' }} className={`${scss.data_modal_wrapper_loader_animation}`}></div>
      </div>
    </div>
  )
}