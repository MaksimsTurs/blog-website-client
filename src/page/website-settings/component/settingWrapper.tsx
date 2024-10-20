import scss from '../scss/settingWrapper.module.scss'

import type { SettingWrapperProps } from '../page.type'

export default function SettingWrapper({ title, children, description }: SettingWrapperProps) {
  return(
    <div className={scss.setting_wrapper_container}>
      <h5 className={scss.setting_wrapper_option_name}>{title}</h5>
      <p className={scss.setting_wrapper_description}>{description}</p>
      {children}
    </div> 
  )
}