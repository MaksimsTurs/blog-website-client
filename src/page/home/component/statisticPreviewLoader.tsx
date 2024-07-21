import scss from '../scss/statisticPreviewLoader.module.scss'
import '@/scss/global.scss'

export default function StatisticPreviewLoader() {
  return(
    <div style={{ paddingTop: '1rem' }} className='flex-column-normal-normal-medium'>
      <div className={scss.preview_loader}></div>
      <div className={scss.preview_loader}></div>
      <div className={scss.preview_loader}></div>
      <div className={scss.preview_loader}></div>
      <div className={scss.preview_loader}></div>
      <div className={scss.preview_loader}></div>
    </div>
  )
}