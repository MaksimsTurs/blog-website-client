import scss from '../../scss/data-render/dataLoader.module.scss'
import '@/scss/global.scss'

export default function DataLoader() {
  return(
    <div className={scss.data_loader_container}>
      {[...Array(20)].map((_, index) => (
        <div key={Math.random() * index + 100} style={{ height: 'fit-content', padding: '0.5rem' }} className='main-content-container'>
          <div className='flex-column-normal-normal-small'>
            <div className='flex-row-normal-normal-small'>
              <div className={`${scss.data_loader_avatar} ${scss.data_loader_animation}`}></div>
              <div style={{ width: '100%' }} className='flex-column-normal-normal-small'>
                <div style={{ width: '50%', height: '100%', padding: '0.5rem' }} className={scss.data_loader_animation}></div>
                <div style={{ width: '75%', height: '1rem', padding: '0.5rem' }} className={scss.data_loader_animation}></div>
              </div>
            </div>
            <div className='flex-row-normal-normal-small'>
              <div style={{ flexGrow: '1', height: '1.5rem' }} className={scss.data_loader_animation}></div>
              <div style={{ flexGrow: '1', height: '1.5rem' }} className={scss.data_loader_animation}></div>
              <div style={{ flexGrow: '1', height: '1.5rem' }} className={scss.data_loader_animation}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}