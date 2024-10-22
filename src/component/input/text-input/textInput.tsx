import scss from './textInput.module.scss'
import '@/scss/global.scss'


import type { TextInputProps } from './textInput.type';
import type { FieldValues, RegisterOptions } from 'react-hook-form';
import type { Path } from 'react-hook-form';

export default function TextInput<T extends FieldValues>({ name, placeholder, errors, type, validation, defaultValue, value, register, onInput }: TextInputProps<T>) {
  const errorMessage = errors?.[name]?.message?.toString(),
        errorContainerClassName: string = errorMessage ? scss.text_input_error_message : `${scss.text_input_error_message} ${scss.text_input_error_message_hidden}`,
        inputClassName: string = errorMessage ? `${scss.text_input_invalid} ${scss.text_input}` : scss.text_input,
        registerOptions: RegisterOptions<T, Path<T>> = {...validation }

  return(
    <div className={scss.text_input_container}>
      {errorMessage && <p className={errorContainerClassName}>{errorMessage}</p>}
      <input className={inputClassName} onInput={onInput} placeholder={placeholder} type={type} value={value} defaultValue={defaultValue} {...register?.(name, registerOptions)}/>
    </div>
  ) 
}