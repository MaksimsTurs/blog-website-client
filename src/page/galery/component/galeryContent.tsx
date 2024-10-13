import scss from '../scss/galeryContent.module.scss'
import '@/scss/global.scss'

import type { GaleryContentProps } from "../page.type";
import type { Galery } from '@/global.type';

import { ArrowLeft, FileVideo, Image, ImageMinus } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Pencil, Plus, PencilIcon } from 'lucide-react';

import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import usePermitor from '@/custom-hook/use-permitor/useHavePermission';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

import Strings from '@/lib/string/strings';
import fetcher from '@/lib/fetcher/fetcher';
import getAssetExtension from '@/lib/string/props/getAssetExtention';

import LocalError from '@/component/errors/local-error/localError';
import InsertSlidesGaleryModal from './insertSlidesGaleryModal';

export default function GaleryContent({ galery, setCurrentSlide }: GaleryContentProps) {
  const [activeSort, setActiveSort] = useState<string[]>([])
  const [isSlideEditMode, setIsSlideEditMode] = useState<boolean>(false)
  const [contextToEditID, setContextToEditID] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const { mutate } = useMutate<Galery[]>('galery')
  const isAdmin: boolean = usePermitor().role(['Admin']).permited() 
  
  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']

  const removeImage = (url: string): void => {
    mutate(async(option) => {
      await fetcher.post('/remove/galery/image', { _id: galery?._id, url }, AUTHORIZATION_OBJECT)
      
      let state = option.state || []

      
      return state.map(stateGalery => {
        const countUpdate = imageExtentions.includes(getAssetExtension(url)) ? { countOfImages:  --stateGalery.countOfImages } : { countOfVideos:  --stateGalery.countOfVideos }

        if(stateGalery._id === galery?._id) return {...stateGalery, ...countUpdate,  content: stateGalery.content.filter(file => file.url !== url) }
        return stateGalery
      })
    })
  }

  const editContext = (_id: string): void => {
    setContextToEditID(_id)
  }
 
  const openSlideModal = (index: number): void => {
    setCurrentSlide(index)
  }

  const openInsertSlideModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-ADD-FILE-MODAL-OPEN']]: true })
  }

  const changeSlideEditMode = (): void => {
    setIsSlideEditMode(prev => !prev)
  }

  const closeSelectedGalery = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['GALERY-ID']])
  }

  const insertSortParams = (param: string): void => {
    setActiveSort(prev => {
      if(prev.includes(param)) return prev.filter(sort => sort !== param)
      return [...prev, param]
    })
  }

  return(
    <Fragment>
      <InsertSlidesGaleryModal isUpdate title='Dateien hinzufügen' modalKey='IS-ADD-FILE-MODAL-OPEN'/>
      {!galery ? <LocalError error={`Galery with _id "${searchParams.get(URL_SEARCH_PARAMS['GALERY-ID'])}" not found!`}/> :
      <div className='flex-column-normal-normal-none'>
        <div className={scss.galery_information_container}>
          <h4>{galery?.title}</h4>
          <div className={`${scss.galery_action_button_container} flex-row-center-normal-medium`}>
            {isAdmin &&
            <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)', marginRight: '0.5rem', paddingRight: '1rem' }} className='flex-row-center-normal-medium'>
              <button onClick={changeSlideEditMode} className={`${isSlideEditMode ? scss.galery_action_button_active : ''} ${scss.galery_action_button} flex-row-center-normal-medium`}><Pencil/></button>
              <button onClick={openInsertSlideModal} className={`${scss.galery_action_button} flex-row-center-normal-medium`}><Plus/></button>
            </div>}
            <div className='flex-row-center-normal-medium'>
              <button onClick={() => insertSortParams('image')} className={`${activeSort.includes('image') ? scss.galery_action_button_active : ''} ${scss.galery_action_button} flex-row-center-normal-medium`}>
                <Image size={25}/>
                <p>{galery?.countOfImages || 0}</p>
              </button>
              <button onClick={() => insertSortParams('video')} className={`${activeSort.includes('video') ? scss.galery_action_button_active : ''} ${scss.galery_action_button} flex-row-center-normal-medium`}>
                <FileVideo size={25}/>
                <p>{galery?.countOfVideos || 0}</p>
              </button>
            </div>
          </div>
        </div>
        <div className={scss.galery_content_container}>
          <button onClick={closeSelectedGalery} className={`${scss.galery_content_close} flex-row-center-center-none`}><ArrowLeft /></button>
          {galery?.content.map((content, index) => {
            const extention: string = Strings.getAssetExtension(content.url)
            
            if(activeSort.length === 2 || activeSort.length === 0) {
              return(
                <div key={content.url} className={scss.galery_content_body} onClick={isSlideEditMode ? undefined : () => openSlideModal(index)}>
                  {isSlideEditMode && <div className={`${scss.galery_edit_mode_action_container}`}><PencilIcon onClick={() => editContext(content._id)}/><ImageMinus onClick={() => removeImage(content.url)}/></div>}
                  {imageExtentions.includes(extention) ? <img src={content.url}/> : <video src={content.url}/>}
                </div>
              )
            }
            
            if(activeSort.includes('image') && imageExtentions.includes(extention)) {
              return(
                <div key={content.url} className={scss.galery_content_body} onClick={isSlideEditMode ? undefined : () => openSlideModal(index)}>
                  {isSlideEditMode && <div className={`${scss.galery_edit_mode_action_container}`}><PencilIcon onClick={() => editContext(content._id)}/><ImageMinus onClick={() => removeImage(content.url)}/></div>}
                  <img src={content.url}/>
                </div>
              )
            } else if(activeSort.includes('video') && (!extention || extention === 'mp4')) {
              return(
                <div key={content.url} className={scss.galery_content_body} onClick={isSlideEditMode ? undefined : () => openSlideModal(index)}>
                  {isSlideEditMode && <div className={`${scss.galery_edit_mode_action_container}`}><PencilIcon onClick={() => editContext(content._id)}/><ImageMinus onClick={() => removeImage(content.url)}/></div>}
                  <video src={content.url}/>
                </div>
              )
            }
          })}
        </div>
      </div>}
    </Fragment>
  )
}