import scss from './textInput.module.scss'
import '@/scss/global.scss'

import { CircleX } from 'lucide-react';

import type { TextInputProps } from './textInput.type';

export default function TextInput({ name, placeholder, errors, type, value, register, onInput }: TextInputProps) {
  const iconClassName: string = errors?.[name] ? scss.text_input_error_icon : `${scss.text_input_error_icon} ${scss.text_input_icon_hidden}`
  const inputClassName: string = errors?.[name] ? `${scss.text_input_invalid} ${scss.text_input}` : scss.text_input

  return(
    <div className={scss.text_input_container}>
      <input name={name} value={value} onInput={onInput} {...register?.(name)} placeholder={placeholder} type={type || 'text'} className={inputClassName}/>
      <div className={`${scss.text_input_error_text_container} flex-row-center-flex-end-big`}>
        <CircleX className={iconClassName}/>
        <span className={scss.text_input_error_text}>{errors?.[name]}</span>
      </div>
    </div>
  ) 
}