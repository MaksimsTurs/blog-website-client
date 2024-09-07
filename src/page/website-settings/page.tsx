import scss from './page.module.scss'
import '@/scss/global.scss'

import type { WebsiteSetting } from '@/store/website-setting/setting.type'

import { GridWrapper } from '@/component/grid/grid'
import SettingWrapper from './component/settingWrapper'

import useWebsiteSetting from '@/custom-hook/use-website-setting/useWebsiteSetting'

const fonts: WebsiteSetting['font'][] = [
  'Fira Code, monospace', 
  'Fira Sans, sans-serif',
  'Inter, sans-serif',
  'Public Sans, sans-serif',
  'Roboto Slab, serif',
  'Sofia Sans, sans-serif',
]

export default function Settings() {
  const website = useWebsiteSetting()

  return(
    <div className='flex-column-normal-normal-medium'>
      <SettingWrapper title='Schriftart' description='Schriftart der für Website angewendet wird.'>
        <GridWrapper gap='0.5rem' size='12rem'>
          {fonts.map((font: WebsiteSetting['font']) => (
            <div key={font} onClick={() => website.configure.setWebsiteFont(font)} className={`${scss.setting_font_item} ${font === website.setting.font ? scss.setting_selected_font : ''} flex-column-center-space-between-medium`}>
              <button className={scss.setting_set_font_button}>{font.replace(/\,.*/, '')}</button>
              <p className={scss.setting_font_example} style={{ fontFamily: font }}>Lorem ipsum, dolor sit amet elit. Maiores ea sapiente sunt minus.</p>
            </div>
          ))}
        </GridWrapper>
      </SettingWrapper>
      <SettingWrapper title='Posts Schriftart' description='Schriftart der für Posts angewendet wird.'>
        <GridWrapper gap='0.5rem' size='12rem'>
          {fonts.map((font: WebsiteSetting['font']) => (
            <div key={font} onClick={() => website.configure.setPostsFont(font)} className={`${scss.setting_font_item} ${font === website.setting.postFont ? scss.setting_selected_font : ''} flex-column-center-space-between-medium`}>
              <button className={scss.setting_set_font_button}>{font.replace(/\,.*/, '')}</button>
              <p className={scss.setting_font_example} style={{ fontFamily: font }}>Lorem ipsum, dolor sit amet elit. Maiores ea sapiente sunt minus.</p>
            </div>
          ))}
        </GridWrapper>
      </SettingWrapper>
    </div>
  )
}