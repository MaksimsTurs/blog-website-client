import scss from './loader.module.scss'
import '@/scss/global.scss'

export default function WriteNewLoader() {
  return(
    <div className={`${scss.write_new_loader_container} flex-row-normal-center-medium`}>
      <div className={`${scss.write_new_loader_body} flex-column-normal-normal-small`}>
        <div className={scss.write_new_loader_input}></div>
        <div className={scss.write_new_loader_input}></div>
        <div className='flex-row-normal-normal-small'>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div style={{ height: '10rem' }} className={scss.write_new_loader_input}></div>
      </div>
    </div>
  )
}