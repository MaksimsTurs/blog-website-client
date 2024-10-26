import scss from '../scss/sideMenuLoader.module.scss'

export default function SideMenuLoader() {
  return(
    <div className={scss.side_menu_loader_container}>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
      <div className={scss.side_menu_loader_item}></div>
    </div>
  )
}