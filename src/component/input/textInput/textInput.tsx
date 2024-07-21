import scss from './textInput.module.scss'

import type { TextInputProps } from "../input.type";

import { CircleX } from 'lucide-react';

export default function TextInput({ name, defaultValue, placeholder, errors, onInput, type }: TextInputProps) {
  const iconClassName = errors?.[name] ? scss.text_input_error_icon : `${scss.text_input_error_icon} ${scss.text_input_icon_hidden}`
  const inputClassName = errors?.[name] ? `${scss.text_input_invalid} ${scss.text_input}` : scss.text_input

  return(
    <div className={scss.text_input_container}>
      <input name={name} defaultValue={defaultValue} onInput={onInput} placeholder={placeholder} type={type || 'text'} className={inputClassName}/>
      <CircleX className={iconClassName}/>
      <div className={scss.text_input_error_text_container}>
        <span>{errors?.[name]}</span>
      </div>
    </div>
  ) 
}