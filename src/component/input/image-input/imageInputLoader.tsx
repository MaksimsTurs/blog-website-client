import scss from './imageInputLoader.module.scss'
import '@/scss/global.scss'

export default function ImageInputLoader() {
  return(
    <div className={`${scss.image_input_loader_container} flex-column-center-center-medium`}>
      <div className={scss.image_input_loader_body}>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
        <div className={scss.image_input_loader}></div>
      </div>
    </div>
  )
}