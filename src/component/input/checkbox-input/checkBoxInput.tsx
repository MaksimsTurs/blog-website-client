import scss from './checkBoxInput.module.scss'
import '@/scss/global.scss'

import { Check, CircleX } from 'lucide-react'

import type { CheckBoxInputProps } from "../input.type";

export default function CheckBoxInput({ label, name, onInput, errors, register }: CheckBoxInputProps) {
  return(
    <div className={`${scss.checkbox_container} flex-column-normal-center-none`}>
      <label className={`${scss.checkbox_body} flex-row-center-normal-medium`}>
        <input name={name} className={scss.checkbox_default_input} onInput={onInput} type="checkbox" {...register?.(name)} />
        <div className={`${errors?.[name] ? scss.checkbox_body_error : ''} ${scss.checkbox_custom_checkbox_wrapper}`}>
          <p className={scss.checkbox_custom_checkbox_body}></p>
          <Check/>
        </div>
        <div>
          <p className={scss.checkbox_label}>{label}</p>
        </div>
      </label>
      {errors?.[name] && <div className={`${scss.checkbox_error} flex-row-center-normal-medium`}><CircleX/><p>{errors[name]}</p></div>}     
    </div>
  )
}