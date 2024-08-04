import scss from './page.module.scss'
import '@/scss/global.scss'

import { useDispatch, useSelector } from 'react-redux'

import { changeWebsiteFont } from '@/store/website-setting/setting'

import type { AppDispatch, RootState } from '@/store/store'
import type { WebsiteSetting } from '@/store/website-setting/setting.type'

import SettingWrapper from './component/settingWrapper'

export default function Settings() {
  const fonts: WebsiteSetting['font'][] = [
    'Fira Code, monospace', 
    'Fira Sans, sans-serif',
    'Inter, sans-serif',
    'Public Sans, sans-serif',
    'Roboto Slab, serif',
    'Sofia Sans, sans-serif',
  ]

  const dispatch = useDispatch<AppDispatch>()
  const websiteSetting = useSelector<RootState, WebsiteSetting>(state => state.websiteSetting)

  const changeFont = (fontName: WebsiteSetting['font']): void => {
    dispatch(changeWebsiteFont(fontName))
  }

  return(
    <div className='flex-column-normal-normal-medium'>
      <SettingWrapper title='Font' description='Font of page and post content.'>
        <ul className='flex-column-normal-normal-medium'>
          {fonts.map(font => (
            <li key={font} className='flex-row-center-space-between-medium'>
              <button className={`${font === websiteSetting.font ? scss.setting_selected_font : ''} ${scss.setting_set_font_button}`} onClick={() => changeFont(font)}>{font}</button>
              <p className={scss.setting_font_example} style={{ fontFamily: font }}>Lorem ipsum, dolor sit amet elit. Maiores ea sapiente sunt minus placeat molestiae commodi nesciunt nulla? Autem.</p>
            </li>
          ))}
        </ul>
      </SettingWrapper>
    </div>
  )
}