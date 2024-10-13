import type { AppDispatch, RootState } from "@/store/store"
import type { WebsiteSetting } from "@/store/website-setting/setting.type"
import type { UseWebsiteSettingReturn } from "./useWebsiteSetting.type"

import { useDispatch, useSelector } from "react-redux"

import { changeFont, changePostFont } from "@/store/website-setting/setting"

export default function useWebsiteSetting(): UseWebsiteSettingReturn {
  const dispatch = useDispatch<AppDispatch>()
  const setting = useSelector<RootState, WebsiteSetting>(state => state.websiteSetting)
 

  const setWebsiteFont = (font: WebsiteSetting['font']): void => {
    dispatch(changeFont(font))
  }

  const setPostsFont = (font: WebsiteSetting['font']): void => {
    dispatch(changePostFont(font))
  }

  return {
    setting,
    options: {
      fonts: [  
        'Fira Code, monospace', 
        'Fira Sans, sans-serif',
        'Inter, sans-serif',
        'Public Sans, sans-serif',
        'Roboto Slab, serif',
        'Sofia Sans, sans-serif'
      ]
    },
    configure: {
      setWebsiteFont,
      setPostsFont
    }
  }
}