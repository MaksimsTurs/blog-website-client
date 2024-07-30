import scss from './checkBoxInput.module.scss'
import '@/scss/global.scss'

import { Check } from 'lucide-react'

import type { CheckBoxInputProps } from "../input.type";

export default function CheckBoxInput({ defaultValue, label, name }: CheckBoxInputProps) {
  return(
    <div style={{ width: '100%' }} className={`flex-row-center-normal-none`}>
      <label className={`${scss.checkbox_body} flex-row-center-normal-medium`}>
        <input tabIndex={-1} name={name} className={scss.checkbox_default_input} type="checkbox" defaultChecked={defaultValue}/>
        <div className={scss.checkbox_custom_checkbox_wrapper}>
          <p className={scss.checkbox_custom_checkbox_body}></p>
          <Check/>
        </div>
        {label}
      </label>
    </div>
  )
}