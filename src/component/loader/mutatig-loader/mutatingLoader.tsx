import scss from './muatitngLoader.module.scss'
import '@/scss/global.scss'

export default function MutatingLoader() {
  return(
    <div className={`${scss.mutating_loader_container} flex-row-center-center-none`}>
      <span className={scss.mutating_loader}></span>
    </div>
  )
}