import scss from '../scss/formWrapperTitle.module.scss'
import '@/scss/global.scss'

import type { PropsWithChildren } from "react";

export default function FormWrapperTitle({ children }: PropsWithChildren) {
  return  <section className={`${scss.form_wrapper_title_container} flex-row-center-center-big`}>{children}</section>
}