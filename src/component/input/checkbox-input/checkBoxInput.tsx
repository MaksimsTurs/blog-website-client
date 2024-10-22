import scss from './checkBoxInput.module.scss'
import '@/scss/global.scss'

import { Check, CircleX } from 'lucide-react'

import type { CheckBoxInputProps } from './checkBox.type'
import type { FieldValues } from 'react-hook-form'

export default function CheckBoxInput<T extends FieldValues>({ label, name, errors, defaultValue, register, onInput }: CheckBoxInputProps<T>) {
  
  return(
    <div className='flex-column-normal-normal-small'>
      <label className={`${scss.checkbox_body} flex-row-center-normal-medium`}>
        <input className={scss.checkbox_default_input} type='checkbox' defaultChecked={defaultValue} onInput={onInput} {...register?.(name)}/>
        <div className={`${errors?.[name] ? scss.checkbox_body_error : ''} ${scss.checkbox_custom_checkbox_wrapper}`}>
          <p className={scss.checkbox_custom_checkbox_body}></p>
          <Check/>
        </div>
        <p className={scss.checkbox_label}>{label}</p>
      </label>
      {errors?.[name] && <div className={`${scss.checkbox_error} flex-row-center-normal-medium`}><CircleX/><p>{errors[name].message as string}</p></div>}     
    </div>
  )
}