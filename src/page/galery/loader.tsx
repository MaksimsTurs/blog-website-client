import scss from './loader.module.scss'

import useMetadata from '@/custom-hook/use-metadata/useMetadata'

export default function Loader() {
  useMetadata({ title: 'Galery' })
  return(
    <div className={scss.galery_loader_container}>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
      <div className={scss.galery_loader_body}></div>
    </div>
  )
}