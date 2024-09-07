import type { AppDispatch, RootState } from "@/store/store"
import type { WebsiteSetting } from "@/store/website-setting/setting.type"

import { useDispatch, useSelector } from "react-redux"

import { changeFont, changePostFont } from "@/store/website-setting/setting"

export default function useWebsiteSetting() {
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
    configure: {
      setWebsiteFont,
      setPostsFont
    }
  }
}