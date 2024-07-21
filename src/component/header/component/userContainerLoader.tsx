import scss from '../scss/userContainerLoader.module.scss'

export default function UserContainerLoader() {
  return(
    <div className={scss.loader_container}>
      <div className={`${scss.loader_element_animation} ${scss.loader_button}`}></div>
      <div className={`${scss.loader_element_animation} ${scss.loader_button}`}></div>
      <div className={`${scss.loader_element_animation} ${scss.loader_avatar}`}></div>
    </div>
  )
}