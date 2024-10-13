import type { WebsiteSetting } from "@/store/website-setting/setting.type"

export type UseWebsiteSettingReturn = {
  setting: WebsiteSetting
  options: WebsiteSettingOptions
  configure: WebsiteSettingConfigure
}

export type WebsiteSettingOptions = {
  fonts: WebsiteSetting['font'][]
}

export type WebsiteSettingConfigure = {
  setWebsiteFont: (font: WebsiteSetting['font']) => void
  setPostsFont: (font: WebsiteSetting['font']) => void
}