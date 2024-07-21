import scss from '../scss/postWrapper.module.scss'
import '@/scss/global.scss'

import type { PropsWithChildren } from "react"
import type { PostWrapperProps } from '../postContainer.type'

import { EyeOff } from 'lucide-react'

export default function PostWrapper({ children, className }: PropsWithChildren<PostWrapperProps>) {
  return (
    <section className={`${scss.post_wrapper_container} ${className} main-content-container`}>
      {className ? 
       <div className={`${scss.post_is_hidden} flex-row-center-center-medium`}>
         <EyeOff/>
         <p>Hidden</p>
       </div> : null}
      <div style={{ padding: '1rem' }}>{children}</div>
    </section>
  )
}