import { createSlice } from "@reduxjs/toolkit";

import type { WebsiteSetting } from "./setting.type";
import type { PayloadAction } from "@reduxjs/toolkit";

import localStorage from "@/lib/local-storage/localStorage";

let currSetting: WebsiteSetting = localStorage.get<WebsiteSetting>('website-setting', 'null')

if(!currSetting) {
  const _default: WebsiteSetting = {
    font: 'Fira Code, monospace'
  }

  currSetting = _default

  localStorage.set('website-setting', _default)
}

const initState: WebsiteSetting = currSetting

const websiteSettingSlice = createSlice({
  name: 'website-setting',
  initialState: initState,
  reducers: {
    changeWebsiteFont: (state, { payload }: PayloadAction<WebsiteSetting['font']>) => {
      state.font = payload
      localStorage.set('website-setting', state)
    }
  }
})

export const { changeWebsiteFont } = websiteSettingSlice.actions
export default websiteSettingSlice.reducer